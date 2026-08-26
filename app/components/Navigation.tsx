"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/arbots") || pathname.startsWith("/accounts")) return null;
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="ARIX home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/technology" onClick={() => setOpen(false)}>Technology</Link>
          <Link href="/arbots" onClick={() => setOpen(false)}>Arbots</Link>
          <Link href="/roadmap" onClick={() => setOpen(false)}>Roadmap</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link className="nav-login" href="/accounts/login" onClick={() => setOpen(false)}><span aria-hidden="true">●</span> Accounts login</Link>
          <ThemeToggle />
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Contact <span>↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
