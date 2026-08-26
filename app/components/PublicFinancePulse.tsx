"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

type FinanceView = "revenue" | "investment";

const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

function formatPkr(value: number) {
  return pkr.format(Math.round(value)).replace("PKR", "PKR ");
}

export function PublicFinancePulse({ revenue, investment }: { revenue: number; investment: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<FinanceView>("revenue");
  const [visible, setVisible] = useState(false);
  const [displayRevenue, setDisplayRevenue] = useState(0);
  const [displayInvestment, setDisplayInvestment] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayRevenue(revenue * eased);
      setDisplayInvestment(investment * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, revenue, investment]);

  const total = revenue + investment;
  const activeAmount = active === "revenue" ? revenue : investment;
  const share = total > 0 ? Math.round((activeAmount / total) * 100) : 0;
  const ringStyle = {
    "--finance-progress": `${total > 0 ? Math.max(share, 2) : 0}%`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className={`public-finance section${visible ? " is-visible" : ""}`}>
      <div className="shell">
        <div className="section-heading finance-heading">
          <div><p className="section-index">02 / Company momentum</p><h2>Progress, made visible.</h2></div>
          <p>Live totals from posted ARIX finance records. Individual transactions and employee data remain private.</p>
        </div>

        <div className="finance-console">
          <div className="finance-selectors" role="tablist" aria-label="Select a public finance metric">
            <button className={active === "revenue" ? "active" : ""} onClick={() => setActive("revenue")} role="tab" aria-selected={active === "revenue"}>
              <span><i /> Revenue generated</span>
              <strong>{formatPkr(displayRevenue)}</strong>
              <small>Posted operating income <b>↗</b></small>
            </button>
            <button className={active === "investment" ? "active" : ""} onClick={() => setActive("investment")} role="tab" aria-selected={active === "investment"}>
              <span><i /> Investment collected</span>
              <strong>{formatPkr(displayInvestment)}</strong>
              <small>External capital received <b>↗</b></small>
            </button>
          </div>

          <div className="finance-readout" role="tabpanel" aria-live="polite">
            <div className="finance-readout-top"><span><i /> Live ledger</span><small>PKR · Posted records only</small></div>
            <div className="finance-signal">
              <div className="finance-ring" style={ringStyle}><div><strong>{share}%</strong><span>of visible capital</span></div></div>
              <div className="finance-signal-copy">
                <span>{active === "revenue" ? "Earned value" : "Growth capital"}</span>
                <h3>{active === "revenue" ? "Revenue generated through ARIX activity." : "Investment committed to build ARIX."}</h3>
                <p>{total > 0 ? `${formatPkr(activeAmount)} of ${formatPkr(total)} in combined public financial momentum.` : "The live ledger is ready. Totals will update here when the first financial record is posted."}</p>
              </div>
            </div>
            <div className="finance-total"><span>Combined financial momentum</span><strong>{formatPkr(displayRevenue + displayInvestment)}</strong><i><b style={{ width: total > 0 ? "100%" : "0%" }} /></i></div>
          </div>
        </div>
      </div>
    </section>
  );
}
