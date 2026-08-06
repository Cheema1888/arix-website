"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ArbotsNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onTeam = pathname === "/arbots/team";

  return (
    <header className="arbots-header">
      <div className="arbots-nav-shell">
        <Link className="arbots-brand" href="/arbots" onClick={() => setOpen(false)} aria-label="Arbots X home">
          <span>AR</span>BOTS <i>X</i>
        </Link>
        <button className="arbots-menu" type="button" aria-label="Toggle Arbots navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? "arbots-nav-links is-open" : "arbots-nav-links"} aria-label="Arbots navigation">
          <Link className={!onTeam ? "is-active" : ""} href="/arbots" onClick={() => setOpen(false)}>Product</Link>
          <Link href="/arbots#vision" onClick={() => setOpen(false)}>Vision</Link>
          <Link href="/arbots#features" onClick={() => setOpen(false)}>Features</Link>
          <Link className={onTeam ? "is-active" : ""} href="/arbots/team" onClick={() => setOpen(false)}>Team</Link>
          <Link className="arbots-nav-cta" href="/arbots#waitlist" onClick={() => setOpen(false)}>Join waitlist <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function ArbotsFooter() {
  return (
    <footer className="arbots-footer">
      <div className="arbots-shell arbots-footer-main">
        <div><Link className="arbots-brand arbots-brand-large" href="/arbots"><span>AR</span>BOTS <i>X</i></Link><p>One robot. One identity. A companion with presence.</p></div>
        <div className="arbots-footer-links"><div><strong>Explore</strong><Link href="/arbots">Product</Link><Link href="/arbots#features">Features</Link><Link href="/arbots/team">Team</Link></div><div><strong>ARIX</strong><Link href="/">Parent brand</Link><Link href="/contact">Contact</Link><a href="mailto:arix.solutions.pk@gmail.com">Email</a></div><div><strong>Follow</strong><a href="https://www.linkedin.com/company/arix-solutions/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/arix.pk?igsh=MTYwY3NiMjluN2Qycw==" target="_blank" rel="noreferrer">Instagram ↗</a></div></div>
      </div>
      <div className="arbots-shell arbots-footer-bottom"><span>© 2026 ARIX / ARBOTS</span><span>Concept-stage companion robotics · Pakistan</span></div>
    </footer>
  );
}
