import "server-only";

import { Pool, type PoolClient } from "pg";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL;

const globalForAccounts = globalThis as typeof globalThis & {
  arixAccountsPool?: Pool;
  arixAccountsReady?: Promise<void>;
};

export const accountsPool =
  globalForAccounts.arixAccountsPool ??
  new Pool({
    connectionString: connectionString || "postgresql://postgres:postgres@127.0.0.1:5432/postgres",
    max: 5,
    idleTimeoutMillis: 20_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForAccounts.arixAccountsPool = accountsPool;
}

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS arix_employees (
    id UUID PRIMARY KEY,
    auth_user_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'accountant', 'viewer')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS arix_employee_invites (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'accountant', 'viewer')),
    token_hash TEXT NOT NULL UNIQUE,
    invited_by UUID,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS arix_employee_invites_email_idx
    ON arix_employee_invites (LOWER(email), expires_at)`,
  `CREATE TABLE IF NOT EXISTS arix_finance_accounts (
    id UUID PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
    subtype TEXT NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'PKR',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    system_account BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS arix_journal_entries (
    id UUID PRIMARY KEY,
    entry_date DATE NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('revenue', 'investment', 'expense', 'adjustment', 'reversal')),
    description TEXT NOT NULL,
    reference TEXT,
    amount_paisa BIGINT NOT NULL CHECK (amount_paisa > 0),
    status TEXT NOT NULL DEFAULT 'posted' CHECK (status IN ('posted', 'reversed')),
    reverses_entry_id UUID,
    created_by UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS arix_journal_lines (
    id UUID PRIMARY KEY,
    journal_entry_id UUID NOT NULL REFERENCES arix_journal_entries(id),
    account_id UUID NOT NULL REFERENCES arix_finance_accounts(id),
    debit_paisa BIGINT NOT NULL DEFAULT 0 CHECK (debit_paisa >= 0),
    credit_paisa BIGINT NOT NULL DEFAULT 0 CHECK (credit_paisa >= 0),
    CHECK ((debit_paisa > 0 AND credit_paisa = 0) OR (credit_paisa > 0 AND debit_paisa = 0))
  )`,
  `CREATE INDEX IF NOT EXISTS arix_journal_lines_entry_idx
    ON arix_journal_lines (journal_entry_id)`,
  `CREATE INDEX IF NOT EXISTS arix_journal_lines_account_idx
    ON arix_journal_lines (account_id)`,
  `CREATE TABLE IF NOT EXISTS arix_finance_audit_log (
    id UUID PRIMARY KEY,
    employee_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS arix_finance_audit_created_idx
    ON arix_finance_audit_log (created_at DESC)`,
];

const defaultAccounts = [
  ["1000", "Cash and Bank", "asset", "cash", true],
  ["1100", "Accounts Receivable", "asset", "receivable", true],
  ["2000", "Accounts Payable", "liability", "payable", true],
  ["3000", "Founder Capital", "equity", "capital", true],
  ["3100", "External Investment", "equity", "investment", true],
  ["4000", "Product Revenue", "revenue", "product", true],
  ["4100", "Pilot and Service Revenue", "revenue", "services", true],
  ["4200", "Grants and Other Income", "revenue", "grants", true],
  ["5000", "Research and Development", "expense", "research", true],
  ["5100", "Operations", "expense", "operations", true],
  ["5200", "Marketing and Sales", "expense", "marketing", true],
  ["5300", "Team and Contractors", "expense", "people", true],
  ["5400", "Hardware and Equipment", "expense", "equipment", true],
];

export async function ensureAccountsSchema() {
  if (!connectionString) {
    throw new Error("ARIX accounts requires a PostgreSQL connection string.");
  }
  if (!globalForAccounts.arixAccountsReady) {
    globalForAccounts.arixAccountsReady = (async () => {
      for (const statement of schemaStatements) {
        await accountsPool.query(statement);
      }
      for (const [code, name, type, subtype, systemAccount] of defaultAccounts) {
        await accountsPool.query(
          `INSERT INTO arix_finance_accounts
            (id, code, name, type, subtype, system_account)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (code) DO NOTHING`,
          [crypto.randomUUID(), code, name, type, subtype, systemAccount],
        );
      }
    })().catch((error) => {
      globalForAccounts.arixAccountsReady = undefined;
      throw error;
    });
  }
  await globalForAccounts.arixAccountsReady;
}

export async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function getEmployeeByAuthUserId(authUserId: string) {
  await ensureAccountsSchema();
  const result = await accountsPool.query(
    `SELECT id, auth_user_id, email, full_name, role, status, created_at
     FROM arix_employees WHERE auth_user_id = $1 LIMIT 1`,
    [authUserId],
  );
  return result.rows[0] ?? null;
}

export async function verifyInvite(email: string, rawToken: string) {
  await ensureAccountsSchema();
  if (!rawToken || rawToken.length < 24) return null;
  const tokenHash = await sha256Hex(rawToken);
  const result = await accountsPool.query(
    `SELECT id, email, role, expires_at
     FROM arix_employee_invites
     WHERE LOWER(email) = $1 AND token_hash = $2
       AND used_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [normalizeEmail(email), tokenHash],
  );
  return result.rows[0] ?? null;
}

export async function withAccountsTransaction<T>(
  operation: (client: PoolClient) => Promise<T>,
) {
  const client = await accountsPool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export type EmployeeRole = "admin" | "accountant" | "viewer";

export type FinanceSnapshot = {
  metrics: {
    cash: number;
    revenue: number;
    investment: number;
    expenses: number;
    netIncome: number;
  };
  accounts: Array<{
    id: string;
    code: string;
    name: string;
    type: string;
    subtype: string;
    balance: number;
  }>;
  entries: Array<{
    id: string;
    date: string;
    kind: string;
    description: string;
    reference: string | null;
    amount: number;
    status: string;
    createdBy: string;
    createdAt: string;
  }>;
  monthly: Array<{ month: string; revenue: number; expenses: number }>;
  employees: Array<{
    id: string;
    name: string;
    email: string;
    role: EmployeeRole;
    status: string;
  }>;
  audit: Array<{
    id: string;
    action: string;
    entityType: string;
    actor: string;
    createdAt: string;
  }>;
};

export async function getFinanceSnapshot(): Promise<FinanceSnapshot> {
  await ensureAccountsSchema();
  const [metricsResult, accountsResult, entriesResult, monthlyResult, employeesResult, auditResult] =
    await Promise.all([
      accountsPool.query(`
        SELECT
          COALESCE(SUM(CASE WHEN a.code = '1000' THEN l.debit_paisa - l.credit_paisa ELSE 0 END), 0) AS cash,
          COALESCE(SUM(CASE WHEN a.type = 'revenue' THEN l.credit_paisa - l.debit_paisa ELSE 0 END), 0) AS revenue,
          COALESCE(SUM(CASE WHEN a.subtype = 'investment' THEN l.credit_paisa - l.debit_paisa ELSE 0 END), 0) AS investment,
          COALESCE(SUM(CASE WHEN a.type = 'expense' THEN l.debit_paisa - l.credit_paisa ELSE 0 END), 0) AS expenses
        FROM arix_journal_lines l
        JOIN arix_finance_accounts a ON a.id = l.account_id
        JOIN arix_journal_entries e ON e.id = l.journal_entry_id
        WHERE e.status IN ('posted', 'reversed')
      `),
      accountsPool.query(`
        SELECT a.id, a.code, a.name, a.type, a.subtype,
          COALESCE(SUM(CASE
            WHEN e.id IS NULL THEN 0
            WHEN a.type IN ('asset', 'expense') THEN l.debit_paisa - l.credit_paisa
            ELSE l.credit_paisa - l.debit_paisa END), 0) AS balance
        FROM arix_finance_accounts a
        LEFT JOIN arix_journal_lines l ON l.account_id = a.id
        LEFT JOIN arix_journal_entries e ON e.id = l.journal_entry_id AND e.status IN ('posted', 'reversed')
        WHERE a.active = TRUE
        GROUP BY a.id ORDER BY a.code
      `),
      accountsPool.query(`
        SELECT e.id, e.entry_date, e.kind, e.description, e.reference,
          e.amount_paisa, e.status, e.created_at,
          COALESCE(emp.full_name, 'ARIX system') AS created_by
        FROM arix_journal_entries e
        LEFT JOIN arix_employees emp ON emp.id = e.created_by
        ORDER BY e.entry_date DESC, e.created_at DESC LIMIT 100
      `),
      accountsPool.query(`
        WITH months AS (
          SELECT generate_series(
            date_trunc('month', CURRENT_DATE) - INTERVAL '5 months',
            date_trunc('month', CURRENT_DATE), INTERVAL '1 month'
          ) AS month
        )
        SELECT to_char(m.month, 'Mon YY') AS month,
          COALESCE(SUM(CASE WHEN e.kind = 'revenue' AND e.status = 'posted' THEN e.amount_paisa ELSE 0 END), 0) AS revenue,
          COALESCE(SUM(CASE WHEN e.kind = 'expense' AND e.status = 'posted' THEN e.amount_paisa ELSE 0 END), 0) AS expenses
        FROM months m
        LEFT JOIN arix_journal_entries e
          ON date_trunc('month', e.entry_date) = m.month
        GROUP BY m.month ORDER BY m.month
      `),
      accountsPool.query(`
        SELECT id, full_name, email, role, status
        FROM arix_employees ORDER BY created_at ASC
      `),
      accountsPool.query(`
        SELECT a.id, a.action, a.entity_type, a.created_at,
          COALESCE(e.full_name, 'ARIX system') AS actor
        FROM arix_finance_audit_log a
        LEFT JOIN arix_employees e ON e.id = a.employee_id
        ORDER BY a.created_at DESC LIMIT 60
      `),
    ]);

  const money = (value: unknown) => Number(value || 0) / 100;
  const metricsRow = metricsResult.rows[0] ?? {};
  const revenue = money(metricsRow.revenue);
  const expenses = money(metricsRow.expenses);

  return {
    metrics: {
      cash: money(metricsRow.cash),
      revenue,
      investment: money(metricsRow.investment),
      expenses,
      netIncome: revenue - expenses,
    },
    accounts: accountsResult.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      type: row.type,
      subtype: row.subtype,
      balance: money(row.balance),
    })),
    entries: entriesResult.rows.map((row) => ({
      id: row.id,
      date: String(row.entry_date).slice(0, 10),
      kind: row.kind,
      description: row.description,
      reference: row.reference,
      amount: money(row.amount_paisa),
      status: row.status,
      createdBy: row.created_by,
      createdAt: new Date(row.created_at).toISOString(),
    })),
    monthly: monthlyResult.rows.map((row) => ({
      month: row.month,
      revenue: money(row.revenue),
      expenses: money(row.expenses),
    })),
    employees: employeesResult.rows.map((row) => ({
      id: row.id,
      name: row.full_name,
      email: row.email,
      role: row.role,
      status: row.status,
    })),
    audit: auditResult.rows.map((row) => ({
      id: row.id,
      action: row.action,
      entityType: row.entity_type,
      actor: row.actor,
      createdAt: new Date(row.created_at).toISOString(),
    })),
  };
}

export async function getPublicFinanceTotals() {
  if (!connectionString) {
    return { revenue: 0, investment: 0 };
  }
  try {
    await ensureAccountsSchema();
    const result = await accountsPool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN kind = 'revenue' AND status = 'posted' THEN amount_paisa ELSE 0 END), 0) AS revenue,
        COALESCE(SUM(CASE WHEN kind = 'investment' AND status = 'posted' THEN amount_paisa ELSE 0 END), 0) AS investment
      FROM arix_journal_entries
    `);
    const row = result.rows[0] ?? {};
    return {
      revenue: Number(row.revenue || 0) / 100,
      investment: Number(row.investment || 0) / 100,
    };
  } catch {
    return { revenue: 0, investment: 0 };
  }
}
