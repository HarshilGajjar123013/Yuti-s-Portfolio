"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiArrowUpRight,
  FiChevronUp,
  FiCheckCircle,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./building.scss";

interface Venture {
  id: string;
  num: string;
  kicker: string;
  statusBadge: string;
  title: string;
  tagline: string;
  overview: string;
  pillars: string[];
  blueprint: {
    kicker: string;
    focus: string;
    deliverables: string[];
  };
}

const VENTURES: Venture[] = [
  {
    id: "bizpulse",
    num: "01",
    kicker: "Founder · Community & learning",
    statusBadge: "Active Community",
    title: "BizPulse",
    tagline:
      "Business, unfiltered. A platform connecting young people to practical business learning, mentorship and opportunity.",
    overview:
      "Designed to close the gap between business curiosity and workplace readiness through newsletters, mentorship, webinars, workshops, bootcamps, job simulations and a community marketplace.",
    pillars: [
      "Newsletters",
      "Mentorship",
      "Webinars",
      "Workshops",
      "Bootcamps",
      "Job Simulations",
      "Community Marketplace",
    ],
    blueprint: {
      kicker: "ECOSYSTEM BLUEPRINT // WORKPLACE READINESS",
      focus:
        "Bridging theoretical classroom business concepts with realistic, tactical day-one workplace execution.",
      deliverables: [
        "Tactical job simulations replicating real-world cross-functional corporate briefs.",
        "1-on-1 and cohort mentorship circles led by practicing business and HR leaders.",
        "Community talent exchange connecting vetted young contributors to high-growth startups.",
      ],
    },
  },
  {
    id: "vibeos",
    num: "02",
    kicker: "Product exploration · SaaS",
    statusBadge: "Concept & R&D",
    title: "VibeOS",
    tagline:
      "Cultural intelligence for startups. Helping teams make the invisible signals of workplace culture easier to understand.",
    overview:
      "An evolving SaaS concept that translates workplace sentiment and team dynamics into clearer cultural signals, helping startup leaders make more informed people decisions.",
    pillars: [
      "Cultural Intelligence",
      "Workplace Sentiment",
      "Team Dynamics",
      "Attrition Signals",
      "Decision Intelligence",
      "Startup Health",
    ],
    blueprint: {
      kicker: "PRODUCT BLUEPRINT // CULTURAL INTELLIGENCE",
      focus:
        "Surfacing silent cultural drift and communication bottlenecks before they turn into retention loss or burnouts.",
      deliverables: [
        "Lightweight sentiment telemetry measuring real team psychological safety and alignment.",
        "Dynamic cultural pulse dashboards providing startup founders with proactive HR signals.",
        "Actionable intervention playbooks designed to foster high-trust, resilient work environments.",
      ],
    },
  },
];

export default function Building() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Single-open accordion: only one venture idea box is open at a time
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleVenture = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal header elements
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Reveal venture cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".venture-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="building-section" id="building" ref={sectionRef}>
      {/* Subtle ambient luxury orbs */}
      <div className="bld-glow glow-top" aria-hidden="true" />
      <div className="bld-glow glow-bottom" aria-hidden="true" />
      <div className="bld-watermark" aria-hidden="true">
        <span>VENTURES</span>
      </div>

      <div className="building-container">
        {/* ====================================================
            Top Split Header: Large Title + Right Subtitle (Matching Foundations)
        ==================================================== */}
        <header className="building-header" ref={headerRef}>
          <div className="header-left">
            <span className="building-kicker">06 / BUILDING</span>
            <h2 className="building-title">
              Ideas built for<br />
              <span className="headline-italic">real-world use.</span>
            </h2>
          </div>

          <div className="header-right">
            <p className="building-subtitle">
              Two venture directions shaped around practical access: business learning
              for emerging talent, and cultural intelligence for growing teams.
            </p>
          </div>
        </header>

        {/* ====================================================
            The 2 Monumental Venture Cards (2-Column Grid)
        ==================================================== */}
        <div className="ventures-grid" ref={cardsRef}>
          {VENTURES.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className={`venture-card ${isOpen ? "is-expanded" : ""}`}
              >
                {/* Card Top Meta */}
                <div className="venture-top-bar">
                  <span className="venture-kicker">{item.kicker}</span>
                  <span className="venture-status-pill">
                    <span className="status-dot" aria-hidden="true" />
                    {item.statusBadge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="venture-title">{item.title}</h3>
                <p className="venture-tagline">{item.tagline}</p>

                {/* Divider Line */}
                <div className="venture-divider" aria-hidden="true" />

                {/* Deep Overview */}
                <p className="venture-overview">{item.overview}</p>

                {/* Rectangular Boxed Competency / Pillar Tags */}
                <div className="venture-pillars-wrap">
                  <span className="pillars-label">KEY CHANNELS &amp; FOCUS</span>
                  <div className="pillars-chips">
                    {item.pillars.map((pill, pIdx) => (
                      <span key={pIdx} className="pillar-chip">
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="venture-action-row">
                  <button
                    type="button"
                    onClick={() => toggleVenture(item.id)}
                    className={`explore-idea-btn ${isOpen ? "active" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={`venture-blueprint-${item.id}`}
                  >
                    <span>{isOpen ? "Close exploration" : "Explore the idea"}</span>
                    {isOpen ? (
                      <FiChevronUp className="btn-icon" />
                    ) : (
                      <FiArrowUpRight className="btn-icon" />
                    )}
                  </button>
                </div>

                {/* ====================================================
                    Inline Blueprint Drawer (Opens Directly Under In Card)
                ==================================================== */}
                {isOpen && (
                  <div
                    className="venture-blueprint-drawer"
                    id={`venture-blueprint-${item.id}`}
                    role="region"
                    aria-label={`Blueprint for ${item.title}`}
                  >
                    <div className="blueprint-header">
                      <span className="blueprint-tag">{item.blueprint.kicker}</span>
                      <span className="blueprint-rule" />
                    </div>

                    <p className="blueprint-focus">{item.blueprint.focus}</p>

                    <div className="blueprint-deliverables">
                      {item.blueprint.deliverables.map((bullet, bIdx) => (
                        <div key={bIdx} className="deliverable-row">
                          <FiCheckCircle className="check-icon" />
                          <span className="deliverable-text">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* ====================================================
            Bottom Venture Manifesto Plinth
        ==================================================== */}
        <div className="ventures-manifesto-plinth">
          <div className="manifesto-left">
            <span className="manifesto-tag">OPERATIONAL VENTURES</span>
            <blockquote className="manifesto-quote">
              &ldquo;Two venture directions shaped around practical access: business learning
              for emerging talent, and cultural intelligence for growing teams.&rdquo;
            </blockquote>
          </div>

          <div className="manifesto-right">
            <a href="#contact" className="collaborate-btn">
              <span>Discuss or Collaborate</span>
              <FiArrowUpRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
