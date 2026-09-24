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
        <Link className="arbots-brand" href="/arbots" onClick={() => setOpen(false)} aria-label="V home">
          <div className="vbot-nav-v" aria-hidden="true">
            <svg viewBox="0 0 922 567" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 0 L 303 0 L 461 204 L 618 0 L 922 0 L 461 567 Z M 101 48 L 461 491 L 821 48 L 642 48 L 461 283 L 280 48 Z"
                fillRule="evenodd"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <button className="arbots-menu" type="button" aria-label="Toggle VBot navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        <nav className={open ? "arbots-nav-links is-open" : "arbots-nav-links"} aria-label="VBot navigation">
          <Link className={!onTeam ? "is-active" : ""} href="/arbots" onClick={() => setOpen(false)}>VBot</Link>
          <Link href="/arbots#features" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/arbots#ecosystem" onClick={() => setOpen(false)}>Ecosystem</Link>
          <Link href="/arbots#presence" onClick={() => setOpen(false)}>Presence</Link>
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
          <Link className="arbots-brand arbots-brand-large" href="/arbots" aria-label="V home">
            <div className="vbot-nav-v vbot-footer-v" aria-hidden="true">
              <svg viewBox="0 0 922 567" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 0 0 L 303 0 L 461 204 L 618 0 L 922 0 L 461 567 Z M 101 48 L 461 491 L 821 48 L 642 48 L 461 283 L 280 48 Z"
                  fillRule="evenodd"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
          <p>One companion robot. Complete peace of mind for elders and families.</p>
        </div>
        <div className="arbots-footer-links"><div><strong>Explore</strong><Link href="/arbots#features">Features</Link><Link href="/arbots#ecosystem">Ecosystem</Link><Link href="/arbots#survey">Survey</Link></div><div><strong>ARIX</strong><Link href="/">Parent brand</Link><Link href="/arbots/team">Team</Link><Link href="/contact">Contact</Link></div><div><strong>Follow</strong><a href="https://www.linkedin.com/company/arix-solutions/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/arix.pk?igsh=MTYwY3NiMjluN2Qycw==" target="_blank" rel="noreferrer">Instagram ↗</a></div></div>
      </div>
      <div className="arbots-shell arbots-footer-bottom"><span>© 2026 ARIX / VBot</span><span>Assistive elder care companion robotics · Pakistan &amp; Global</span></div>
    </footer>
  );
}
