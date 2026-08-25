import { NextResponse } from "next/server";
import { canWriteFinance, getEmployeeForRequest, logAudit } from "@/app/lib/accounts-auth";
import { accountsPool, ensureAccountsSchema, withAccountsTransaction } from "@/app/lib/accounts-db";
import { cleanText, isSameOrigin, parsePkrToPaisa, validDate } from "@/app/lib/accounts-security";

export const runtime = "nodejs";
const kinds = ["revenue", "investment", "expense"] as const;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const employee = await getEmployeeForRequest(request);
  if (!employee || !canWriteFinance(employee.role)) return NextResponse.json({ error: "Finance editor access is required." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const kind = String(body?.kind || "") as typeof kinds[number];
  const amount = parsePkrToPaisa(body?.amount);
  const entryDate = validDate(body?.date);
  const description = cleanText(body?.description, 160);
  const reference = cleanText(body?.reference, 80);
  const targetAccountId = String(body?.accountId || "");
  if (!kinds.includes(kind) || !amount || !entryDate || description.length < 2 || !targetAccountId) return NextResponse.json({ error: "Complete the amount, date, description, and category." }, { status: 422 });

  await ensureAccountsSchema();
  const accounts = await accountsPool.query(
    `SELECT id, type, subtype FROM arix_finance_accounts
     WHERE active = TRUE AND (id = $1 OR code = '1000')`,
    [targetAccountId],
  );
  const cash = accounts.rows.find((row) => row.subtype === "cash");
  const target = accounts.rows.find((row) => row.id === targetAccountId);
  const expectedType = kind === "revenue" ? "revenue" : kind === "investment" ? "equity" : "expense";
  if (!cash || !target || target.type !== expectedType || (kind === "investment" && target.subtype !== "investment")) return NextResponse.json({ error: "The selected account does not match this transaction type." }, { status: 422 });

  const entryId = crypto.randomUUID();
  await withAccountsTransaction(async (client) => {
    await client.query(
      `INSERT INTO arix_journal_entries
        (id, entry_date, kind, description, reference, amount_paisa, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [entryId, entryDate, kind, description, reference || null, amount, employee.id],
    );
    const debitAccount = kind === "expense" ? target.id : cash.id;
    const creditAccount = kind === "expense" ? cash.id : target.id;
    await client.query(
      `INSERT INTO arix_journal_lines
        (id, journal_entry_id, account_id, debit_paisa, credit_paisa)
       VALUES ($1, $2, $3, $4, 0), ($5, $2, $6, 0, $4)`,
      [crypto.randomUUID(), entryId, debitAccount, amount, crypto.randomUUID(), creditAccount],
    );
  });
  await logAudit(employee.id, "transaction.posted", "journal_entry", entryId, { kind, amountPaisa: amount, accountId: target.id });
  return NextResponse.json({ ok: true, id: entryId }, { status: 201 });
}
