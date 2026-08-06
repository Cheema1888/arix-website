"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const expressions = ["happy", "listening", "curious", "thinking", "sleepy", "excited"] as const;
type Expression = typeof expressions[number];

export function ArbotsRobot({ interactive = false, compact = false }: { interactive?: boolean; compact?: boolean }) {
  const [expression, setExpression] = useState<Expression>("happy");

  useEffect(() => {
    const timer = window.setInterval(() => setExpression((current) => expressions[(expressions.indexOf(current) + 1) % expressions.length]), 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={compact ? "arbots-robot-stage is-compact" : "arbots-robot-stage"}>
      <motion.div className="arbots-robot-glow" animate={{ opacity: [0.45, 0.78, 0.45], scale: [0.92, 1.05, 0.92] }} transition={{ duration: 3.6, repeat: Infinity }} />
      <motion.div className="arbots-robot" data-expression={expression} animate={{ y: [0, -9, 0], rotate: [0, 0.7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
        <div className="arbots-antenna"><i /></div>
        <div className="arbots-ear left" /><div className="arbots-ear right" />
        <div className="arbots-head"><div className="arbots-face"><span className="arbots-eye left" /><span className="arbots-eye right" /><span className="arbots-mouth" /></div></div>
        <div className="arbots-neck" />
        <div className="arbots-body"><span className="arbots-core" /><i className="arbots-arm left" /><i className="arbots-arm right" /></div>
        <div className="arbots-base" />
      </motion.div>
      <div className="arbots-expression-readout"><span>Expression</span><strong>{expression}</strong></div>
      {interactive && <div className="arbots-expression-controls" role="group" aria-label="Choose robot expression">{expressions.map((item) => <button type="button" key={item} className={item === expression ? "is-active" : ""} onClick={() => setExpression(item)}>{item}</button>)}</div>}
    </div>
  );
}
