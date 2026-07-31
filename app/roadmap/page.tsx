import Link from "next/link";

const phases = [
  { label: "Now", title: "MVP-A · Prove the intelligence", status: "In development", items: ["Manual RC survey flight", "RGB image acquisition", "Post-flight AI detection", "Geo-referenced heat map", "PDF field report", "Small water-spray demonstration"] },
  { label: "Next", title: "MVP-B · Add autonomy", status: "Planned", items: ["Autonomous waypoint navigation", "Onboard AI processing", "Faster field-to-insight loop", "Repeatable autonomous coverage"] },
  { label: "Vision", title: "Precision response at scale", status: "Future direction", items: ["Disease-specific treatment zones", "Targeted autonomous spraying", "Season-over-season field intelligence", "Multi-crop model expansion"] },
];

export default function RoadmapPage() { return <main>
  <section className="page-hero roadmap-hero"><div className="roadmap-orbit" aria-hidden="true"><div><span>Now</span><i /></div><div><span>Next</span><i /></div><div><span>Vision</span><i /></div></div><div className="shell"><p className="eyebrow">Build deliberately. Validate in the field.</p><h1>A clear path from<br /><span>insight to action.</span></h1><p>ARIX separates what must be proven now from what becomes possible next.</p></div></section>
  <section className="section shell"><div className="roadmap-list">{phases.map((phase, index) => <article key={phase.label} className={index === 0 ? "current" : ""}><div className="phase-rail"><span>{phase.label}</span><i /></div><div className="phase-content"><div className="phase-title"><h2>{phase.title}</h2><span>{phase.status}</span></div><ul>{phase.items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}</div></section>
  <section className="principles section shell"><div><p className="section-index">Execution principles</p><h2>Evidence before complexity.</h2></div><div className="principle-grid"><article><span>01</span><h3>Field first</h3><p>Private-land testing and wheat access keep early validation grounded.</p></article><article><span>02</span><h3>Human validation</h3><p>An agronomist connection supports disease-label and treatment review.</p></article><article><span>03</span><h3>Modular progress</h3><p>Hardware, flight, AI, and mapping streams can advance without blocking one another.</p></article></div></section>
  <section className="cta-section shell"><div><p className="eyebrow">Interested in the journey?</p><h2>Help ARIX move from plan to field.</h2></div><Link className="button button-primary" href="/contact">Contact the team <span>↗</span></Link></section>
  </main>; }
