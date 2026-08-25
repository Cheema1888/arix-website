import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountsSetupForm } from "@/app/components/AccountsSetupForm";
import { accountsPool, ensureAccountsSchema } from "@/app/lib/accounts-db";

export const dynamic = "force-dynamic";

export default async function AccountsSetupPage() {
  await ensureAccountsSchema();
  const existing = await accountsPool.query("SELECT 1 FROM arix_employees LIMIT 1");
  if (existing.rowCount) redirect("/accounts/login");

  return (
    <main className="accounts-auth-page accounts-setup-page">
      <section className="accounts-auth-brand">
        <Link href="/" className="accounts-wordmark">ARI<span>X</span></Link>
        <div><p className="accounts-kicker">First-time setup</p><h1>Create the ARIX finance administrator.</h1><p>This one-time step activates <strong>iqbalabdurehman484@gmail.com</strong> as the first administrator.</p></div>
        <small>The setup code stops working after the first administrator is created.</small>
      </section>
      <section className="accounts-auth-panel"><div className="accounts-auth-card"><p className="accounts-kicker">Secure activation</p><h2>Administrator setup</h2><AccountsSetupForm /></div></section>
    </main>
  );
}
