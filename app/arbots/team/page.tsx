import Link from "next/link";
import { ArbotsReveal } from "../../components/ArbotsReveal";

export default function ArbotsTeamPage() {
  return (
    <main className="arbots-main arbots-team-page">
      <section className="arbots-team-hero">
        <div className="arbots-grid" aria-hidden="true" />
        <div className="arbots-team-v" aria-hidden="true">
          <svg viewBox="0 0 922 567" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 0 L 303 0 L 461 204 L 618 0 L 922 0 L 461 567 Z M 101 48 L 461 491 L 821 48 L 642 48 L 461 283 L 280 48 Z"
              fillRule="evenodd"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="arbots-shell">
          <p className="arbots-kicker">ARIX / VBOT</p>
          <h1>The team behind<br /><span>VBot.</span></h1>
          <p>One cross functional team engineering hardware, computer vision, and physical AI for elderly care and family telepresence.</p>
        </div>
      </section>
      <section className="arbots-section arbots-parent">
        <div className="arbots-shell arbots-parent-grid">
          <ArbotsReveal>
            <p className="arbots-index">01 / Built under ARIX</p>
            <h2>Assistive robotics<br />with a <span>human focus.</span></h2>
          </ArbotsReveal>
          <ArbotsReveal delay={.1}>
            <p>ARIX is the parent brand behind VBot. While ARIX develops physical AI across real world systems, VBot applies that foundation to autonomous assistive robotics, protecting elderly health, independence, and peace of mind for families.</p>
            <p>VBot is our focused MVP prototype: proving dependable elder safety and telepresence today while laying the ground for our vastly broader domestic robotics ambition.</p>
            <Link className="arbots-text-link bright" href="/">Visit ARIX →</Link>
          </ArbotsReveal>
        </div>
      </section>
      <section className="arbots-section arbots-team">
        <div className="arbots-shell">
          <ArbotsReveal className="arbots-section-head">
            <p className="arbots-index">02 / The team</p>
            <h2>Team<br /><span>ARIX.</span></h2>
          </ArbotsReveal>
          <ArbotsReveal className="arbots-about-grid" delay={.08}>
            <div className="arbots-about-lead">VBot is created by one cross functional group: Team ARIX.</div>
            <div>
              <p>The team works across product, embedded hardware, computer vision, artificial intelligence, geriatric care UX, and robotics as one unit.</p>
              <p>Individual roles and member profiles are intentionally not listed at this stage.</p>
            </div>
          </ArbotsReveal>
        </div>
      </section>
      <section className="arbots-team-mission">
        <div className="arbots-shell">
          <ArbotsReveal>
            <p className="arbots-index">03 / Our mission</p>
            <blockquote>“Technology should protect our elders with dignity, keeping loved ones safe, routines reliable, and families effortlessly connected.”</blockquote>
          </ArbotsReveal>
        </div>
      </section>
      <section className="arbots-waitlist">
        <div className="arbots-shell arbots-back-product">
          <div>
            <p className="arbots-kicker">Meet what we are building.</p>
            <h2>One ecosystem.<br /><span>One VBot.</span></h2>
          </div>
          <Link className="arbots-button primary" href="/arbots">Back to the product <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}
