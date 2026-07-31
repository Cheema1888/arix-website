"use client";

import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="ARIX home" onClick={() => setOpen(false)}>
          <span className="brand-word">ARI</span><span className="brand-x">X</span>
        </Link>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <Link href="/technology" onClick={() => setOpen(false)}>Technology</Link>
          <Link href="/roadmap" onClick={() => setOpen(false)}>Roadmap</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Contact <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
