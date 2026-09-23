import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentEmployee } from "@/app/lib/accounts-auth";
import { AccountsLoginForm } from "@/app/components/AccountsLoginForm";

export const dynamic = "force-dynamic";

export default async function AccountsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const employee = await getCurrentEmployee();
  if (employee) redirect("/accounts");
  const { returnTo } = await searchParams;
  const safeReturnTo = returnTo?.startsWith("/accounts") ? returnTo : "/accounts";

  return (
    <main className="accounts-auth-page">
      <section className="accounts-auth-brand">
        <Link href="/" className="accounts-wordmark" aria-label="Return to ARIX website">
          ARI<span>X</span>
        </Link>
        <div>
          <p className="accounts-kicker">Employee access only</p>
          <h1>One clear view of ARIX finances.</h1>
          <p>
            Revenue, investment, spending, and account balances, protected for the ARIX team and backed by a permanent audit trail.
          </p>
        </div>
        <small>Private system · Authorized employees only</small>
      </section>
      <section className="accounts-auth-panel">
        <div className="accounts-auth-card">
          <span className="accounts-lock" aria-hidden="true">●</span>
          <p className="accounts-kicker">ARIX Accounts</p>
          <h2>Sign in</h2>
          <p>Use your approved ARIX employee email and password.</p>
          <AccountsLoginForm returnTo={safeReturnTo} />
          <div className="accounts-security-note">
            <strong>Protected workspace</strong>
            <span>Every financial change is attributed to an employee account.</span>
          </div>
          <Link href="/" className="accounts-back-link">← Back to arix.pk</Link>
        </div>
      </section>
    </main>
  );
}
