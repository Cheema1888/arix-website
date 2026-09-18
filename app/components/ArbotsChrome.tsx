"use client";

import Image from "next/image";
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
        <Link className="arbots-brand" href="/arbots" onClick={() => setOpen(false)} aria-label="VBot home">
          <Image className="vbot-nav-logo" src="/arbots/vbot-logo.png" alt="VBot logo" width={32} height={32} priority unoptimized />
          <span className="vbot-brand-text">VBot</span>
        </Link>
        <button className="arbots-menu" type="button" aria-label="Toggle VBot navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? "arbots-nav-links is-open" : "arbots-nav-links"} aria-label="VBot navigation">
          <Link className={!onTeam ? "is-active" : ""} href="/arbots" onClick={() => setOpen(false)}>VBot</Link>
          <Link href="/arbots#features" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/arbots#creative" onClick={() => setOpen(false)}>Creative</Link>
          <Link className={onTeam ? "is-active" : ""} href="/arbots/team" onClick={() => setOpen(false)}>Team</Link>
          <Link className="arbots-nav-cta" href="/arbots#survey" onClick={() => setOpen(false)}>Shape VBot <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function ArbotsFooter() {
  return (
    <footer className="arbots-footer">
      <div className="arbots-shell arbots-footer-main">
        <div>
          <Link className="arbots-brand arbots-brand-large" href="/arbots">
            <Image className="vbot-nav-logo vbot-footer-logo" src="/arbots/vbot-logo.png" alt="VBot logo" width={40} height={40} unoptimized />
            <span className="vbot-brand-text">VBot</span>
          </Link>
          <p>One robot. One identity. A companion with presence.</p>
        </div>
        <div className="arbots-footer-links"><div><strong>Explore</strong><Link href="/arbots#features">Features</Link><Link href="/arbots#creative">Creative</Link><Link href="/arbots#survey">Survey</Link></div><div><strong>ARIX</strong><Link href="/">Parent brand</Link><Link href="/arbots/team">Team</Link><Link href="/contact">Contact</Link></div><div><strong>Follow</strong><a href="https://www.linkedin.com/company/arix-solutions/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/arix.pk?igsh=MTYwY3NiMjluN2Qycw==" target="_blank" rel="noreferrer">Instagram ↗</a></div></div>
      </div>
      <div className="arbots-shell arbots-footer-bottom"><span>© 2026 ARIX / VBot</span><span>Concept-stage companion robotics · Pakistan</span></div>
    </footer>
  );
}
