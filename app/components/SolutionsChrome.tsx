"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function SolutionsWordmark({ large = false }: { large?: boolean }) {
  if (large) {
    return <span className="solutions-wordmark-full" aria-hidden="true"><Image src="/arix-solutions-logo.jpeg" alt="" width={1050} height={1250} /></span>;
  }
  return (
    <span className="solutions-wordmark" aria-hidden="true">
      <span className="solutions-wordmark-mark"><Image src="/arix-solutions-logo.jpeg" alt="" width={1050} height={1250} /></span>
      <span className="solutions-wordmark-name"><strong>ARIX</strong><b>SOLUTIONS</b></span>
    </span>
  );
}

export function SolutionsNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="solutions-header">
      <div className="solutions-nav-shell">
        <Link className="solutions-brand" href="/solutions" aria-label="ARIX Solutions home" onClick={() => setOpen(false)}><SolutionsWordmark /></Link>
        <button className="solutions-menu" type="button" aria-label="Toggle ARIX Solutions navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? "solutions-nav-links is-open" : "solutions-nav-links"} aria-label="ARIX Solutions navigation">
          <Link href="/solutions#services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/solutions#process" onClick={() => setOpen(false)}>Process</Link>
          <Link href="/" onClick={() => setOpen(false)}>ARIX parent</Link>
          <a className="solutions-nav-cta" href="mailto:solutions@arix.pk?subject=Project%20inquiry%20for%20ARIX%20Solutions" onClick={() => setOpen(false)}>Start a project <span>↗</span></a>
        </nav>
      </div>
    </header>
  );
}

export function SolutionsFooter() {
  return (
    <footer className="solutions-footer">
      <div className="solutions-shell solutions-footer-main">
        <div><Link className="solutions-brand" href="/solutions" aria-label="ARIX Solutions home"><SolutionsWordmark large /></Link><p>Modern websites and end-to-end technology solutions for growing businesses.</p></div>
        <div className="solutions-footer-links">
          <div><strong>Services</strong><Link href="/solutions#seo-audit">SEO audit</Link><Link href="/solutions#website-development">Website development</Link></div>
          <div><strong>Company</strong><Link href="/">ARIX parent</Link><a href="mailto:solutions@arix.pk">solutions@arix.pk</a></div>
          <address><strong>Islamabad office</strong><span>Office #7, 2nd Floor, Ahmed Center<br />I-8 Markaz, Islamabad 46000<br />Pakistan</span></address>
        </div>
      </div>
      <div className="solutions-shell solutions-footer-bottom"><span>© 2026 ARIX SOLUTIONS</span><span>An ARIX company · Pakistan</span></div>
    </footer>
  );
}
