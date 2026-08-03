"use client";

import { FormEvent, useState } from "react";

const contactEmail = "arix.solutions.pk@gmail.com";

export function ContactForm() {
  const [draftUrl, setDraftUrl] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const senderEmail = String(data.get("email") ?? "").trim();
    const interest = String(data.get("interest") ?? "General inquiry");
    const message = String(data.get("message") ?? "").trim();
    const subject = `ARIX enquiry — ${interest} — ${firstName} ${lastName}`;
    const body = [`Name: ${firstName} ${lastName}`, `Email: ${senderEmail}`, `Interest: ${interest}`, "", "Message:", message].join("\n");
    const url = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    window.location.href = url;
  }

  if (draftUrl) return <div className="form-confirmation" aria-live="polite"><span>↗</span><h2>Email draft opened.</h2><p>Your message has been addressed to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Please press <strong>Send</strong> in your email app to deliver it.</p><a className="button button-primary" href={draftUrl}>Open draft again <span>↗</span></a><button onClick={() => setDraftUrl(null)}>Write another message</button></div>;
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row"><label>First name<input name="firstName" required placeholder="Your first name" /></label><label>Last name<input name="lastName" required placeholder="Your last name" /></label></div>
      <label>Email address<input type="email" name="email" required placeholder="name@company.com" /></label>
      <label>I&apos;m interested in<select name="interest" defaultValue="Pilot partnership"><option>Pilot partnership</option><option>Investment</option><option>Research collaboration</option><option>Joining the team</option><option>General inquiry</option></select></label>
      <label>Tell us about your interest<textarea name="message" required rows={5} placeholder="How would you like to work with ARIX?" /></label>
      <button className="button button-primary" type="submit">Contact the team <span>↗</span></button>
      <p className="form-note">This opens a complete email draft addressed to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Press Send in your email app to deliver it.</p>
    </form>
  );
}
