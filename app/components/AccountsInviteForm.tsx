"use client";

import { FormEvent, useState } from "react";

export function AccountsInviteForm({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("The passwords do not match."); setPending(false); return;
    }
    const response = await fetch("/api/accounts/invites/accept", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, name: data.get("name"), email: data.get("email"), password: data.get("password") }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setError(result.error || "This invitation could not be accepted."); setPending(false); return; }
    window.location.assign("/accounts");
  }

  return <form className="accounts-auth-form" onSubmit={submit}>
    <label>Full name<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label>
    <label>Invited email<input name="email" type="email" required autoComplete="email" /></label>
    <label>Create password<input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" placeholder="At least 12 characters" /></label>
    <label>Confirm password<input name="confirmPassword" type="password" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    {error && <p className="accounts-form-error" role="alert">{error}</p>}
    {!token && <p className="accounts-form-error" role="alert">This invitation link is incomplete.</p>}
    <button className="accounts-primary-button" type="submit" disabled={pending || !token}>{pending ? "Creating account…" : "Accept invitation"}<span>↗</span></button>
  </form>;
}
