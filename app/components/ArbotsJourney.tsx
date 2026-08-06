"use client";

import { motion } from "framer-motion";

const moments = [
  { number: "01", eyebrow: "Say it", title: "A voice, not another screen.", copy: "Talk naturally. X is being designed around voice-first interaction, a wake word, and quick responses that do not pull you into another app.", glyph: "◖◗" },
  { number: "02", eyebrow: "See it", title: "Expression is the interface.", copy: "A glance should tell you whether X is listening, thinking, curious, excited, or ready to rest.", glyph: "•‿•" },
  { number: "03", eyebrow: "Keep it", title: "Useful things, remembered.", copy: "Reminders, routines, study support, and personal preferences—shaped into a companion that becomes more familiar over time.", glyph: "⌁" },
  { number: "04", eyebrow: "Trust it", title: "Privacy is part of the product.", copy: "We are evaluating local and hybrid AI so everyday interactions can feel personal without treating privacy as an afterthought.", glyph: "◎" },
];

export function ArbotsJourney() {
  return (
    <section className="arbots-roll-section" id="story">
      <div className="arbots-shell arbots-roll-intro">
        <p className="arbots-index">One companion / four ideas</p>
        <h2>Scroll into<br /><span>the world of X.</span></h2>
      </div>
      <div className="arbots-roll-deck">
        {moments.map((moment, index) => (
          <motion.article
            className="arbots-roll-card"
            key={moment.number}
            initial={{ opacity: 0, rotate: index % 2 ? 10 : -10, x: index % 2 ? 110 : -110, scale: .88 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0, scale: 1 }}
            viewport={{ amount: .52, margin: "-8% 0px -8% 0px" }}
            transition={{ duration: .72, ease: [.2, .8, .2, 1] }}
          >
            <div className="arbots-roll-card-top"><span>{moment.number}</span><strong>{moment.eyebrow}</strong></div>
            <div className="arbots-roll-glyph" aria-hidden="true">{moment.glyph}</div>
            <div><h3>{moment.title}</h3><p>{moment.copy}</p></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
