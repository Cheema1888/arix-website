"use client";

import Link from "next/link";
import { useEffect } from "react";

const services = [
  {
    number: "01",
    title: "SEO audit",
    summary: "Find what is holding your website back—and turn the findings into a practical growth plan.",
    items: ["Technical and indexability audit", "On-page and content review", "Search opportunity mapping", "Prioritized 90-day roadmap"],
  },
  {
    number: "02",
    title: "Website development",
    summary: "Launch a fast, clear, conversion-focused website built around your business goals.",
    items: ["Strategy and user experience", "Responsive website development", "Performance and SEO foundations", "Analytics, launch, and handover"],
  },
];

const process = [
  ["01", "Discover", "We learn your business, audience, goals, and current obstacles."],
  ["02", "Define", "We turn the findings into a focused scope and measurable priorities."],
  ["03", "Deliver", "We audit, design, and build in clear stages with practical feedback loops."],
  ["04", "Scale", "We launch with the systems, insights, and next steps needed to keep growing."],
];

export function SolutionsLanding() {
  useEffect(() => {
    const previousTheme = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = "light";
    document.body.classList.add("solutions-active");
    return () => {
      document.body.classList.remove("solutions-active");
      document.documentElement.dataset.theme = previousTheme || "light";
    };
  }, []);

  return (
    <main className="solutions-page">
      <section className="solutions-hero">
        <div className="solutions-grid" aria-hidden="true" />
        <div className="solutions-shell solutions-hero-layout">
          <div className="solutions-hero-copy">
            <p className="solutions-label"><span /> ARIX Solutions · Islamabad</p>
            <h1>Building modern websites and <em>end-to-end tech solutions.</em></h1>
            <p className="solutions-lead">Helping small and medium businesses build a stronger digital presence, reach the right customers, and scale with confidence.</p>
            <div className="solutions-actions">
              <a className="solutions-button primary" href="mailto:solutions@arix.pk?subject=Project%20inquiry%20for%20ARIX%20Solutions">Start a project <span>↗</span></a>
              <a className="solutions-button secondary" href="#services">Explore services <span>↓</span></a>
            </div>
          </div>

          <div className="solutions-index" aria-label="ARIX Solutions service overview">
            <div className="solutions-index-top"><span>Service index</span><b>02 capabilities</b></div>
            <Link href="#seo-audit"><span>01</span><div><small>Diagnose</small><strong>SEO audit</strong></div><i>↗</i></Link>
            <Link href="#website-development"><span>02</span><div><small>Create</small><strong>Website development</strong></div><i>↗</i></Link>
            <div className="solutions-index-bottom"><span>One partner</span><strong>From first insight to final launch.</strong></div>
          </div>
        </div>
        <div className="solutions-marquee" aria-hidden="true"><span>Strategy</span><i /> <span>Search</span><i /> <span>Design</span><i /> <span>Development</span><i /> <span>Growth</span></div>
      </section>

      <section className="solutions-intro solutions-shell">
        <p className="solutions-section-number">01 / What we solve</p>
        <div><h2>Your digital foundation should move the business forward.</h2><p>We combine clear thinking, modern design, and disciplined development to solve the problems that matter: being found, building trust, converting interest, and creating room to grow.</p></div>
      </section>

      <section className="solutions-services" id="services">
        <div className="solutions-shell">
          <div className="solutions-heading"><div><p className="solutions-section-number">02 / Core services</p><h2>Focused services.<br />Measurable value.</h2></div><p>Start with one service or combine both into a complete digital growth engagement.</p></div>
          <div className="solutions-service-grid">
            {services.map((service) => (
              <article id={service.number === "01" ? "seo-audit" : "website-development"} key={service.number}>
                <div className="solutions-service-head"><span>{service.number}</span><i>{service.number === "01" ? "SEARCH" : "BUILD"}</i></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>{service.items.map((item) => <li key={item}><span>+</span>{item}</li>)}</ul>
                <a href={`mailto:solutions@arix.pk?subject=${service.number === "01" ? "SEO%20audit" : "Website%20development"}%20inquiry`}>Discuss this service <span>↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="solutions-process solutions-shell" id="process">
        <div className="solutions-heading"><div><p className="solutions-section-number">03 / How we work</p><h2>Clear from day one.</h2></div><p>A simple, collaborative process that keeps decisions visible and momentum steady.</p></div>
        <div className="solutions-process-grid">
          {process.map(([number, title, text]) => <article key={number}><span>{number}</span><div className="solutions-process-mark"><i /></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="solutions-fit">
        <div className="solutions-shell solutions-fit-layout">
          <div><p className="solutions-section-number">04 / Built for ambitious SMEs</p><h2>Small team.<br />Serious outcomes.</h2></div>
          <div className="solutions-fit-list">
            <div><span>01</span><p>Businesses launching their first professional digital presence.</p></div>
            <div><span>02</span><p>Growing companies whose current website no longer reflects their quality.</p></div>
            <div><span>03</span><p>Teams that need a clear SEO diagnosis before investing in growth.</p></div>
          </div>
        </div>
      </section>

      <section className="solutions-contact solutions-shell" id="contact">
        <div className="solutions-contact-main">
          <p className="solutions-label"><span /> Have a project in mind?</p>
          <h2>Let&apos;s build what your business needs next.</h2>
          <a href="mailto:solutions@arix.pk">solutions@arix.pk <span>↗</span></a>
        </div>
        <address><span>ARIX office</span><strong>Office #7, 2nd Floor, Ahmed Center</strong><p>I-8 Markaz, Islamabad, Islamabad 46000<br />Pakistan</p></address>
      </section>
    </main>
  );
}
