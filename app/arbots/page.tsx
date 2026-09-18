import Image from "next/image";
import Link from "next/link";
import { ArbotsReveal } from "../components/ArbotsReveal";
import { ArbotsSurvey } from "../components/ArbotsSurvey";
import { VBotSpeechBubble } from "../components/VBotSpeechBubble";

const features = [
  ["01", "Voice conversation", "Talk naturally with VBot through voice-to-voice interaction and a simple wake word."],
  ["02", "An expressive face", "Listening, thinking, curious, happy—VBot makes its state easy to understand at a glance."],
  ["03", "Personal memory", "A companion designed to learn preferences, remember useful context, and feel more familiar over time."],
  ["04", "Everyday help", "Reminders, alarms, study support, and small routines without opening another screen."],
  ["05", "Privacy by design", "Local and hybrid AI are being explored so private moments can remain appropriately contained."],
];

const creativeBots = [
  ["/arbots/chotubot-bat.jpg", "Night guardian"],
  ["/arbots/chotubot-pookie.jpg", "Pookie"],
  ["/arbots/chotubot-goth.jpg", "Goth"],
  ["/arbots/chotubot-peaky.jpg", "The gentleman"],
  ["/arbots/chotubot-space.jpg", "Space explorer"],
  ["/arbots/chotubot-red.jpg", "Crimson star"],
];

export default function ArbotsPage() {
  return (
    <main className="arbots-main arbots-v3">
      <section className="arbots-v3-hero" id="product">
        <div className="arbots-v3-v" aria-hidden="true">
          <svg viewBox="0 0 922 567" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 0 L 303 0 L 461 204 L 618 0 L 922 0 L 461 567 Z M 101 48 L 461 491 L 821 48 L 642 48 L 461 283 L 280 48 Z"
              fillRule="evenodd"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="arbots-v3-bot">
          <div className="vbot-stage">
            <Image
              src="/arbots/vbot-body.png"
              alt="VBot, the companion robot"
              fill
              priority
              sizes="(max-width: 700px) 62vw, 360px"
            />
            {/* Camera hardware indicator on left corner of LCD screen bezel */}
            <span className="vbot-camera-dot" aria-label="Camera active indicator" />
            <div className="vbot-eyes" aria-hidden="true">
              <div className="vbot-eye left">
                <Image src="/arbots/vbot-eye-left.png" alt="" fill priority unoptimized />
              </div>
              <div className="vbot-eye right">
                <Image src="/arbots/vbot-eye-right.png" alt="" fill priority unoptimized />
              </div>
            </div>
          </div>
        </div>
        <VBotSpeechBubble />
        <div className="arbots-v3-intro">
          <h1>Meet VBot.</h1>
          <span>A small AI companion with a voice, a face, and a personality of its own.</span>
        </div>
        <div className="arbots-v3-status"><i /> Concept in development</div>
        <a className="arbots-v3-scroll" href="#features">Discover VBot <span>↓</span></a>
      </section>

      <section className="arbots-v3-features" id="features">
        <div className="arbots-shell">
          <ArbotsReveal className="arbots-v3-heading">
            <p className="arbots-index">What matters most</p>
            <h2>The essentials.<br />Nothing extra.</h2>
          </ArbotsReveal>
          <div className="arbots-v3-feature-list">
            {features.map(([number, title, copy], index) => (
              <ArbotsReveal className="arbots-v3-feature" delay={index * .025} key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </ArbotsReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="arbots-v3-creative" id="creative">
        <div className="arbots-shell arbots-v3-creative-head">
          <p className="arbots-index">Make VBot yours</p>
          <h2>One companion.<br />Endless character.</h2>
          <p>VBot is one identity with room for expression, imagination, and a look that feels personal.</p>
        </div>
        <div className="arbots-v3-marquee" aria-label="Creative VBot concepts">
          <div className="arbots-v3-marquee-track">
            {[0, 1].flatMap(cycle => creativeBots.map(([src, name]) => (
              <figure key={`${cycle}-${name}`} aria-hidden={cycle === 1}>
                <div><Image src={src} alt={cycle === 0 ? `${name} VBot concept` : ""} fill sizes="(max-width: 700px) 76vw, 390px" /></div>
                <figcaption><span>{name}</span><small>Concept shell</small></figcaption>
              </figure>
            )))}
          </div>
        </div>
      </section>

      <section className="arbots-v3-development" id="development">
        <div className="arbots-shell">
          <p className="arbots-v3-live"><i /> VBot is still under development</p>
          <h2>A product of Arbots.<br />Built by Team ARIX.</h2>
          <p>VBot is currently a concept and prototype in progress. Its hardware, intelligence, and final capabilities will evolve through testing and feedback.</p>
          <div className="arbots-v3-family" aria-label="Brand family"><span>Parent team<strong>ARIX</strong></span><i>→</i><span>Robotics company<strong>Arbots</strong></span><i>→</i><span>Companion product<strong>VBot</strong></span></div>
          <Link className="arbots-text-link" href="/arbots/team">Meet the team →</Link>
        </div>
      </section>

      <section className="arbots-survey-section arbots-v3-survey" id="survey">
        <div className="arbots-shell arbots-survey-layout">
          <div className="arbots-survey-intro">
            <p className="arbots-index">Research survey</p>
            <h2>Help us shape VBot.</h2>
            <p>Ten quick questions. No name, phone number, or email required.</p>
          </div>
          <ArbotsSurvey />
        </div>
      </section>
    </main>
  );
}
