import { NextResponse } from "next/server";
import { canWriteFinance, getEmployeeForRequest, logAudit } from "@/app/lib/accounts-auth";
import { ensureAccountsSchema, withAccountsTransaction } from "@/app/lib/accounts-db";
import { isSameOrigin } from "@/app/lib/accounts-security";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const employee = await getEmployeeForRequest(request);
  if (!employee || !canWriteFinance(employee.role)) return NextResponse.json({ error: "Finance editor access is required." }, { status: 403 });
  const { id } = await params;
  await ensureAccountsSchema();
  const reversalId = crypto.randomUUID();
  try {
    await withAccountsTransaction(async (client) => {
      const entryResult = await client.query("SELECT * FROM arix_journal_entries WHERE id = $1 FOR UPDATE", [id]);
      const entry = entryResult.rows[0];
      if (!entry || entry.status !== "posted") throw new Error("not_reversible");
      const lines = await client.query("SELECT * FROM arix_journal_lines WHERE journal_entry_id = $1", [id]);
      await client.query(
        `INSERT INTO arix_journal_entries
          (id, entry_date, kind, description, reference, amount_paisa, reverses_entry_id, created_by)
         VALUES ($1, CURRENT_DATE, 'reversal', $2, $3, $4, $5, $6)`,
        [reversalId, `Reversal: ${entry.description}`, entry.reference, entry.amount_paisa, id, employee.id],
      );
      for (const line of lines.rows) {
        await client.query(
          `INSERT INTO arix_journal_lines
            (id, journal_entry_id, account_id, debit_paisa, credit_paisa)
           VALUES ($1, $2, $3, $4, $5)`,
          [crypto.randomUUID(), reversalId, line.account_id, line.credit_paisa, line.debit_paisa],
        );
      }
      await client.query("UPDATE arix_journal_entries SET status = 'reversed' WHERE id = $1", [id]);
    });
  } catch (error) {
    if (error instanceof Error && error.message === "not_reversible") return NextResponse.json({ error: "This transaction cannot be reversed." }, { status: 409 });
    console.error("ARIX transaction reversal error", error);
    return NextResponse.json({ error: "The transaction could not be reversed." }, { status: 500 });
  }
  await logAudit(employee.id, "transaction.reversed", "journal_entry", id, { reversalId });
  return NextResponse.json({ ok: true, reversalId });
}
