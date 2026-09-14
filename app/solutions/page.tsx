"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type ScopeType = 'website' | 'portal' | 'branding' | 'maintenance' | 'ai' | 'hardware' | 'audit' | 'enterprise';
type ScaleType = 'seed' | 'growth' | 'enterprise';

interface ScopeData {
  name: string;
  duration: string;
}

const scopeMap: Record<ScopeType, ScopeData> = {
  website: {
    name: 'MARKETING PLATFORM',
    duration: '3 WEEKS (18 BUSINESS DAYS)'
  },
  portal: {
    name: 'WEB APP / PORTAL',
    duration: '4 TO 5 WEEKS'
  },
  branding: {
    name: 'PERSONAL BRANDING',
    duration: '2 TO 3 WEEKS'
  },
  maintenance: {
    name: 'SITE MAINTENANCE',
    duration: 'ONGOING MONTHLY UPKEEP'
  },
  ai: {
    name: 'AI - ENGINEERING SOLUTIONS',
    duration: '2 TO 4 WEEKS'
  },
  hardware: {
    name: 'AI - ENGINEERING SOLUTIONS',
    duration: '2 TO 4 WEEKS'
  },
  audit: {
    name: 'FORENSIC AUDIT',
    duration: '48 TO 72 HOURS'
  },
  enterprise: {
    name: 'FULL OVERHAUL',
    duration: '5 TO 6 WEEKS'
  }
};

const cardsData = [
  { name: 'arix.pk', url: 'https://arix.pk', title: 'Arix', img: '/anim-arix.webp', isLive: true },
  { name: 'kazzola-web.vercel.app', url: 'https://kazzola-web.vercel.app/', title: 'Kazzola', img: '/anim-kazzola.webp', isLive: true },
  { name: 'accountgene.vercel.app', url: 'https://accountgene.vercel.app/', title: 'AccountGene', img: '/anim-accountgene.png', isLive: true },
  { name: 'arix.pk/arbots', url: 'https://arix.pk/arbots', title: 'Arbots X', img: '/anim-arbots.webp', isLive: true },
  { name: 'techlo.store', url: 'https://techlo.store', title: 'Techlo', img: '/anim-techlo.png', isLive: false }
];

export default function SolutionsPage() {
  const [scopeType, setScopeType] = useState<ScopeType>('website');
  const [scale, setScale] = useState<ScaleType>('growth');
  const [formMessage, setFormMessage] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('Standard Timeline (3-5 Weeks)');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const shelfTrackRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number>(0);
  const pointerStartY = useRef<number>(0);
  const wasDragged = useRef<boolean>(false);
  const autoScrollActive = useRef<boolean>(true);
  const isUserInteracting = useRef<boolean>(false);
  const scrollPos = useRef<number>(0);
  const oneSetWidth = useRef<number>(0);
  const lastTimestamp = useRef<number | null>(null);

  // Measure one set width
  const calcOneSetWidth = () => {
    if (!shelfTrackRef.current) return;
    const cards = shelfTrackRef.current.querySelectorAll<HTMLElement>('.shelf-window');
    if (cards.length >= 6) {
      const firstCard = cards[0];
      const sixthCard = cards[5];
      if (firstCard && sixthCard) {
        oneSetWidth.current = sixthCard.offsetLeft - firstCard.offsetLeft;
      }
    }
    if (!oneSetWidth.current && cards.length > 0) {
      oneSetWidth.current = 5 * (cards[0].offsetWidth + 22);
    }
  };

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    const originalHref = link?.href;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "/axolutions-logo-mark.png";

    return () => {
      if (link && originalHref) {
        link.href = originalHref;
      }
    };
  }, []);

  useEffect(() => {
    calcOneSetWidth();
    const handleResize = () => calcOneSetWidth();
    window.addEventListener('resize', handleResize);

    const track = shelfTrackRef.current;
    if (!track) return;

    let animId: number;

    const SCROLL_SPEED_PX_SEC = 36;
    const stepAutoScroll = (timestamp: number) => {
      if (!lastTimestamp.current) lastTimestamp.current = timestamp;
      const delta = Math.min((timestamp - lastTimestamp.current) / 1000, 0.1);
      lastTimestamp.current = timestamp;

      if (autoScrollActive.current && !isUserInteracting.current && track) {
        if (!oneSetWidth.current) calcOneSetWidth();
        scrollPos.current += SCROLL_SPEED_PX_SEC * delta;
        if (oneSetWidth.current > 0 && scrollPos.current >= oneSetWidth.current) {
          scrollPos.current -= oneSetWidth.current;
        }
        track.scrollLeft = scrollPos.current;
      } else if (track) {
        scrollPos.current = track.scrollLeft;
      }
      animId = requestAnimationFrame(stepAutoScroll);
    };

    animId = requestAnimationFrame(stepAutoScroll);

    // Mouse enter / leave
    const onMouseEnter = () => { autoScrollActive.current = false; };
    const onMouseLeave = () => {
      if (!isUserInteracting.current) {
        autoScrollActive.current = true;
        lastTimestamp.current = null;
      }
    };

    // Wheel
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 0.9;
        scrollPos.current = track.scrollLeft;
        if (oneSetWidth.current > 0) {
          if (track.scrollLeft >= oneSetWidth.current) {
            track.scrollLeft -= oneSetWidth.current;
            scrollPos.current = track.scrollLeft;
          }
          if (track.scrollLeft < 0) {
            track.scrollLeft += oneSetWidth.current;
            scrollPos.current = track.scrollLeft;
          }
        }
      }
    };

    // Dragging
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isUserInteracting.current = true;
      autoScrollActive.current = false;
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      startScrollLeft = track.scrollLeft;
      pointerStartX.current = e.clientX;
      pointerStartY.current = e.clientY;
      wasDragged.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (Math.abs(e.clientX - pointerStartX.current) > 6 || Math.abs(e.clientY - pointerStartY.current) > 6) {
        wasDragged.current = true;
      }
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.3;
      track.scrollLeft = startScrollLeft - walk;
      scrollPos.current = track.scrollLeft;
      if (oneSetWidth.current > 0) {
        if (track.scrollLeft >= oneSetWidth.current) {
          track.scrollLeft -= oneSetWidth.current;
          scrollPos.current = track.scrollLeft;
        }
        if (track.scrollLeft < 0) {
          track.scrollLeft += oneSetWidth.current;
          scrollPos.current = track.scrollLeft;
        }
      }
    };

    const onMouseUp = () => {
      if (isDown) {
        isDown = false;
        setTimeout(() => {
          isUserInteracting.current = false;
          if (!track.matches(':hover')) {
            autoScrollActive.current = true;
            lastTimestamp.current = null;
          }
        }, 350);
      }
    };

    track.addEventListener('mouseenter', onMouseEnter);
    track.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('wheel', onWheel, { passive: false });
    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      track.removeEventListener('mouseenter', onMouseEnter);
      track.removeEventListener('mouseleave', onMouseLeave);
      track.removeEventListener('wheel', onWheel);
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleCardClick = (url: string, e: React.MouseEvent) => {
    if (wasDragged.current) {
      e.preventDefault();
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrefillScope = (targetType?: ScopeType) => {
    const activeType = targetType || scopeType;
    if (targetType) {
      setScopeType(targetType);
    }
    const data = scopeMap[activeType];
    if (activeType === 'ai' || activeType === 'hardware') {
      setFormMessage(`Interested in the "AI - Engineering Solutions" package (${data.duration}). Target scale: ${scale}. Looking to discuss custom AI models, automation workflows, and technical implementation schedule.`);
    } else {
      setFormMessage(`Interested in the "${data.name}" package (${data.duration}). Target scale: ${scale}. Looking for technical audit and turnaround schedule.`);
    }
    setTimeout(() => {
      const auditSec = document.getElementById('audit-section');
      if (auditSec) auditSec.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handlePrefillAudit = () => {
    setFormMessage("Requesting a complimentary 48-Hour Technical & Codebase Audit. Please review our current domain architecture, Core Web Vitals, and conversion pipeline.");
    setTimeline("Urgent Timeline (2-3 Weeks)");
    setTimeout(() => {
      const auditSec = document.getElementById('audit-section');
      if (auditSec) auditSec.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const successMsg = document.getElementById('form-success-message');
      if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="selection:bg-brand-blue selection:text-white antialiased">
      
      {/* ================= TOP NOTICE BANNER ================= */}
      <div className="bg-brand-navy text-white text-xs font-tech py-2.5 px-4 text-center border-b border-brand-navyBorder">
        <button
          onClick={handlePrefillAudit}
          className="inline-flex items-center justify-center gap-2 text-white font-bold tracking-wider uppercase hover:text-brand-blue transition-colors cursor-pointer"
        >
          <span>CLAIM 48-HOUR AUDIT</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {/* ================= STICKY MAIN NAVIGATION ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/solutions" className="flex items-center gap-3 group flex-shrink-0 mr-4 xl:mr-8">
            <Image
              src="/axolutions-logo-mark.png"
              alt="Axolutions Logo"
              width={36}
              height={36}
              className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-brand-navy">AXOLUTIONS</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-tech text-xs tracking-wider uppercase text-slate-600 whitespace-nowrap axolutions-nav">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#calculator">Scope Estimator</a>
            <a href="#why-us">Why Us?</a>
            <a href="https://arix.pk" target="_blank" rel="noopener noreferrer" title="Visit Arix">Arix</a>
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={handlePrefillAudit}
              className="inline-flex btn-arix btn-arix-primary min-h-[40px] sm:min-h-[44px] px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] gap-4 sm:gap-6 group cursor-pointer"
            >
              <span>START A PROJECT</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white pt-6 pb-12 lg:pt-8 lg:pb-16 overflow-hidden bg-grid-subtle border-b border-gray-200">
        <div className="hero-arc w-[450px] h-[450px] -right-24 -top-24"></div>
        <div className="hero-arc w-[700px] h-[700px] -right-48 -top-48 border-blue-500/10"></div>
        <div className="hero-arc w-[1000px] h-[1000px] -right-72 -top-72 border-blue-500/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left: Compelling Conversion Copy */}
            <div className="lg:col-span-6 pr-0 xl:pr-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[45px] xl:text-[47px] font-heading font-extrabold uppercase text-brand-navy tracking-tight leading-[1.08] mb-6">
                TRANSFORMING <br />
                LEGACY SITES INTO <br />
                NEXT-GEN PLATFORMS &amp; <br />
                <span className="text-brand-blue">AI - ENGINEERING</span> <br />
                <span className="text-brand-blue">SOLUTIONS.</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-slateText max-w-xl font-normal leading-relaxed mb-8 font-body">
                Your digital presence should reflect the true caliber of your business. If your site is slow, outdated, or falling behind competitors, we renovate it to modern standards. What takes others weeks, we build in days by delivering high end, lightning fast platforms with cutting edge AI integrations engineered to command authority and convert.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handlePrefillAudit}
                  className="btn-arix btn-arix-primary min-h-[54px] px-6 py-4 gap-10 group cursor-pointer"
                >
                  <span>CLAIM FREE 48H AUDIT</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold text-sm">&rarr;</span>
                </button>
                
                <a href="#services" className="btn-arix btn-arix-secondary min-h-[54px] px-6 py-4 gap-10 group">
                  <span>EXPLORE SERVICES</span>
                  <span className="group-hover:translate-y-0.5 transition-transform font-bold text-sm">&darr;</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive 3D Bookshelf Window Library */}
            <div className="lg:col-span-6 relative w-full pt-4 lg:pt-0 overflow-hidden">
              <div className="shelf-stage relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-white to-transparent z-30"></div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-l from-white to-transparent z-30"></div>

                <div id="bookshelf-track" ref={shelfTrackRef} className="shelf-track">
                  {/* Render 2 sets for infinite loop */}
                  {[0, 1].map((setIndex) => (
                    <React.Fragment key={`set-${setIndex}`}>
                      {cardsData.map((card, cardIndex) => (
                        <div
                          key={`card-${setIndex}-${cardIndex}`}
                          className="shelf-window group"
                          onClick={(e) => handleCardClick(card.url, e)}
                          title={`${card.title} - ${card.name}`}
                        >
                          <div className="bg-[#07152B] px-3.5 py-2.5 flex items-center justify-between border-b border-slate-700/80">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#FF5F56]"></span>
                              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]"></span>
                              <span className="w-2 h-2 rounded-full bg-[#27C93F]"></span>
                            </div>
                            <span className="font-tech text-[10px] text-slate-300 tracking-wider font-semibold">{card.name}</span>
                            {card.isLive ? (
                              <a
                                href={card.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-tech text-[10px] text-emerald-400 font-bold hover:underline"
                                title={`Open ${card.name} in new tab`}
                              >
                                LIVE ↗
                              </a>
                            ) : (
                              <span className="font-tech text-[10px] text-slate-400 font-bold">BUILT</span>
                            )}
                          </div>
                          <div className="relative h-[178px] bg-slate-900 overflow-hidden">
                            <img
                              src={card.img}
                              alt={card.title}
                              className="w-full h-full object-cover object-top pointer-events-none block"
                              loading="eager"
                            />
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROVEN ACROSS HIGH-STAKES INDUSTRIES ================= */}
      <section className="border-b border-blue-200/80 bg-gradient-to-b from-blue-50/70 via-white to-white py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-navy tracking-tight uppercase">
              PROVEN ACROSS HIGH-STAKES INDUSTRIES
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-none bg-white border border-blue-200/90 hover:border-brand-blue shadow-xs hover:shadow-md transition-all duration-200 group">
              <div className="mb-3">
                <span className="font-tech text-sm text-brand-blue font-bold tracking-wider">01</span>
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors uppercase leading-snug">
                FINTECH &amp; INFRASTRUCTURE
              </div>
            </div>

            <div className="p-5 rounded-none bg-white border border-blue-200/90 hover:border-brand-blue shadow-xs hover:shadow-md transition-all duration-200 group">
              <div className="mb-3">
                <span className="font-tech text-sm text-brand-blue font-bold tracking-wider">02</span>
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors uppercase leading-snug">
                B2B SAAS PLATFORMS
              </div>
            </div>

            <div className="p-5 rounded-none bg-white border border-blue-200/90 hover:border-brand-blue shadow-xs hover:shadow-md transition-all duration-200 group">
              <div className="mb-3">
                <span className="font-tech text-sm text-brand-blue font-bold tracking-wider">03</span>
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors uppercase leading-snug">
                ENTERPRISE LOGISTICS
              </div>
            </div>

            <div className="p-5 rounded-none bg-white border border-blue-200/90 hover:border-brand-blue shadow-xs hover:shadow-md transition-all duration-200 group">
              <div className="mb-3">
                <span className="font-tech text-sm text-brand-blue font-bold tracking-wider">04</span>
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors uppercase leading-snug">
                HEALTHCARE &amp; BIO TECH
              </div>
            </div>

            <div className="p-5 rounded-none bg-white border border-blue-200/90 hover:border-brand-blue shadow-xs hover:shadow-md transition-all duration-200 group col-span-2 sm:col-span-1">
              <div className="mb-3">
                <span className="font-tech text-sm text-brand-blue font-bold tracking-wider">05</span>
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors uppercase leading-snug">
                HIGH-TICKET COMMERCE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: SERVICES ================= */}
      <section id="services" className="py-20 lg:py-28 bg-white text-brand-navy relative overflow-hidden border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-14 pb-8 border-b border-gray-200">
            <span className="font-tech text-xs tracking-widest uppercase text-brand-blue font-semibold block mb-3">
              01 // SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold uppercase tracking-tight text-brand-navy leading-tight">
              FOCUSED SERVICES.<br />
              <span className="text-brand-blue">MEASURABLE VALUE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 01 */}
            <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md">
              <div>
                <div className="font-tech text-base sm:text-lg font-bold text-brand-blue mb-2">01</div>
                <h3 className="text-2xl font-heading font-bold uppercase text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                  HIGH-PERFORMANCE WEBSITES &amp; PORTALS
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  Custom-built web platforms engineered on Next.js, React, and Tailwind. We replace fragile site builders with clean, resilient architectures that load in milliseconds and withstand massive traffic spikes.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-tech text-brand-navy font-semibold">TYPICAL TURNAROUND: 3-4 WEEKS</span>
                <button
                  onClick={() => handlePrefillScope('website')}
                  className="font-tech text-xs uppercase text-brand-blue hover:text-brand-navy flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  EXPLORE SCOPE &rarr;
                </button>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md">
              <div>
                <div className="font-tech text-base sm:text-lg font-bold text-brand-blue mb-2">02</div>
                <h3 className="text-2xl font-heading font-bold uppercase text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                  TECHNICAL SEO &amp; PERFORMANCE ACCELERATION
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  We dissect what is silently choking your rankings and conversions. From bloated bundle sizes and render-blocking scripts to crawl budget inefficiencies, we remediate your entire stack.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-tech text-brand-navy font-semibold">TYPICAL TURNAROUND: 48-72 HOURS</span>
                <button
                  onClick={handlePrefillAudit}
                  className="font-tech text-xs uppercase text-brand-blue hover:text-brand-navy flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  REQUEST AUDIT &rarr;
                </button>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md">
              <div>
                <div className="font-tech text-base sm:text-lg font-bold text-brand-blue mb-2">03</div>
                <h3 className="text-2xl font-heading font-bold uppercase text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                  HIGH-CONVERTING UX &amp; FUNNEL REDESIGN
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  Design that commands authority. We structure user journeys that dissolve buyer friction, build instant executive trust, and funnel visitors directly toward booked meetings and sales demos.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-tech text-brand-navy font-semibold">TYPICAL TURNAROUND: 2-3 WEEKS</span>
                <button
                  onClick={() => handlePrefillScope('branding')}
                  className="font-tech text-xs uppercase text-brand-blue hover:text-brand-navy flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  EXPLORE CRO &rarr;
                </button>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md">
              <div>
                <div className="font-tech text-base sm:text-lg font-bold text-brand-blue mb-2">04</div>
                <h3 className="text-2xl font-heading font-bold uppercase text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                  CUSTOM WEB APPS &amp; SAAS MVPS
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  From internal dashboards and customer portals to full-scale SaaS prototypes. We engineer resilient APIs, databases, authentication, and payment rails ready to support your first 50,000 users.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-tech text-brand-navy font-semibold">TYPICAL TURNAROUND: 4-6 WEEKS</span>
                <button
                  onClick={() => handlePrefillScope('portal')}
                  className="font-tech text-xs uppercase text-brand-blue hover:text-brand-navy flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  EXPLORE MVPS &rarr;
                </button>
              </div>
            </div>

            {/* Pillar 05: Centered at the end (2-column layout) */}
            <div className="bg-white border border-gray-200 rounded-none p-8 sm:p-10 hover:border-brand-blue transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto">
              <div>
                <div className="font-tech text-base sm:text-lg font-bold text-brand-blue mb-2">05</div>
                <h3 className="text-2xl font-heading font-bold uppercase text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                  AI - ENGINEERING SOLUTIONS
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                  Custom AI integrations, LLM workflows, and intelligent automation systems built for specialized business operations. We translate complex engineering challenges into resilient, high speed platforms and connected infrastructure.
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-tech text-brand-navy font-semibold">TYPICAL TURNAROUND: DEPENDENT</span>
                <button
                  onClick={() => handlePrefillScope('ai')}
                  className="font-tech text-xs uppercase text-brand-blue hover:text-brand-navy flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  EXPLORE SOLUTIONS &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: PROCESS ================= */}
      <section id="process" className="py-24 lg:py-32 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <span className="font-tech text-xs tracking-wider uppercase text-brand-blue font-semibold block mb-3">
                02 // PROCESS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold uppercase text-brand-navy tracking-tight">
                CLEAR FROM DAY ONE.
              </h2>
            </div>
            <p className="text-slate-600 font-body text-sm sm:text-base max-w-md leading-relaxed">
              A structured agile process that keeps projects on time, eliminates scope creep, and makes commercial outcomes tangible at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-brand-blue transition-colors group">
              <div className="font-tech text-xs text-brand-blue font-bold mb-2">01 // DISCOVERY</div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-navy mb-3">DISCOVER &amp; AUDIT</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                We tear down your current bottlenecks, analyze high-intent competitor weaknesses, and establish strict speed and conversion KPIs.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-brand-blue transition-colors group">
              <div className="font-tech text-xs text-brand-blue font-bold mb-2">02 // ARCHITECTURE</div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-navy mb-3">DEFINE &amp; WIREFRAME</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                Design systems, wireframes, and schema pipelines. You interact with functional prototypes before a single line of backend code is committed.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-brand-blue transition-colors group">
              <div className="font-tech text-xs text-brand-blue font-bold mb-2">03 // SPRINT BUILD</div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-navy mb-3">DELIVER &amp; HARDEN</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                Rapid, test-driven Next.js and API engineering. Pixel-perfect fidelity, Core Web Vitals compliance, and end-to-end user testing.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-200 hover:border-brand-blue transition-colors group">
              <div className="font-tech text-xs text-brand-blue font-bold mb-2">04 // PRODUCTION</div>
              <h3 className="text-xl font-heading font-bold uppercase text-brand-navy mb-3">DEPLOY &amp; SCALE</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-body">
                Zero-downtime DNS deployment, live telemetry initialization, and 60 days of post-launch conversion optimization support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: SCOPE ESTIMATOR ================= */}
      <section id="calculator" className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="font-tech text-xs tracking-wider uppercase text-brand-blue font-semibold block mb-3">
              03 // SCOPE ESTIMATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold uppercase text-brand-navy mb-4">
              SCOPE YOUR BUILD IN 30 SECONDS.
            </h2>
            <p className="text-slate-600 font-body text-base">
              Configure your digital requirements to receive an instant architectural blueprint, estimated duration, and expected conversion uplift.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white border-2 border-brand-navy rounded-none shadow-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              
              {/* Step 1: Project Type */}
              <div className="mb-8">
                <label className="block font-tech text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                  STEP 01 // SELECT PROJECT REQUIREMENT
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {[
                    { key: 'website' as ScopeType, title: 'Marketing Platform', sub: 'High-Converting Website' },
                    { key: 'portal' as ScopeType, title: 'Web App / Portal', sub: 'SaaS MVP or Client Tool' },
                    { key: 'branding' as ScopeType, title: 'Personal Branding', sub: 'Executive & Founder Sites' },
                    { key: 'maintenance' as ScopeType, title: 'Site Maintenance', sub: 'Existing Sites & Upkeep' },
                    { key: 'ai' as ScopeType, title: 'AI - Engineering Solutions', sub: 'Custom AI, Agents & Automation' },
                    { key: 'audit' as ScopeType, title: 'Forensic Audit', sub: 'Speed, Core Vitals, SEO' },
                    { key: 'enterprise' as ScopeType, title: 'Full Overhaul', sub: 'End-to-End Re-architecture' },
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      type="button"
                      onClick={() => setScopeType(btn.key)}
                      className={`scope-type-btn p-3 text-left border-2 rounded-none transition-all cursor-pointer ${
                        scopeType === btn.key
                          ? 'border-brand-blue bg-blue-50/50'
                          : 'border-gray-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <div className="font-heading font-bold text-xs uppercase text-brand-navy">{btn.title}</div>
                      <div className="text-[11px] font-tech text-slate-500 mt-1">{btn.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Traffic / Scale */}
              <div className="mb-8">
                <label className="block font-tech text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
                  STEP 02 // MONTHLY PIPELINE OR TRAFFIC VOLUME
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'seed' as ScaleType, title: '< 10,000 Visitors', sub: 'Foundational Scaling' },
                    { key: 'growth' as ScaleType, title: '10,000 – 100,000', sub: 'High-Velocity Growth' },
                    { key: 'enterprise' as ScaleType, title: '100,000+ Visitors', sub: 'Mission-Critical Scale' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setScale(s.key)}
                      className={`scale-btn p-3 text-left border-2 rounded-none transition-all cursor-pointer ${
                        scale === s.key
                          ? 'border-brand-blue bg-blue-50/50'
                          : 'border-gray-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <div className="font-heading font-bold text-xs uppercase text-brand-navy">{s.title}</div>
                      <div className="text-[11px] font-tech text-slate-500 mt-1">{s.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Box */}
              <div className="p-6 sm:p-8 bg-brand-navy text-white rounded-none border border-brand-navyBorder">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase">
                      {scopeMap[scopeType].name}
                    </h4>
                  </div>
                  <div className="text-left md:text-right flex-shrink-0">
                    <span className="text-[10px] font-tech text-slate-400 uppercase tracking-widest block mb-1">ESTIMATED DURATION</span>
                    <span className="text-lg sm:text-xl font-tech font-bold text-emerald-400">
                      {scopeMap[scopeType].duration}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-navyBorder flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-xs text-slate-300 font-tech">
                    Includes 60-day post-launch warranty &amp; telemetry monitoring.
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePrefillScope()}
                    className="w-full sm:w-auto btn-arix btn-arix-primary bg-brand-blue border-brand-blue hover:bg-brand-blueHover hover:border-brand-blueHover min-h-[48px] px-6 py-3 text-[11px] gap-6 group cursor-pointer"
                  >
                    <span>LOCK IN THIS SCOPE</span>
                    <span className="group-hover:translate-x-1 transition-transform font-bold text-sm">&rarr;</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: WHY US? ================= */}
      <section id="why-us" className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-tech text-xs tracking-wider uppercase text-brand-blue font-semibold block mb-3">
              04 // WHY US?
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold uppercase text-brand-navy mb-4">
              HOW WE COMPARE TO TRADITIONAL OPTIONS
            </h2>
            <p className="text-slate-600 font-body text-base">
              Why growing enterprises choose a specialized technical unit over bloated generic agencies or unpredictable freelancers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 font-tech text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="p-4 text-left font-bold text-slate-700 w-1/4">ENGINEERING PILLAR</th>
                  <th className="p-4 text-left font-bold text-slate-400 w-1/4">TRADITIONAL AGENCY</th>
                  <th className="p-4 text-left font-bold text-slate-400 w-1/4">CHEAP FREELANCERS</th>
                  <th className="p-4 text-left font-bold text-white bg-brand-navy w-1/4">AXOLUTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4 font-bold text-brand-navy bg-white">Turnaround Velocity</td>
                  <td className="p-4 text-slate-500 bg-white">3 to 6 Months of meetings</td>
                  <td className="p-4 text-slate-500 bg-white">Unpredictable / Ghosting</td>
                  <td className="p-4 font-bold text-brand-blue bg-blue-50/40">2 to 4 Weeks Delivery</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-navy bg-white">Core Web Vitals Guarantee</td>
                  <td className="p-4 text-slate-500 bg-white">40 &ndash; 65 (Bloated WP)</td>
                  <td className="p-4 text-slate-500 bg-white">Rarely measured</td>
                  <td className="p-4 font-bold text-brand-blue bg-blue-50/40">95 &ndash; 100 Guaranteed</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-navy bg-white">Team Composition</td>
                  <td className="p-4 text-slate-500 bg-white">Junior hand-offs &amp; account reps</td>
                  <td className="p-4 text-slate-500 bg-white">Solo generalist</td>
                  <td className="p-4 font-bold text-brand-blue bg-blue-50/40">Direct Senior Engineers Only</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-navy bg-white">Code Ownership</td>
                  <td className="p-4 text-slate-500 bg-white">Proprietary theme lock-in</td>
                  <td className="p-4 text-slate-500 bg-white">Unclear licensing / snippets</td>
                  <td className="p-4 font-bold text-brand-blue bg-blue-50/40">100% Full IP Transfer</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-brand-navy bg-white">Conversion Focus</td>
                  <td className="p-4 text-slate-500 bg-white">Visual aesthetics only</td>
                  <td className="p-4 text-slate-500 bg-white">&quot;Just makes it work&quot;</td>
                  <td className="p-4 font-bold text-brand-blue bg-blue-50/40">Engineered for Closed Pipeline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: IDEAL PARTNERSHIPS ================= */}
      <section className="py-24 lg:py-32 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="font-tech text-xs tracking-wider uppercase text-brand-blue font-semibold block mb-3">
                05 // IDEAL PARTNERSHIPS
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-extrabold uppercase text-brand-navy tracking-tight leading-none mb-6">
                SMALL TEAM.<br />
                <span className="text-brand-blue">SERIOUS</span><br />
                OUTCOMES.
              </h2>
              <p className="text-slate-600 font-body text-base leading-relaxed">
                We intentionally cap our active client bandwidth to 3 engagements at any time. This gives every partner direct, unmediated access to senior systems architects.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 border border-gray-200 bg-slate-50/50">
                <h4 className="font-heading font-bold text-lg text-brand-navy uppercase mb-2">
                  01 // SCALE-READY B2B &amp; ENTERPRISE FOUNDERS
                </h4>
                <p className="text-sm text-slate-600 font-body leading-relaxed">
                  Who recognize that their digital infrastructure is directly tied to customer trust and enterprise valuation.
                </p>
              </div>

              <div className="p-6 border border-gray-200 bg-slate-50/50">
                <h4 className="font-heading font-bold text-lg text-brand-navy uppercase mb-2">
                  02 // ESTABLISHED FIRMS OVERHAULING LEGACY SYSTEMS
                </h4>
                <p className="text-sm text-slate-600 font-body leading-relaxed">
                  Whose current website no longer reflects their true market stature and suffers from slow loading times, security vulnerabilities, or poor mobile UX.
                </p>
              </div>

              <div className="p-6 border border-gray-200 bg-slate-50/50">
                <h4 className="font-heading font-bold text-lg text-brand-navy uppercase mb-2">
                  03 // COMMERCIAL LEADERS DEMANDING MEASURABLE ROI
                </h4>
                <p className="text-sm text-slate-600 font-body leading-relaxed">
                  Who are done paying retainer fees for &quot;creative fluff&quot; and require engineered architectures directly tied to inbound qualification and closed revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: INITIATE TRANSMISSION & INTAKE FORM ================= */}
      <section id="audit-section" className="py-24 lg:py-32 bg-slate-50/80 border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5">
              <span className="font-tech text-xs tracking-wider uppercase text-brand-blue font-semibold block mb-3">
                06 // INITIATE TRANSMISSION
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-extrabold uppercase text-brand-navy tracking-tight mb-6">
                LET&apos;S BUILD WHAT YOUR BUSINESS NEEDS NEXT.
              </h2>
              <p className="text-slate-600 font-body text-base leading-relaxed mb-8">
                Submit your current domain or project overview. We will return an exhaustive 48-hour architectural review, Core Web Vitals report, and fixed-price technical blueprint.
              </p>

              <div className="border-t border-gray-200 pt-8">
                <span className="font-tech text-xs uppercase tracking-widest text-slate-400 block mb-2">DIRECT TECHNICAL INQUIRY</span>
                <a
                  href="mailto:axolutions@arix.pk"
                  className="inline-flex items-center gap-3 font-heading font-bold text-2xl sm:text-3xl text-brand-navy hover:text-brand-blue transition-colors group"
                >
                  <span>AXOLUTIONS@ARIX.PK</span>
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-sm relative">
                
                {formSubmitted && (
                  <div id="form-success-message" className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 font-tech text-xs">
                    <div className="font-bold uppercase tracking-wider mb-1">[TRANSMISSION RECEIVED]</div>
                    Your scope has been logged. Our engineering team will review your architecture and respond within 48 hours.
                  </div>
                )}

                <form id="project-intake-form" onSubmit={handleFormSubmit} className="space-y-6 text-xs font-tech">
                  <div>
                    <span className="text-[11px] font-bold text-brand-blue tracking-widest uppercase block mb-1">PROJECT INTAKE</span>
                    <h3 className="text-2xl font-heading font-bold text-brand-navy uppercase mb-6">START A PROJECT</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Vance"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-none focus:border-brand-blue focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-none focus:border-brand-blue focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">CURRENT WEBSITE / DOMAIN</label>
                      <input
                        type="text"
                        placeholder="https://yourcompany.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-none focus:border-brand-blue focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">TARGET TIMELINE</label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-none focus:border-brand-blue focus:bg-white focus:outline-none transition-colors text-slate-700"
                      >
                        <option>Urgent Timeline (2-3 Weeks)</option>
                        <option>Standard Timeline (3-5 Weeks)</option>
                        <option>Q2 Enterprise Deployment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">PROJECT SCOPE OVERVIEW *</label>
                    <textarea
                      id="form-message"
                      rows={3}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Tell us what you want to build or what's currently holding your site back..."
                      className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-none focus:border-brand-blue focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-arix btn-arix-primary min-h-[54px] px-6 py-4 justify-between group cursor-pointer"
                    >
                      <span>SEND MESSAGE</span>
                      <span className="group-hover:translate-x-1 transition-transform font-bold text-sm">&rarr;</span>
                    </button>
                  </div>

                  <p className="text-slate-600 text-[11px] text-center pt-2 font-tech">
                    Protected by NDA standards. We never share your data or contact details.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 text-brand-navy py-16 font-tech text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-100">
            <div className="md:col-span-5">
              <Link href="/solutions" className="flex items-center gap-3 mb-4">
                <Image
                  src="/axolutions-logo-mark.png"
                  alt="Axolutions Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <span className="font-heading font-bold text-2xl tracking-tight text-brand-navy">AXOLUTIONS</span>
              </Link>
              <p className="text-slate-600 text-sm max-w-sm font-body leading-relaxed">
                Specialized digital systems architecture. Transforming legacy sites into next-gen platforms and AI - engineering solutions.
              </p>
            </div>

            <div className="md:col-span-2">
              <span className="font-bold text-brand-blue uppercase tracking-widest block mb-4">SERVICES</span>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#services" className="hover:text-brand-blue transition-colors">Web Development</a></li>
                <li><a href="#services" className="hover:text-brand-blue transition-colors">Forensic SEO Audits</a></li>
                <li><a href="#services" className="hover:text-brand-blue transition-colors">Conversion (CRO)</a></li>
                <li><a href="#services" className="hover:text-brand-blue transition-colors">AI &amp; Tech Solutions</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <span className="font-bold text-brand-blue uppercase tracking-widest block mb-4">PARENT ENTITY</span>
              <ul className="space-y-2 text-slate-600">
                <li><a href="https://arix.pk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">ARIX Core ↗</a></li>
                <li><a href="https://arix.pk/arbots" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">Arbots X ↗</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <span className="font-bold text-brand-blue uppercase tracking-widest block mb-4">DIRECT INQUIRIES</span>
              <p className="text-slate-600 mb-3 font-body">Engineers review all project submissions directly.</p>
              <a href="mailto:axolutions@arix.pk" className="text-brand-navy font-bold hover:text-brand-blue flex items-center gap-1">
                axolutions@arix.pk ↗
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[11px]">
            <div>&copy; {new Date().getFullYear()} AXOLUTIONS // A DIVISION OF ARIX. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <a href="#audit-section" onClick={handlePrefillAudit} className="hover:text-brand-blue transition-colors">48H Audit Guarantee</a>
              <a href="https://arix.pk" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">Arix Network</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
