"use client";

import { FormEvent, useState } from "react";

export function AccountsSetupForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("password") !== data.get("confirmPassword")) {
      setError("The passwords do not match.");
      setPending(false);
      return;
    }
    const response = await fetch("/api/accounts/setup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        setupCode: data.get("setupCode"),
        name: data.get("name"),
        password: data.get("password"),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(result.error || "The administrator could not be created.");
      setPending(false);
      return;
    }
    window.location.assign("/accounts");
  }

  return <form className="accounts-auth-form" onSubmit={submit}>
    <label>Administrator email<input value="team@arix.pk" readOnly aria-readonly="true" /></label>
    <label>Your name<input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Full name" /></label>
    <label>One-time setup code<input name="setupCode" type="password" required autoComplete="one-time-code" placeholder="Setup code" /></label>
    <label>Create password<input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" placeholder="At least 12 characters" /></label>
    <label>Confirm password<input name="confirmPassword" type="password" required minLength={12} maxLength={128} autoComplete="new-password" placeholder="Repeat password" /></label>
    {error && <p className="accounts-form-error" role="alert">{error}</p>}
    <button className="accounts-primary-button" type="submit" disabled={pending}>{pending ? "Creating administrator…" : "Activate accounts"}<span>↗</span></button>
  </form>;
}
