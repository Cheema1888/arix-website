import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sub-companies",
  description: "Why a bootstrapped physical AI robotics company creates focused ventures: exploring VBot and Axolutions.",
};

export default function SubCompaniesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="page-hero subcompanies-hero">
        <div className="subcompanies-orbit" aria-hidden="true" />
        <div className="shell">
          <h1>
            Why sub-companies?<br />
            Bootstrapping <span>physical AI.</span>
          </h1>
          <p>
            An agricultural drone and physical AI company creating companion robotics and digital engineering platforms might seem unexpected. Here is the honest reality behind how we operate.
          </p>
        </div>
      </section>

      {/* Heartfelt Statement Section */}
      <section className="statement section shell">
        <p className="section-index">01 / The Reality</p>
        <div className="statement-copy">
          <h2>
            Hardware takes capital.<br />
            <span>We fund our mission ourselves.</span>
          </h2>
          <p>
            ARIX is a bootstrapped robotics company building physical AI for precision agriculture. Developing custom airborne hardware, autonomous flight control, and field-tested computer vision is intensely capital-intensive. Rather than relying on early outside investment or compromising our autonomy, we build focused commercial sub-companies that generate revenue and directly fund our core research. Each venture applies our engineering capabilities to immediate market needs — allowing us to stay self-funded, independent, and committed to long-term breakthroughs in the field.
          </p>
        </div>
      </section>

      {/* Ventures Section */}
      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / Ventures</p>
            <h2>Two focused ventures.<br />Fueling one mission.</h2>
          </div>
          <p>
            Commercial initiatives created to fund our frontier robotics research.
          </p>
        </div>

        <div className="venture-grid">
          {/* VBot Card */}
          <article className="venture-card">
            <div>
              <div className="venture-card-tag">
                <span><i /> Venture 01</span>
                <strong>Consumer &amp; Companion Robotics</strong>
              </div>
              <h3>VBot</h3>
              <p className="venture-desc">
                Companion robotics powered by emotive physical AI and voice interaction for desktop and everyday spaces.
              </p>
            </div>
            <div>
              <Link className="button button-primary" href="/arbots">
                Explore VBot <span>↗</span>
              </Link>
            </div>
          </article>

          {/* Axolutions Card */}
          <article className="venture-card">
            <div>
              <div className="venture-card-tag">
                <span><i /> Venture 02</span>
                <strong>Digital Engineering &amp; Solutions</strong>
              </div>
              <h3>Axolutions</h3>
              <p className="venture-desc">
                High-performance digital platforms, legacy system renovation, and custom AI-engineering solutions.
              </p>
            </div>
            <div>
              <Link className="button button-primary" href="/solutions">
                Explore Axolutions <span>↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section shell">
        <div>
          <p className="eyebrow">Partner with ARIX</p>
          <h2>Build with us or explore our ventures.</h2>
        </div>
        <Link className="button button-primary" href="/contact">
          Contact the team <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
