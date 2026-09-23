import Link from "next/link";
import Image from "next/image";
import { FieldScanner } from "../components/FieldScanner";

const layers = [
  ["01", "Capture", "Downward RGB imagery collected during a manually piloted survey flight."],
  ["02", "Synchronize", "Flight-controller logs align each image with position and time."],
  ["03", "Detect", "A dual-track YOLOv8n experiment compares classification and detection approaches."],
  ["04", "Georeference", "Detection results become coordinates that can be placed on the field."],
  ["05", "Report", "A heat map and PDF translate model output into a practical review layer."],
];

export default function TechnologyPage() {
  return <main>
    <section className="page-hero technology-hero has-media"><div className="page-hero-media"><Image src="/arix-crop-diagnostics.png" alt="Wheat leaves analyzed for crop disease" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div><div className="shell"><p className="eyebrow">The ARIX intelligence pipeline</p><h1>From aerial imagery<br />to <span>field-level clarity.</span></h1><p>Designed to prove the crop-intelligence workflow first, then move toward autonomous survey and response.</p></div><div className="page-hero-tag" aria-hidden="true"><span>01</span> Detecting field signals</div></section>
    <section className="section shell technology-overview"><div><p className="section-index">01 / Architecture</p><h2>A practical system, built in layers.</h2></div><p>The initial architecture keeps complex flight autonomy out of the critical path. The pilot flies; the laptop processes; the field map proves the value.</p></section>
    <section className="section shell"><div className="architecture-list">{layers.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>→</i></article>)}</div></section>
    <section className="diagnostic-showcase"><div className="diagnostic-media"><Image src="/arix-crop-diagnostics.png" alt="Wheat leaves with disease symptoms and computer-vision detection markers" fill sizes="(max-width: 980px) 100vw, 58vw" /><span>Illustrative AI detection view</span></div><div className="diagnostic-copy"><p className="section-index">02 / Field evidence</p><h2>Find the signal<br />inside the crop.</h2><p>High-resolution imagery gives the model the visual evidence it needs to separate healthy tissue from disease symptoms and place each finding back on the field.</p><div className="diagnostic-classes"><span>Healthy wheat</span><span>Yellow rust</span><span>Brown rust</span><span>Septoria</span></div></div></section>
    <section className="scanner-section section"><div className="shell scanner-layout wide"><div className="scanner-intro"><p className="section-index">03 / Detection concept</p><h2>Four classes.<br />One readable map.</h2><p>The first model targets healthy wheat, yellow rust, brown rust, and Septoria leaf blotch. The final AI approach will be selected after a controlled classification-versus-detection experiment.</p><div className="spec-list"><div><span>Model candidates</span><strong>YOLOv8n-cls / YOLOv8n-det</strong></div><div><span>Processing</span><strong>Post-flight laptop</strong></div><div><span>Validation</span><strong>Agronomist reviewed</strong></div></div></div><FieldScanner /></div></section>
    <section className="section shell boundary-section"><p className="section-index">04 / Product truth</p><div><h2>What ARIX is, and what comes next.</h2><p><strong>Now:</strong> a concept-stage manual survey and post-flight crop intelligence pipeline under development.</p><p><strong>Next:</strong> autonomous waypoint coverage, onboard processing, and targeted spraying after the detection and mapping system is validated.</p><Link className="button button-primary" href="/roadmap">See the build roadmap <span>→</span></Link></div></section>
  </main>;
}
