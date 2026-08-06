import Link from "next/link";
import { ArbotsJourney } from "../components/ArbotsJourney";
import { ArbotsRobot } from "../components/ArbotsRobot";
import { ArbotsSurvey } from "../components/ArbotsSurvey";

const specifications = [
  ["Product", "Arbots X"],
  ["Stage", "Concept + prototype"],
  ["Interaction", "Voice + expressive display"],
  ["Intelligence", "Local / hybrid under evaluation"],
  ["Power", "Plug-in + rechargeable under evaluation"],
  ["Languages", "English, Urdu + regional research"],
];

export default function ArbotsPage() {
  return (
    <main className="arbots-main arbots-simple">
      <section className="arbots-xx-hero" id="product">
        <div className="arbots-star-field" aria-hidden="true" />
        <div className="arbots-double-x" aria-hidden="true"><span>X</span><span>X</span></div>
        <div className="arbots-xx-robot"><ArbotsRobot /></div>
        <div className="arbots-xx-copy">
          <p className="arbots-kicker"><span /> ARIX presents ARBOTS</p>
          <h1>Meet <em>X.</em></h1>
          <p>A small AI companion with a voice, a face, and a presence of its own.</p>
          <div className="arbots-actions">
            <Link className="arbots-button primary" href="#survey">Shape X <span>↓</span></Link>
            <Link className="arbots-text-link" href="#story">See how it feels →</Link>
          </div>
        </div>
        <a className="arbots-simple-scroll" href="#story">Scroll to discover <i /></a>
      </section>

      <ArbotsJourney />

      <section className="arbots-specs" id="specifications">
        <div className="arbots-shell">
          <div className="arbots-specs-heading">
            <p className="arbots-index">What we are building</p>
            <h2>Small in form.<br /><span>Full of character.</span></h2>
            <p>These are working directions, not final promises. Your survey response helps us decide what X should become first.</p>
          </div>
          <dl className="arbots-spec-list">
            {specifications.map(([label, value], index) => (
              <div key={label}><dt>0{index + 1} / {label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="arbots-survey-section" id="survey">
        <div className="arbots-shell arbots-survey-layout">
          <div className="arbots-survey-intro">
            <p className="arbots-index">Help shape the first X</p>
            <h2>Your answers.<br /><span>A better companion.</span></h2>
            <p>Ten quick questions. No name, phone number, or email required.</p>
          </div>
          <ArbotsSurvey />
        </div>
      </section>
    </main>
  );
}
