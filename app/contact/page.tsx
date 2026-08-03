import { ContactForm } from "../components/ContactForm";

export default function ContactPage() { return <main>
  <section className="page-hero contact-hero"><div className="shell"><p className="eyebrow">Contact ARIX</p><h1>Let&apos;s build the<br /><span>next field trial.</span></h1><p>We&apos;d like to hear from growers, researchers, investors, engineers, and agricultural partners.</p></div></section>
  <section className="section shell contact-layout"><div className="contact-copy"><p className="section-index">Start a conversation</p><h2>Where can precision take us?</h2><p>Tell us what you&apos;re working on and how you see ARIX fitting into the future of agriculture.</p><a className="contact-email" href="mailto:arix.solutions.pk@gmail.com"><span>Email the team</span><strong>arix.solutions.pk@gmail.com</strong><i>↗</i></a><div className="contact-topics"><span>Pilot programs</span><span>Investment</span><span>Research</span><span>Talent</span></div></div><ContactForm /></section>
  </main>; }
