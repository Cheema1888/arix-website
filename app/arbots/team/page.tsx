import Link from "next/link";
import { ArbotsReveal } from "../../components/ArbotsReveal";

const team = [
  ["Founder / Lead", "FL", "Product direction, company building, and the focused story behind X."],
  ["Hardware Lead", "HW", "Mechanical architecture, prototyping, and the physical character of the robot."],
  ["Software Lead", "SW", "The product layer connecting interaction, services, and the companion experience."],
  ["Embedded Systems", "ES", "Electronics, firmware, sensors, power, and the systems that make X responsive."],
  ["AI Engineer", "AI", "Voice, intelligence, memory concepts, and expressive behaviour."],
  ["Product Designer", "PD", "Form, interaction language, expression, and the details that make X approachable."],
  ["Robotics Engineer", "RX", "Motion, integration, testing, and turning individual systems into one robot."],
];

export default function ArbotsTeamPage() {
  return <main className="arbots-main arbots-team-page">
    <section className="arbots-team-hero"><div className="arbots-grid" aria-hidden="true" /><div className="arbots-team-x" aria-hidden="true">X</div><div className="arbots-shell"><p className="arbots-kicker">ARIX / ARBOTS</p><h1>The team behind<br /><span>Arbots.</span></h1><p>One cross-functional team shaping the intelligence, hardware, character, and emotional presence of X.</p></div></section>
    <section className="arbots-section arbots-parent"><div className="arbots-shell arbots-parent-grid"><ArbotsReveal><p className="arbots-index">01 / Built under ARIX</p><h2>A robotics initiative<br />with a <span>human focus.</span></h2></ArbotsReveal><ArbotsReveal delay={.1}><p>ARIX is the parent brand behind Arbots. While ARIX explores physical AI across real-world systems, Arbots focuses that ambition on emotionally engaging companion robotics.</p><p>X is the first concentrated expression of that initiative: one robot, one identity, and a product experience designed as a whole.</p><Link className="arbots-text-link bright" href="/">Visit ARIX →</Link></ArbotsReveal></div></section>
    <section className="arbots-section arbots-team"><div className="arbots-shell"><ArbotsReveal className="arbots-section-head split"><div><p className="arbots-index">02 / Team structure</p><h2>Different disciplines.<br /><span>One personality.</span></h2></div><p>These editable role cards define the team shape for the current concept stage. Names, portraits, biographies, and profiles can be added as the team is announced.</p></ArbotsReveal><div className="arbots-team-grid">{team.map(([role, initials, bio], index) => <ArbotsReveal className="arbots-team-card" delay={(index % 3) * .05} key={role}><div className="arbots-team-avatar"><span>{initials}</span><i /></div><div><span>Team member</span><h3>{role}</h3><p>{bio}</p><span className="arbots-profile-placeholder">Profile coming soon</span></div></ArbotsReveal>)}</div></div></section>
    <section className="arbots-team-mission"><div className="arbots-shell"><ArbotsReveal><p className="arbots-index">03 / Our mission</p><blockquote>“Make robotics more personal, accessible, and emotionally meaningful—without losing the discipline of building something real.”</blockquote></ArbotsReveal></div></section>
    <section className="arbots-waitlist"><div className="arbots-shell arbots-back-product"><div><p className="arbots-kicker">Meet what we are building.</p><h2>One team.<br /><span>One X.</span></h2></div><Link className="arbots-button primary" href="/arbots">Back to the product <span>→</span></Link></div></section>
  </main>;
}
