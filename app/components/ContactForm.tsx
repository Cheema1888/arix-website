"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  if (submitted) return <div className="form-confirmation"><span>✓</span><h2>Message prepared.</h2><p>Thank you for your interest in ARIX. The team&apos;s public contact channel is being finalized for launch.</p><button onClick={() => setSubmitted(false)}>Send another note</button></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row"><label>First name<input name="firstName" required placeholder="Your first name" /></label><label>Last name<input name="lastName" required placeholder="Your last name" /></label></div>
      <label>Email address<input type="email" name="email" required placeholder="name@company.com" /></label>
      <label>I&apos;m interested in<select name="interest" defaultValue="Pilot partnership"><option>Pilot partnership</option><option>Investment</option><option>Research collaboration</option><option>Joining the team</option><option>General inquiry</option></select></label>
      <label>Tell us about your interest<textarea name="message" required rows={5} placeholder="How would you like to work with ARIX?" /></label>
      <button className="button button-primary" type="submit">Contact the team <span>↗</span></button>
      <p className="form-note">Preview mode: delivery will be connected when the official ARIX email is provided.</p>
    </form>
  );
}
