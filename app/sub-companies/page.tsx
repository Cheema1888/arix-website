import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sub-companies",
  description: "Why an agricultural physical AI robotics company creates focused ventures: exploring Arbots X and Axolutions.",
};

export default function SubCompaniesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="page-hero subcompanies-hero">
        <div className="subcompanies-orbit" aria-hidden="true">
          <div><span>Arbots X</span><i /></div>
          <div><span>Axolutions</span><i /></div>
        </div>
        <div className="shell">
          <p className="eyebrow"><span className="status-dot" /> Venture Architecture</p>
          <h1>
            Why sub-companies?<br />
            A matter of <span>focus &amp; conviction.</span>
          </h1>
          <p>
            To anyone looking from the outside, an agricultural drone and physical AI company launching companion robotics and digital engineering platforms feels completely out of the blue. Here is the honest story of why we chose this path.
          </p>
        </div>
        <div className="page-hero-tag" aria-hidden="true">
          <span>02</span> Dedicated Ventures
        </div>
      </section>

      {/* Heartfelt Statement Section */}
      <section className="statement section shell">
        <p className="section-index">01 / The Real Story</p>
        <div className="statement-copy">
          <h2>
            Frontier physical AI demanded<br />
            <span>disciplines far beyond the field.</span>
          </h2>
          <p>
            When we founded ARIX, our vision was simple and unyielding: bring physical AI to precision agriculture. We set out to build autonomous airborne systems that survey vast wheat fields, isolate crop disease at the millimeter level, and transform how growers protect their harvest.
          </p>
          <p>
            Building physical AI in the real world is brutal. It forces an engineering team to simultaneously master two deeply distinct frontiers: on one side, intimate, emotive companion robotics that humans can trust and interact with in physical space; on the other, relentless, high-velocity digital architectures capable of processing massive computer vision workloads in real time.
          </p>
          <p>
            As our prototypes matured, we faced a defining choice. The expressive companion AI we were exploring for physical interaction had developed a life and warmth that belonged in homes, schools, and creative desks. Meanwhile, founders and business leaders who saw our internal digital engineering stack began approaching us with a simple plea: &ldquo;Build our platforms with that same blistering speed and precision.&rdquo;
          </p>
          <p>
            We could have ignored them to keep blinders on, or absorbed them into ARIX and diluted our agricultural mission. We refused both compromises. Instead, we made an intentional, heartfelt decision: spin them out into dedicated sub-companies. Each venture has its own autonomy, its own relentless focus, and its own mandate to deliver for people today—all anchored by the uncompromising engineering standard forged at ARIX.
          </p>
        </div>
      </section>

      {/* Ventures Showcase Section */}
      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / Dedicated Ventures</p>
            <h2>Two focused entities.<br />One shared standard.</h2>
          </div>
          <p>
            Direct access to the independent platforms born from our physical AI research and engineering velocity.
          </p>
        </div>

        <div className="venture-grid">
          {/* Arbots X Card */}
          <article className="venture-card">
            <div>
              <div className="venture-card-tag">
                <span><i /> Venture 01</span>
                <strong>Companion Robotics &amp; Physical AI</strong>
              </div>
              <h3>Arbots X</h3>
              <p className="venture-desc">
                An emotive physical AI companion with voice interaction, expressive facial states, and personal intelligence designed for everyday human spaces.
              </p>
            </div>
            <div>
              <div className="venture-specs">
                <span>Physical AI</span>
                <span>Voice Interaction</span>
                <span>Expressive Companion</span>
                <span>Privacy by Design</span>
              </div>
              <Link className="button button-primary" href="/arbots">
                Explore Arbots X <span>↗</span>
              </Link>
            </div>
          </article>

          {/* Axolutions Card */}
          <article className="venture-card">
            <div>
              <div className="venture-card-tag">
                <span><i /> Venture 02</span>
                <strong>Digital Platforms &amp; AI Solutions</strong>
              </div>
              <h3>Axolutions</h3>
              <p className="venture-desc">
                Transforming legacy websites into high-performance revenue platforms, next-generation architectures, and custom AI-engineering solutions.
              </p>
            </div>
            <div>
              <div className="venture-specs">
                <span>Legacy Modernization</span>
                <span>Revenue Platforms</span>
                <span>AI - Engineering Solutions</span>
                <span>High Velocity</span>
              </div>
              <Link className="button button-primary" href="/solutions">
                Explore Axolutions <span>↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Shared Principles Section */}
      <section className="principles section shell">
        <div>
          <p className="section-index">03 / Shared Core DNA</p>
          <h2>One philosophy.<br />Three distinct missions.</h2>
        </div>
        <div className="principle-grid">
          <article>
            <span>01</span>
            <h3>Field-Tested Rigor</h3>
            <p>What survives the dust, heat, and strict precision of agricultural robotics sets the baseline for everything we engineer.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Relentless Velocity</h3>
            <p>What takes traditional industry cycles months to deliberate, our specialized engineering units execute in days.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Dedicated Autonomy</h3>
            <p>ARIX stays 100% committed to the field; our sub-companies move at full speed to lead their respective categories.</p>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section shell">
        <div>
          <p className="eyebrow">Partner with the ARIX Ecosystem</p>
          <h2>Have a vision to build or explore?</h2>
        </div>
        <Link className="button button-primary" href="/contact">
          Contact the ARIX team <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
