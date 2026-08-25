import "server-only";

import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  accountsPool,
  ensureAccountsSchema,
  getEmployeeByAuthUserId,
  verifyInvite,
  type EmployeeRole,
} from "./accounts-db";

export const PRINCIPAL_ADMIN_EMAIL = "iqbalabdurehman484@gmail.com";

const authBaseUrl =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  appName: "ARIX Accounts",
  baseURL: authBaseUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  database: accountsPool,
  trustedOrigins: [
    "https://arix.pk",
    "https://www.arix.pk",
    authBaseUrl,
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },
  session: {
    expiresIn: 60 * 60 * 12,
    updateAge: 60 * 60,
    freshAge: 60 * 10,
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;
      const email = String(context.body?.email || "");
      const inviteToken = context.headers?.get("x-arix-invite-token") || "";
      const invite = await verifyInvite(email, inviteToken);
      if (!invite) {
        throw new APIError("FORBIDDEN", {
          message: "A valid ARIX employee invitation is required.",
        });
      }
    }),
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          await ensureAccountsSchema();
          const employee = await getEmployeeByAuthUserId(session.userId);
          if (!employee || employee.status !== "active") {
            throw new APIError("FORBIDDEN", {
              message: "This account does not have active ARIX employee access.",
            });
          }
          return { data: session };
        },
      },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    database: { joins: true },
  },
  telemetry: { enabled: false },
});

export type CurrentEmployee = {
  id: string;
  authUserId: string;
  email: string;
  name: string;
  role: EmployeeRole;
};

export async function getCurrentEmployee(): Promise<CurrentEmployee | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  const employee = await getEmployeeByAuthUserId(session.user.id);
  if (!employee || employee.status !== "active") return null;
  return {
    id: employee.id,
    authUserId: employee.auth_user_id,
    email: employee.email,
    name: employee.full_name,
    role: employee.role,
  };
}

export async function requireEmployee(returnTo = "/accounts") {
  const employee = await getCurrentEmployee();
  if (!employee) redirect(`/accounts/login?returnTo=${encodeURIComponent(returnTo)}`);
  return employee;
}

export async function getEmployeeForRequest(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return null;
  const employee = await getEmployeeByAuthUserId(session.user.id);
  if (!employee || employee.status !== "active") return null;
  return {
    id: employee.id,
    authUserId: employee.auth_user_id,
    email: employee.email,
    name: employee.full_name,
    role: employee.role as EmployeeRole,
  };
}

export function canWriteFinance(role: EmployeeRole) {
  return role === "admin" || role === "accountant";
}

export async function logAudit(
  employeeId: string | null,
  action: string,
  entityType: string,
  entityId: string | null,
  metadata: Record<string, unknown> = {},
) {
  await ensureAccountsSchema();
  await accountsPool.query(
    `INSERT INTO arix_finance_audit_log
      (id, employee_id, action, entity_type, entity_id, metadata)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
    [
      crypto.randomUUID(),
      employeeId,
      action,
      entityType,
      entityId,
      JSON.stringify(metadata),
    ],
  );
}
