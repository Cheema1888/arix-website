import { NextResponse } from "next/server";
import { auth, logAudit, PRINCIPAL_ADMIN_EMAIL } from "@/app/lib/accounts-auth";
import {
  accountsPool,
  ensureAccountsSchema,
  normalizeEmail,
  sha256Hex,
  withAccountsTransaction,
} from "@/app/lib/accounts-db";
import { cleanText, isSameOrigin } from "@/app/lib/accounts-security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const setupCode = String(body?.setupCode || "");
  const name = cleanText(body?.name, 80);
  const password = String(body?.password || "");
  const configuredCode = process.env.ARIX_ACCOUNTS_SETUP_CODE || "";
  if (!configuredCode || !setupCode || (await sha256Hex(setupCode)) !== (await sha256Hex(configuredCode))) {
    return NextResponse.json({ error: "The setup code is not valid." }, { status: 403 });
  }
  if (name.length < 2 || password.length < 10 || password.length > 128) {
    return NextResponse.json({ error: "Enter your name and a password of at least 10 characters." }, { status: 422 });
  }

  await ensureAccountsSchema();
  const existing = await accountsPool.query("SELECT 1 FROM arix_employees LIMIT 1");
  if (existing.rowCount) return NextResponse.json({ error: "ARIX Accounts has already been activated." }, { status: 409 });

  const email = normalizeEmail(PRINCIPAL_ADMIN_EMAIL);
  const inviteId = crypto.randomUUID();
  const tokenHash = await sha256Hex(setupCode);
  await accountsPool.query(
    `INSERT INTO arix_employee_invites (id, email, role, token_hash, expires_at)
     VALUES ($1, $2, 'admin', $3, NOW() + INTERVAL '30 minutes')
     ON CONFLICT (token_hash) DO UPDATE SET expires_at = EXCLUDED.expires_at`,
    [inviteId, email, tokenHash],
  );

  try {
    const created = await auth.api.signUpEmail({
      body: { email, password, name, rememberMe: false },
      headers: { "x-arix-invite-token": setupCode },
    });
    const employeeId = crypto.randomUUID();
    await withAccountsTransaction(async (client) => {
      await client.query(
        `INSERT INTO arix_employees (id, auth_user_id, email, full_name, role)
         VALUES ($1, $2, $3, $4, 'admin')`,
        [employeeId, created.user.id, email, name],
      );
      await client.query(
        "UPDATE arix_employee_invites SET used_at = NOW() WHERE token_hash = $1",
        [tokenHash],
      );
    });
    await logAudit(employeeId, "accounts.activated", "employee", employeeId, { email });
    return auth.api.signInEmail({
      body: { email, password, rememberMe: false },
      headers: request.headers,
      asResponse: true,
    });
  } catch (error) {
    console.error("ARIX Accounts setup error", error);
    return NextResponse.json({ error: "The administrator could not be created. Please try again." }, { status: 500 });
  }
}
