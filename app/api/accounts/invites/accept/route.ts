import { NextResponse } from "next/server";
import { auth, logAudit } from "@/app/lib/accounts-auth";
import { ensureAccountsSchema, normalizeEmail, verifyInvite, withAccountsTransaction } from "@/app/lib/accounts-db";
import { cleanText, isSameOrigin } from "@/app/lib/accounts-security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const token = String(body?.token || "");
  const email = normalizeEmail(String(body?.email || ""));
  const name = cleanText(body?.name, 80);
  const password = String(body?.password || "");
  if (name.length < 2 || password.length < 12 || password.length > 128) return NextResponse.json({ error: "Enter your name and a password of at least 12 characters." }, { status: 422 });
  await ensureAccountsSchema();
  const invite = await verifyInvite(email, token);
  if (!invite) return NextResponse.json({ error: "This invitation is invalid or has expired." }, { status: 403 });

  try {
    const created = await auth.api.signUpEmail({ body: { email, password, name, rememberMe: false }, headers: { "x-arix-invite-token": token } });
    const employeeId = crypto.randomUUID();
    await withAccountsTransaction(async (client) => {
      await client.query(
        `INSERT INTO arix_employees (id, auth_user_id, email, full_name, role)
         VALUES ($1, $2, $3, $4, $5)`,
        [employeeId, created.user.id, email, name, invite.role],
      );
      await client.query("UPDATE arix_employee_invites SET used_at = NOW() WHERE id = $1 AND used_at IS NULL", [invite.id]);
    });
    await logAudit(employeeId, "employee.joined", "employee", employeeId, { email, role: invite.role });
    return auth.api.signInEmail({ body: { email, password, rememberMe: false }, headers: request.headers, asResponse: true });
  } catch (error) {
    console.error("ARIX employee invitation error", error);
    return NextResponse.json({ error: "The employee account could not be created." }, { status: 500 });
  }
}
