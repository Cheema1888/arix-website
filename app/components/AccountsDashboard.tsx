"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/app/lib/accounts-auth-client";
import type { CurrentEmployee } from "@/app/lib/accounts-auth";
import type { FinanceSnapshot } from "@/app/lib/accounts-db";

type Tab = "overview" | "transactions" | "accounts" | "team" | "audit";
const tabs: Array<{ id: Tab; label: string; mark: string }> = [
  { id: "overview", label: "Overview", mark: "01" },
  { id: "transactions", label: "Transactions", mark: "02" },
  { id: "accounts", label: "Chart of accounts", mark: "03" },
  { id: "team", label: "Team access", mark: "04" },
  { id: "audit", label: "Audit trail", mark: "05" },
];

const pkr = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });
const formatPkr = (value: number) => pkr.format(value).replace("PKR", "PKR ");
const today = () => new Date().toISOString().slice(0, 10);
const principalAdminEmail = "iqbalabdurehman484@gmail.com";

export function AccountsDashboard({ employee, snapshot }: { employee: CurrentEmployee; snapshot: FinanceSnapshot }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [kind, setKind] = useState("revenue");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const canWrite = employee.role === "admin" || employee.role === "accountant";
  const isPrincipalAdmin = employee.email === principalAdminEmail;

  const targetAccounts = useMemo(() => snapshot.accounts.filter((account) => {
    if (kind === "revenue") return account.type === "revenue";
    if (kind === "investment") return account.subtype === "investment";
    return account.type === "expense";
  }), [kind, snapshot.accounts]);
  const chartMax = Math.max(1, ...snapshot.monthly.flatMap((month) => [month.revenue, month.expenses]));

  async function addTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setMessage("");
    const form = event.currentTarget; const data = new FormData(form);
    const response = await fetch("/api/accounts/transactions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, amount: data.get("amount"), date: data.get("date"), description: data.get("description"), reference: data.get("reference"), accountId: data.get("accountId") }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setError(result.error || "The transaction could not be recorded."); setPending(false); return; }
    form.reset(); setMessage("Transaction posted to the ledger."); setPending(false); router.refresh();
  }

  async function reverseTransaction(id: string) {
    if (!window.confirm("Reverse this transaction? The original will remain visible in the audit trail.")) return;
    setPending(true); setError("");
    const response = await fetch(`/api/accounts/transactions/${id}/reverse`, { method: "POST" });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) setError(result.error || "The transaction could not be reversed.");
    else setMessage("A reversal entry has been posted.");
    setPending(false); router.refresh();
  }

  async function inviteEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setInviteUrl("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/accounts/invites", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: data.get("email"), role: data.get("role") }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) setError(result.error || "The invitation could not be created.");
    else setInviteUrl(result.inviteUrl);
    setPending(false); router.refresh();
  }

  function exportCsv() {
    const rows = [["Date", "Type", "Description", "Reference", "Amount PKR", "Status", "Created by"], ...snapshot.entries.map((entry) => [entry.date, entry.kind, entry.description, entry.reference || "", String(entry.amount), entry.status, entry.createdBy])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `arix-ledger-${today()}.csv`; link.click(); URL.revokeObjectURL(url);
  }

  async function signOut() { await authClient.signOut(); window.location.assign("/accounts/login"); }

  return <main className="accounts-dashboard">
    <aside className="accounts-sidebar">
      <div><Link className="accounts-wordmark accounts-dashboard-logo" href="/">ARI<span>X</span></Link><p>Finance workspace</p></div>
      <nav aria-label="Finance portal navigation">{tabs.map((item) => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => { setTab(item.id); setError(""); setMessage(""); }}><span>{item.mark}</span>{item.label}</button>)}</nav>
      <div className="accounts-user-card"><span>{employee.name.slice(0, 1).toUpperCase()}</span><div><strong>{employee.name}</strong><small>{employee.role}</small></div><button onClick={signOut} title="Sign out" aria-label="Sign out">↗</button></div>
    </aside>

    <section className="accounts-workspace">
      <header className="accounts-topbar"><div><p>{tabs.find((item) => item.id === tab)?.label}</p><span>ARIX internal · PKR</span></div><div className="accounts-top-actions"><span className="accounts-live-status"><i /> Ledger online</span>{canWrite && <button onClick={() => setTab("transactions")}>+ Record transaction</button>}</div></header>

      {(error || message) && <div className={error ? "accounts-alert error" : "accounts-alert success"} role="status">{error || message}<button onClick={() => { setError(""); setMessage(""); }}>×</button></div>}

      {tab === "overview" && <div className="accounts-view">
        <div className="accounts-view-heading"><div><p className="accounts-kicker">Company position</p><h1>Finance overview</h1></div><button className="accounts-secondary-button" onClick={exportCsv}>Export ledger ↓</button></div>
        <section className="accounts-metrics">
          <article className="primary"><span>Available cash</span><strong>{formatPkr(snapshot.metrics.cash)}</strong><small>Cash and bank ledger balance</small></article>
          <article><span>Revenue generated</span><strong>{formatPkr(snapshot.metrics.revenue)}</strong><small>All posted income</small></article>
          <article><span>Investment collected</span><strong>{formatPkr(snapshot.metrics.investment)}</strong><small>External investment received</small></article>
          <article><span>Total expenses</span><strong>{formatPkr(snapshot.metrics.expenses)}</strong><small>Posted company spending</small></article>
          <article className={snapshot.metrics.netIncome < 0 ? "negative" : ""}><span>Net income</span><strong>{formatPkr(snapshot.metrics.netIncome)}</strong><small>Revenue less expenses</small></article>
        </section>
        <section className="accounts-overview-grid">
          <article className="accounts-chart-card"><div className="accounts-card-heading"><div><span>Revenue vs expenses</span><small>Last six months</small></div><div className="accounts-chart-key"><i />Revenue <i />Expenses</div></div><div className="accounts-bars">{snapshot.monthly.map((month) => <div className="accounts-bar-group" key={month.month}><div><i style={{ height: `${Math.max(2, month.revenue / chartMax * 100)}%` }} /><i style={{ height: `${Math.max(2, month.expenses / chartMax * 100)}%` }} /></div><span>{month.month}</span></div>)}</div></article>
          <article className="accounts-recent-card"><div className="accounts-card-heading"><div><span>Recent activity</span><small>Latest posted entries</small></div><button onClick={() => setTab("transactions")}>View all ↗</button></div><div className="accounts-recent-list">{snapshot.entries.slice(0, 6).map((entry) => <div key={entry.id}><i className={entry.kind} /><div><strong>{entry.description}</strong><span>{entry.date} · {entry.createdBy}</span></div><b className={entry.kind === "expense" ? "out" : "in"}>{entry.kind === "expense" ? "−" : "+"}{formatPkr(entry.amount)}</b></div>)}{snapshot.entries.length === 0 && <p className="accounts-empty">No transactions yet. Record the first revenue, investment, or expense.</p>}</div></article>
        </section>
      </div>}

      {tab === "transactions" && <div className="accounts-view"><div className="accounts-view-heading"><div><p className="accounts-kicker">Permanent ledger</p><h1>Transactions</h1></div><button className="accounts-secondary-button" onClick={exportCsv}>Export CSV ↓</button></div>
        {canWrite && <form className="accounts-entry-form" onSubmit={addTransaction}><div className="accounts-card-heading"><div><span>Record a transaction</span><small>A balanced journal entry is created automatically</small></div></div><div className="accounts-kind-switch">{["revenue", "investment", "expense"].map((item) => <button type="button" key={item} className={kind === item ? "active" : ""} onClick={() => setKind(item)}>{item}</button>)}</div><div className="accounts-form-grid"><label>Amount (PKR)<input name="amount" inputMode="decimal" required placeholder="0.00" /></label><label>Date<input name="date" type="date" max={today()} defaultValue={today()} required /></label><label className="wide">Description<input name="description" required minLength={2} maxLength={160} placeholder={kind === "expense" ? "What was purchased or paid?" : "What generated this amount?"} /></label><label>Category<select key={kind} name="accountId" required defaultValue=""><option value="" disabled>Select account</option>{targetAccounts.map((account) => <option key={account.id} value={account.id}>{account.code} · {account.name}</option>)}</select></label><label>Reference (optional)<input name="reference" maxLength={80} placeholder="Invoice, receipt, investor" /></label></div><button className="accounts-primary-button" disabled={pending}>{pending ? "Posting…" : `Post ${kind}`}<span>↗</span></button></form>}
        <section className="accounts-table-card"><div className="accounts-card-heading"><div><span>Journal entries</span><small>{snapshot.entries.length} recorded entries</small></div></div><div className="accounts-table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Reference</th><th>Amount</th><th>Status</th><th /></tr></thead><tbody>{snapshot.entries.map((entry) => <tr key={entry.id}><td>{entry.date}</td><td><strong>{entry.description}</strong><small>{entry.createdBy}</small></td><td><span className={`accounts-tag ${entry.kind}`}>{entry.kind}</span></td><td>{entry.reference || "—"}</td><td className={entry.kind === "expense" ? "money-out" : "money-in"}>{entry.kind === "expense" ? "−" : "+"}{formatPkr(entry.amount)}</td><td>{entry.status}</td><td>{canWrite && entry.status === "posted" && entry.kind !== "reversal" && <button className="accounts-row-action" onClick={() => reverseTransaction(entry.id)} disabled={pending}>Reverse</button>}</td></tr>)}</tbody></table>{snapshot.entries.length === 0 && <p className="accounts-empty table-empty">No journal entries have been posted.</p>}</div></section>
      </div>}

      {tab === "accounts" && <div className="accounts-view"><div className="accounts-view-heading"><div><p className="accounts-kicker">Double-entry structure</p><h1>Chart of accounts</h1></div></div><section className="accounts-account-grid">{["asset", "liability", "equity", "revenue", "expense"].map((type) => <article key={type}><div className="accounts-card-heading"><div><span>{type}</span><small>{snapshot.accounts.filter((account) => account.type === type).length} accounts</small></div></div>{snapshot.accounts.filter((account) => account.type === type).map((account) => <div className="accounts-account-row" key={account.id}><span>{account.code}</span><strong>{account.name}</strong><b>{formatPkr(account.balance)}</b></div>)}</article>)}</section></div>}

      {tab === "team" && <div className="accounts-view"><div className="accounts-view-heading"><div><p className="accounts-kicker">Employee permissions</p><h1>Team access</h1></div></div>{isPrincipalAdmin && <form className="accounts-invite-form" onSubmit={inviteEmployee}><div><span>Invite an employee</span><small>Create a single-use link valid for 72 hours. Only the principal administrator can onboard employees.</small></div><label>Email<input name="email" type="email" required placeholder="employee@arix.pk" /></label><label>Access role<select name="role" defaultValue="viewer"><option value="viewer">Viewer · read only</option><option value="accountant">Accountant · post and reverse</option><option value="admin">Administrator · finance administration</option></select></label><button className="accounts-primary-button" disabled={pending}>{pending ? "Creating…" : "Create invitation"}<span>↗</span></button></form>}{inviteUrl && <div className="accounts-invite-result"><span>Invitation link</span><code>{inviteUrl}</code><button onClick={() => navigator.clipboard.writeText(inviteUrl)}>Copy link</button></div>}<section className="accounts-team-list">{snapshot.employees.map((member) => <article key={member.id}><span>{member.name.slice(0,1).toUpperCase()}</span><div><strong>{member.name}</strong><small>{member.email}</small></div><b>{member.email === principalAdminEmail ? "principal administrator" : member.role}</b><i className={member.status}>{member.status}</i></article>)}</section></div>}

      {tab === "audit" && <div className="accounts-view"><div className="accounts-view-heading"><div><p className="accounts-kicker">Accountability by design</p><h1>Audit trail</h1></div></div><section className="accounts-audit-list">{snapshot.audit.map((item) => <article key={item.id}><i /><div><strong>{item.action.replaceAll(".", " ")}</strong><span>{item.entityType} · {item.actor}</span></div><time>{new Date(item.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</time></article>)}{snapshot.audit.length === 0 && <p className="accounts-empty">Audit events will appear here as employees and transactions are added.</p>}</section></div>}
    </section>
  </main>;
}
