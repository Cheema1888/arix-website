import Image from "next/image";
import Link from "next/link";
import { ArbotsReveal } from "../components/ArbotsReveal";
import { ArbotsSurvey } from "../components/ArbotsSurvey";
import { VBotSpeechBubble } from "../components/VBotSpeechBubble";

const features = [
  [
    "01",
    "Fall detection and check in",
    "If your parent falls, VBot immediately asks if they are okay. If they confirm they are fine, the alarm cancels. If they need help or do not answer, it alerts your family right away.",
  ],
  [
    "02",
    "Reliable medication reminders",
    "VBot chimes and shows what pill to take directly on its screen, even if home internet drops. You also get an instant notification on your phone so you know it was taken.",
  ],
  [
    "03",
    "One touch family SOS",
    "A dedicated red emergency button or a simple cry for help rings the entire family phones at once, connecting whoever answers first.",
  ],
  [
    "04",
    "Gentle daily companionship",
    "A comforting voice that speaks English and Urdu. VBot greets them in the morning, chats naturally to keep minds active, and lets you check in anytime without awkward video screens.",
  ],
];

const ecosystemTiers = [
  {
    tier: "Tier 01",
    label: "In the Room",
    title: "Desktop Companion",
    description: "Stationary ambient robot with an expressive LCD face, audio speaker, room camera, and physical emergency SOS button.",
    specs: ["Dual core ESP32 S3 plus CAM", "Offline RTC medication cache", "Physical red SOS emergency button", "Expressive LVGL eye animations"],
  },
  {
    tier: "Tier 02",
    label: "In the Cloud",
    title: "Care Intelligence",
    description: "Central cloud AI engine running real time fall detection, bilingual Urdu and English voice understanding, and intelligent false alarm filtering.",
    specs: ["YOLOv8 Pose fall detection", "Two stage voice verification", "Simultaneous multi family VoIP ring", "Geriatric conversational memory"],
  },
  {
    tier: "Tier 03",
    label: "In Your Pocket",
    title: "Caregiver App",
    description: "The family command center for Flutter iOS and Android with live room check ins, one tap calls, and effortless voice routine setup.",
    specs: ["Encrypted live room video", "Voice to schedule clinical parsing", "Family safety circle invites", "Instant push and emergency alerts"],
  },
];

const creativeBots = [
  ["/arbots/chotubot-bat.jpg", "Bedside guardian", "Nightstand presence"],
  ["/arbots/chotubot-pookie.jpg", "Morning companion", "Breakfast table buddy"],
  ["/arbots/chotubot-goth.jpg", "Desk sentinel", "Study & reading area"],
  ["/arbots/chotubot-peaky.jpg", "Gentle watcher", "Living room presence"],
  ["/arbots/chotubot-space.jpg", "Family link", "Connected telepresence"],
  ["/arbots/chotubot-red.jpg", "Emergency alert", "Instant SOS response"],
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
              alt="VBot, the elder care companion robot"
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
        <VBotSpeechBubble message="Hi, I'm V" />
        <div className="arbots-v3-intro">
          <h1>Meet VBot.</h1>
          <span>An ambient companion robot for elderly safety, daily routine care, and family peace of mind.</span>
        </div>
        <div className="arbots-v3-status"><i /> MVP Prototype in active development</div>
        <a className="arbots-v3-scroll" href="#features">Discover VBot <span>↓</span></a>
      </section>

      <section className="arbots-v3-features" id="features">
        <div className="arbots-shell">
          <ArbotsReveal className="arbots-v3-heading">
            <p className="arbots-index">Core capabilities</p>
            <h2>Safety at home.<br />Care from anywhere.</h2>
          </ArbotsReveal>
          <div className="arbots-v3-feature-list">
            {features.map(([number, title, copy], index) => (
              <ArbotsReveal className="arbots-v3-feature" delay={index * .025} key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </ArbotsReveal>
            ))}
          </div>
          <ArbotsReveal className="arbots-v3-mvp-callout">
            <strong>The MVP Foundation</strong>
            <p>
              VBot is our working first step. Our true ambition is a complete elder care ecosystem with smart medicine dispensers, external room cameras, and vision accessories. It is a comprehensive care package designed for busy families who cannot always be at home, giving them continuous peace of mind.
            </p>
          </ArbotsReveal>
        </div>
      </section>

      <section className="arbots-v3-ecosystem" id="ecosystem">
        <div className="arbots-shell">
          <ArbotsReveal className="arbots-v3-heading">
            <p className="arbots-index">Our MVP Architecture</p>
            <h2>Three synchronized tiers.<br />Built for real homes.</h2>
          </ArbotsReveal>
          <div className="arbots-v3-ecosystem-grid">
            {ecosystemTiers.map((item, index) => (
              <ArbotsReveal className="arbots-v3-eco-card" delay={index * 0.05} key={item.tier}>
                <div>
                  <div className="arbots-v3-eco-tier">
                    <strong>{item.tier}</strong>
                    <span>{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul className="arbots-v3-eco-specs">
                  {item.specs.map(spec => (
                    <li key={spec}><i aria-hidden="true" /> {spec}</li>
                  ))}
                </ul>
              </ArbotsReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="arbots-v3-creative" id="presence">
        <div className="arbots-shell arbots-v3-creative-head">
          <p className="arbots-index">Warm presence at home</p>
          <h2>A friendly companion.<br />Never clinical.</h2>
          <p>Elder care shouldn&apos;t feel like hospital equipment. VBot brings warmth, character, and an approachable physical presence to any room in the house.</p>
        </div>
        <div className="arbots-v3-marquee" aria-label="VBot in everyday home spaces">
          <div className="arbots-v3-marquee-track">
            {[0, 1].flatMap(cycle => creativeBots.map(([src, name, subtitle]) => (
              <figure key={`${cycle}-${name}`} aria-hidden={cycle === 1}>
                <div><Image src={src} alt={cycle === 0 ? `${name} concept` : ""} fill sizes="(max-width: 700px) 76vw, 390px" /></div>
                <figcaption><span>{name}</span><small>{subtitle}</small></figcaption>
              </figure>
            )))}
          </div>
        </div>
      </section>

      <section className="arbots-v3-development" id="development">
        <div className="arbots-shell">
          <p className="arbots-v3-live"><i /> Built with care · Pakistan &amp; Global</p>
          <h2>An assistive robotics initiative.<br />Built by Team ARIX.</h2>
          <p>VBot is currently our working MVP prototype. While this edition focuses on essential elder safety, medication reliability, and family peace of mind, our broader robotics vision extends much further into autonomous physical AI for everyday living.</p>
          <div className="arbots-v3-family" aria-label="Brand family"><span>Parent team<strong>ARIX</strong></span><i>→</i><span>Robotics company<strong>Arbots</strong></span><i>→</i><span>Assistive robot<strong>VBot</strong></span></div>
          <Link className="arbots-text-link" href="/arbots/team">Meet the team →</Link>
        </div>
      </section>

      <section className="arbots-survey-section arbots-v3-survey" id="survey">
        <div className="arbots-shell arbots-survey-layout">
          <div className="arbots-survey-intro">
            <p className="arbots-index">Caregiver research</p>
            <h2>Help us shape elder care.</h2>
            <p>VBot is in active prototype testing. Ten quick anonymous questions to help us refine this MVP and build what families actually need.</p>
          </div>
          <ArbotsSurvey />
        </div>
      </section>
    </main>
  );
}
