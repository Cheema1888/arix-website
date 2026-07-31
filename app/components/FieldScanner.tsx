"use client";

import { useState } from "react";

const modes = [
  { id: "healthy", label: "Healthy", color: "#b9ff3f", confidence: "96.2%", cells: [2,3,5,6,7,9,10,12,13,14,15,17,18,19,21,22] },
  { id: "yellow", label: "Yellow rust", color: "#f4d35e", confidence: "91.8%", cells: [1,4,8,11,16,20,23] },
  { id: "brown", label: "Brown rust", color: "#e36b3d", confidence: "88.4%", cells: [0,6,12,18,22] },
  { id: "septoria", label: "Septoria", color: "#9b8cff", confidence: "86.9%", cells: [3,7,13,17,21] },
];

export function FieldScanner({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(modes[1]);
  return (
    <div className={compact ? "scanner compact" : "scanner"} style={{ "--scan-color": active.color } as React.CSSProperties}>
      <div className="scanner-top"><span>ARIX / FIELD 01</span><span className="live-label"><i /> MODEL PREVIEW</span></div>
      <div className="scanner-map" role="img" aria-label={`Concept field map highlighting ${active.label}`}>
        {Array.from({ length: 24 }).map((_, index) => <span className={active.cells.includes(index) ? "hot" : ""} key={index} />)}
        <div className="scanner-crosshair" aria-hidden="true" />
        <div className="scanner-flight">·····●·····●·····●·····</div>
      </div>
      <div className="scanner-readout"><div><span>Detected class</span><strong>{active.label}</strong></div><div><span>Model confidence</span><strong>{active.confidence}</strong></div></div>
      <div className="scanner-modes" aria-label="Select disease class">
        {modes.map((mode) => <button className={active.id === mode.id ? "active" : ""} onClick={() => setActive(mode)} key={mode.id}><i style={{ background: mode.color }} />{mode.label}</button>)}
      </div>
    </div>
  );
}
