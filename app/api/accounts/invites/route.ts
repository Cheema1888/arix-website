import { NextResponse } from "next/server";
import { getEmployeeForRequest, logAudit, PRINCIPAL_ADMIN_EMAIL } from "@/app/lib/accounts-auth";
import { accountsPool, ensureAccountsSchema, normalizeEmail, sha256Hex } from "@/app/lib/accounts-db";
import { isSameOrigin } from "@/app/lib/accounts-security";

export const runtime = "nodejs";
const roles = ["admin", "accountant", "viewer"] as const;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const employee = await getEmployeeForRequest(request);
  if (!employee || employee.email !== PRINCIPAL_ADMIN_EMAIL) return NextResponse.json({ error: "Principal administrator access is required." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(String(body?.email || ""));
  const role = String(body?.role || "viewer") as typeof roles[number];
  if (!/^\S+@\S+\.\S+$/.test(email) || !roles.includes(role)) return NextResponse.json({ error: "Enter a valid email and role." }, { status: 422 });

  await ensureAccountsSchema();
  const existing = await accountsPool.query("SELECT 1 FROM arix_employees WHERE LOWER(email) = $1 LIMIT 1", [email]);
  if (existing.rowCount) return NextResponse.json({ error: "That employee already has access." }, { status: 409 });

  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const tokenHash = await sha256Hex(token);
  const id = crypto.randomUUID();
  await accountsPool.query(
    `INSERT INTO arix_employee_invites (id, email, role, token_hash, invited_by, expires_at)
     VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '72 hours')`,
    [id, email, role, tokenHash, employee.id],
  );
  await logAudit(employee.id, "employee.invited", "employee_invite", id, { email, role });
  const inviteUrl = `${new URL(request.url).origin}/accounts/invite?token=${token}`;
  return NextResponse.json({ ok: true, inviteUrl, expiresIn: "72 hours" }, { status: 201 });
}
