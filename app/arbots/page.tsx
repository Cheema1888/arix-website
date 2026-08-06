import Link from "next/link";
import { ArbotsRobot } from "../components/ArbotsRobot";
import { ArbotsReveal } from "../components/ArbotsReveal";

const features = [
  ["01", "Voice interaction", "A natural voice interface designed for quick questions, gentle check-ins, and everyday conversation."],
  ["02", "Expressive personality", "A responsive face and motion language that make listening, thinking, and delight visible."],
  ["03", "Companion intelligence", "Useful assistance shaped around presence—not another screen demanding constant attention."],
  ["04", "Smart reminders", "Timely prompts for routines, focus sessions, small tasks, and the moments that are easy to miss."],
  ["05", "Personal over time", "A future-ready foundation for preferences and interactions that feel increasingly familiar."],
  ["06", "Privacy-conscious", "Local and hybrid intelligence are being explored to keep sensitive interactions appropriately contained."],
];

const scenarios = [
  ["01", "At your desk", "A quiet presence for focus, reminders, quick answers, and a little personality between tasks."],
  ["02", "Where you study", "A companion that can help structure a session, surface a prompt, or simply react when you need a reset."],
  ["03", "By your bedside", "Gentle routines, low-light expressions, and information delivered without reaching for another bright screen."],
];

export default function ArbotsPage() {
  return <main className="arbots-main">
    <section className="arbots-hero" id="product">
      <div className="arbots-grid" aria-hidden="true" /><div className="arbots-particle p1" /><div className="arbots-particle p2" /><div className="arbots-particle p3" />
      <div className="arbots-x-mark" aria-hidden="true">X</div>
      <div className="arbots-hero-robot"><ArbotsRobot /></div>
      <div className="arbots-shell arbots-hero-content">
        <div className="arbots-hero-copy"><p className="arbots-kicker"><span /> ARIX presents ARBOTS</p><h1>A companion<br />with <em>presence.</em></h1><p>Meet X—an expressive AI companion robot being designed to feel intelligent, useful, and meaningfully alive.</p><div className="arbots-actions"><Link className="arbots-button primary" href="#waitlist">Join waitlist <span>↗</span></Link><Link className="arbots-button ghost" href="#about">Explore X <span>↓</span></Link><Link className="arbots-text-link" href="/arbots/team">Meet the team →</Link></div></div>
        <div className="arbots-hero-meta"><div><span>Status</span><strong>In development</strong></div><div><span>Identity</span><strong>Arbots X</strong></div><div><span>Focus</span><strong>Emotional presence</strong></div></div>
      </div>
      <a className="arbots-scroll-cue" href="#about"><span>Scroll to meet X</span><i /></a>
    </section>

    <section className="arbots-section arbots-about" id="about"><div className="arbots-shell">
      <ArbotsReveal className="arbots-section-head"><p className="arbots-index">01 / Meet X</p><h2>Technology can be capable.<br /><span>We want it to feel close.</span></h2></ArbotsReveal>
      <ArbotsReveal className="arbots-about-grid" delay={.1}><div className="arbots-about-lead">X is a small companion robot in development under Arbots, a robotics initiative by ARIX.</div><div><p>It is being shaped around a simple idea: helpful technology should communicate more than information. Through voice, expression, movement, and timing, X aims to make interaction feel warmer and more intuitive.</p><p>The first product direction explores wake-word interaction, smart reminders, expressive states, and a personality that can sit naturally in a workspace, study area, or home.</p></div></ArbotsReveal>
    </div></section>

    <section className="arbots-section arbots-expression-section" id="expressions"><div className="arbots-shell arbots-expression-layout">
      <ArbotsReveal className="arbots-expression-copy"><p className="arbots-index">02 / Emotional interface</p><h2>You should know<br />how X <span>feels.</span></h2><p>Expression is part of the interface. X makes its state legible—when it is listening, curious, thinking, excited, or winding down.</p><div className="arbots-signal-list"><span><i /> Face animation</span><span><i /> Light and motion</span><span><i /> Voice response</span></div></ArbotsReveal>
      <ArbotsReveal className="arbots-expression-demo" delay={.12}><ArbotsRobot interactive compact /></ArbotsReveal>
    </div></section>

    <section className="arbots-section arbots-features" id="features"><div className="arbots-shell">
      <ArbotsReveal className="arbots-section-head split"><div><p className="arbots-index">03 / Designed around presence</p><h2>Small robot.<br /><span>Real character.</span></h2></div><p>A focused first product—not a catalogue of promises. These are the capabilities guiding prototype decisions today.</p></ArbotsReveal>
      <div className="arbots-feature-grid">{features.map(([n,title,copy], index) => <ArbotsReveal className="arbots-feature-card" delay={(index % 3) * .06} key={n}><span>{n}</span><div className="arbots-feature-icon" aria-hidden="true"><i /><i /></div><h3>{title}</h3><p>{copy}</p></ArbotsReveal>)}</div>
    </div></section>

    <section className="arbots-vision" id="vision"><div className="arbots-vision-orbit" aria-hidden="true"><i /><i /><i /></div><div className="arbots-shell">
      <ArbotsReveal><p className="arbots-index">04 / The Arbots vision</p><h2>Build technology<br />that feels <span>alive.</span></h2><p>Arbots exists to explore a more personal relationship with robotics—one where emotional clarity, thoughtful form, and useful intelligence belong in the same object.</p><Link className="arbots-button ghost" href="/arbots/team">The team behind Arbots <span>→</span></Link></ArbotsReveal>
    </div></section>

    <section className="arbots-section arbots-scenarios"><div className="arbots-shell">
      <ArbotsReveal className="arbots-section-head"><p className="arbots-index">05 / One identity, different moments</p><h2>Presence that fits<br /><span>into real life.</span></h2></ArbotsReveal>
      <div className="arbots-scenario-list">{scenarios.map(([n,title,copy]) => <article key={n}><div className="arbots-scenario-number">{n}</div><div className="arbots-scenario-scene" aria-hidden="true"><div className="mini-x">X</div><div className="mini-bot"><i /><i /></div></div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div></section>

    <section className="arbots-section arbots-status"><div className="arbots-shell arbots-status-grid">
      <ArbotsReveal><p className="arbots-index">06 / Development status</p><h2>Prototype phase.<br /><span>Follow the journey.</span></h2></ArbotsReveal>
      <ArbotsReveal className="arbots-status-panel" delay={.1}><div className="arbots-status-live"><i /> Currently in development</div><div><span>Now</span><strong>Identity, interaction and hardware concepts</strong></div><div><span>Next</span><strong>Integrated prototype and early user testing</strong></div><p>Features and final specifications may change as X moves through development.</p></ArbotsReveal>
    </div></section>

    <section className="arbots-waitlist" id="waitlist"><div className="arbots-shell arbots-waitlist-grid">
      <ArbotsReveal><p className="arbots-kicker">Be there when X wakes up.</p><h2>Join the first<br /><span>circle.</span></h2></ArbotsReveal>
      <ArbotsReveal className="arbots-waitlist-form-wrap" delay={.1}><p>Follow prototype progress, early demonstrations, and opportunities to meet X.</p><form className="arbots-waitlist-form" action="/contact" method="get"><label htmlFor="arbots-email">Email address</label><div><input id="arbots-email" type="email" name="email" required placeholder="you@example.com" /><input type="hidden" name="interest" value="Arbots X early access" /><button type="submit">Join waitlist <span>↗</span></button></div></form><small>Concept updates only. No noise.</small></ArbotsReveal>
    </div></section>
  </main>;
}
