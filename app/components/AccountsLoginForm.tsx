"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/app/lib/accounts-auth-client";

export function AccountsLoginForm({ returnTo }: { returnTo: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(data.get("email") || "").trim().toLowerCase(),
      password: String(data.get("password") || ""),
      rememberMe: false,
    });
    if (result.error) {
      setError("We could not sign you in. Check your details or ask an ARIX administrator to confirm your access.");
      setPending(false);
      return;
    }
    window.location.assign(returnTo);
  }

  return (
    <form className="accounts-auth-form" onSubmit={submit}>
      <label>
        Employee email
        <input name="email" type="email" autoComplete="email" required placeholder="name@arix.pk" />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" minLength={10} required placeholder="Your password" />
      </label>
      {error && <p className="accounts-form-error" role="alert">{error}</p>}
      <button className="accounts-primary-button" type="submit" disabled={pending}>
        {pending ? "Checking access…" : "Enter accounts"}<span>↗</span>
      </button>
    </form>
  );
}
