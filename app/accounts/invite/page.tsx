import Link from "next/link";
import { AccountsInviteForm } from "@/app/components/AccountsInviteForm";

export const dynamic = "force-dynamic";

export default async function InvitePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <main className="accounts-auth-page accounts-setup-page">
    <section className="accounts-auth-brand"><Link href="/" className="accounts-wordmark">ARI<span>X</span></Link><div><p className="accounts-kicker">Team ARIX</p><h1>Accept your employee invitation.</h1><p>Create your private account to access the company finance workspace.</p></div><small>Invitations expire automatically and can only be used once.</small></section>
    <section className="accounts-auth-panel"><div className="accounts-auth-card"><p className="accounts-kicker">Employee invitation</p><h2>Set up access</h2><AccountsInviteForm token={token} /></div></section>
  </main>;
}
