"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function ArbotsReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: .75, delay, ease: [.2, .75, .25, 1] }}>{children}</motion.div>;
}
