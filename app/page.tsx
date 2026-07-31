import Link from "next/link";
import Image from "next/image";
import { FieldScanner } from "./components/FieldScanner";

const pipeline = [
  { number: "01", title: "Survey", text: "A manually piloted drone captures high-resolution crop imagery across the field." },
  { number: "02", title: "Detect", text: "A laptop-based AI pipeline identifies healthy wheat and priority disease classes." },
  { number: "03", title: "Map", text: "Imagery and flight logs are synchronized into a geo-referenced disease heat map." },
  { number: "04", title: "Act", text: "The grower receives a clear report that turns crop signals into focused field decisions." },
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-home">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
          <source src="/arix-field-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="scan-line" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content shell">
          <p className="eyebrow"><span className="status-dot" /> Physical AI for precision agriculture</p>
          <h1>See disease sooner.<br /><span>Treat only what matters.</span></h1>
          <p className="hero-copy">ARIX is building an AI-powered crop intelligence system that surveys wheat fields, detects disease, and maps exactly where attention is needed.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">Contact the team <span>↗</span></Link>
            <Link className="button button-ghost" href="/technology">Explore the system <span>→</span></Link>
          </div>
        </div>
        <div className="hero-status shell">
          <div><span>Stage</span><strong>Concept + prototype development</strong></div>
          <div><span>Initial crop</span><strong>Wheat</strong></div>
          <div><span>First deployment</span><strong>Private field trials</strong></div>
        </div>
      </section>

      <section className="statement section shell">
        <p className="section-index">01 / Mission</p>
        <div className="statement-copy">
          <h2>Every field tells a story.<br /><span>ARIX makes it visible.</span></h2>
          <p>Uniform spraying treats every acre the same. We are building a more precise path: find affected zones, understand disease pressure, and support treatment decisions with field-level intelligence.</p>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><p className="section-index">02 / System</p><h2>From crop to coordinates</h2></div>
          <p>A practical first MVP that proves the intelligence pipeline before adding flight autonomy.</p>
        </div>
        <div className="pipeline-grid">
          {pipeline.map((item) => (
            <article className="pipeline-card" key={item.number}>
              <span>{item.number}</span><div className="pipeline-pulse" aria-hidden="true" />
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="scanner-section section">
        <div className="shell scanner-layout">
          <div className="scanner-intro">
            <p className="section-index">03 / Intelligence layer</p>
            <h2>Signals you can act on.</h2>
            <p>ARIX is initially focused on four wheat conditions. Explore the interface concept to see how field imagery becomes a readable disease map.</p>
            <Link className="text-link" href="/technology">Inside the technology <span>→</span></Link>
          </div>
          <FieldScanner compact />
        </div>
      </section>

      <section className="section shell impact-section">
        <div className="section-heading">
          <div><p className="section-index">04 / Intended impact</p><h2>Precision with a purpose</h2></div>
          <p>These figures are product targets from the current implementation plan. Field validation is still ahead.</p>
        </div>
        <div className="impact-grid">
          <div className="impact-feature"><span className="metric">20–40<sup>%</sup></span><h3>Target chemical reduction</h3><p>By focusing future treatment on mapped disease zones rather than the entire field.</p></div>
          <div className="impact-card"><span>01</span><h3>Lower input waste</h3><p>Support more intentional use of crop protection products.</p></div>
          <div className="impact-card"><span>02</span><h3>Faster scouting</h3><p>Turn aerial coverage into a field report that is easier to review.</p></div>
          <div className="impact-card"><span>03</span><h3>Decision history</h3><p>Build a data layer for comparing disease patterns over time.</p></div>
        </div>
      </section>

      <section className="vision-band">
        <div className="vision-media"><Image src="/arix-drone-concept.png" alt="ARIX concept drone scanning a wheat field at golden hour" fill sizes="(max-width: 980px) 100vw, 54vw" /></div>
        <div className="vision-copy"><p className="section-index">05 / The path forward</p><h2>Prove the intelligence.<br />Then automate the response.</h2><p>MVP-A validates manual survey, post-flight detection, geo-referencing, heat maps, and reporting. MVP-B introduces waypoint autonomy and onboard processing.</p><Link className="button button-primary" href="/roadmap">View the roadmap <span>→</span></Link></div>
      </section>

      <section className="cta-section shell">
        <div><p className="eyebrow">Build the future of field intelligence</p><h2>Let&apos;s make every pass count.</h2></div>
        <Link className="button button-primary" href="/contact">Contact the ARIX team <span>↗</span></Link>
      </section>
    </main>
  );
}
