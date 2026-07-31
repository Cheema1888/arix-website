import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div><Link className="brand" href="/" aria-label="ARIX home"><BrandLogo large /></Link><p>Physical AI for precision agriculture.</p></div>
        <div className="footer-links"><div><span>Explore</span><Link href="/technology">Technology</Link><Link href="/roadmap">Roadmap</Link></div><div><span>Company</span><Link href="/about">About</Link><Link href="/contact">Contact</Link></div></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 ARIX. All rights reserved.</span><span>Concept-stage technology · Pakistan</span></div>
    </footer>
  );
}
