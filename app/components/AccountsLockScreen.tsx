"use client";

import { useEffect } from "react";
import { authClient } from "@/app/lib/accounts-auth-client";

export function AccountsLockScreen() {
  useEffect(() => {
    authClient.signOut().finally(() => {
      window.location.replace("/accounts/login");
    });
  }, []);

  return (
    <main className="accounts-auth-page accounts-lock-page">
      <section className="accounts-auth-brand">
        <div className="accounts-wordmark">ARI<span>X</span></div>
        <div><p className="accounts-kicker">Security checkpoint</p><h1>Locking the finance workspace.</h1><p>Your previous session is being closed before the next sign-in.</p></div>
        <small>Private system · Authorized employees only</small>
      </section>
      <section className="accounts-auth-panel"><div className="accounts-auth-card"><span className="accounts-lock" aria-hidden="true">●</span><p className="accounts-kicker">ARIX Accounts</p><h2>Securing session…</h2><p>You will be taken to the password screen automatically.</p></div></section>
    </main>
  );
}
