"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.scss";

interface Initiative {
  id: string;
  num: string;
  kicker: string;
  title: string;
  subtitle: string;
  fieldNotes: string;
}

const INITIATIVES: Initiative[] = [
  {
    id: "global-shapers",
    num: "01",
    kicker: "AHMEDABAD · GLOBAL SHAPERS",
    title: "Global Shapers Hub",
    subtitle:
      "Partnerships and education initiatives, including entrepreneurship programming.",
    fieldNotes:
      "Worked on Project Accelerate and partnership development across institutions, campuses, corporates, NGOs and community networks, supporting an ecosystem ambition of 25 active partners.",
  },
  {
    id: "project-lifeline",
    num: "02",
    kicker: "COMMUNITY PREPAREDNESS",
    title: "Project Lifeline",
    subtitle:
      "Making lifesaving skills more familiar, practical and accessible.",
    fieldNotes:
      "Developing a practical community-readiness model around Compression-Only Life Support, CPR, AED awareness, first aid and injury response, with schools, colleges and workplaces as key audiences.",
  },
  {
    id: "samanway-pratishthan",
    num: "03",
    kicker: "YOUTH DEVELOPMENT",
    title: "Samanway Pratishthan",
    subtitle:
      "Growth-focused work across dialogue, creativity, wellbeing and connection.",
    fieldNotes:
      "Supported youth and community initiatives through a growth catalyst role.",
  },
  {
    id: "youth-parliament",
    num: "04",
    kicker: "YOUTH LEADERSHIP · DIPLOMACY",
    title: "Youth Parliament of India",
    subtitle:
      "Served as Minister of External Affairs in a youth leadership platform.",
    fieldNotes:
      "Engaged with dialogue, diplomacy and youth-led civic leadership.",
  },
];

const SELECTED_ENGAGEMENTS = [
  "UN ECOSOC Youth Forum",
  "Youth Diplomacy Platforms",
  "Entrepreneurship Programmes",
  "Community Capability Initiatives",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Single-open accordion state: only one card can be open at a time
  const [openId, setOpenId] = useState<string | null>("global-shapers");

  const toggleFieldNotes = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
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

      // Monolith Cards Stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".community-card");
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="community-section" id="skills" ref={sectionRef}>
      {/* Subtle luxury ambient accents */}
      <div className="comm-glow glow-top" aria-hidden="true" />
      <div className="comm-glow glow-bottom" aria-hidden="true" />
      <div className="comm-watermark" aria-hidden="true">
        <span>IMPACT</span>
      </div>

      <div className="community-container">
        {/* ====================================================
            Top Grand Editorial Header (Matching Foundations)
        ==================================================== */}
        <header className="community-header" ref={headerRef}>
          <div className="header-left">
            <span className="community-kicker">04 / IN COMMUNITY</span>
            <h2 className="community-title">
              Impact takes<br />
              <span className="title-italic">a team.</span>
            </h2>
          </div>

          <div className="header-right">
            <p className="community-subtitle">
              From entrepreneurship education to lifesaving-skills awareness, the work
              is built around participation, partnerships and capability that lasts beyond an event.
            </p>
          </div>
        </header>

        {/* ====================================================
            The 4 Architectural Community Cards (2x2 Grid)
        ==================================================== */}
        <div className="community-editorial-grid" ref={cardsRef}>
          {INITIATIVES.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className={`community-card ${isOpen ? "is-expanded" : ""}`}
              >
                {/* Top Kicker */}
                <div className="card-kicker">{item.kicker}</div>

                {/* Main Card Header */}
                <h3 className="card-title">{item.title}</h3>
                <p className="card-subtitle">{item.subtitle}</p>

                {/* Subtle Divider Line */}
                <div className="card-divider" aria-hidden="true" />

                {/* Open Field Notes Trigger */}
                <div className="card-action">
                  <button
                    type="button"
                    onClick={() => toggleFieldNotes(item.id)}
                    className={`open-field-notes-btn ${isOpen ? "active" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={`field-notes-${item.id}`}
                  >
                    <span>{isOpen ? "CLOSE FIELD NOTES -" : "OPEN FIELD NOTES +"}</span>
                  </button>
                </div>

                {/* Inline Field Notes Box (Opens Directly Under In Card) */}
                {isOpen && (
                  <div
                    className="field-notes-box"
                    id={`field-notes-${item.id}`}
                    role="region"
                    aria-label={`Field notes for ${item.title}`}
                  >
                    <p className="field-notes-text">{item.fieldNotes}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* ====================================================
            The Consistent Thread: Signature Editorial Plinth
        ==================================================== */}
        <div className="consistent-thread-plinth">
          <div className="thread-quote-col">
            <span className="quote-glyph" aria-hidden="true">
              &ldquo;
            </span>
            <span className="thread-tag">A CONSISTENT THREAD</span>
            <p className="thread-quote-text">
              Bring the right people together, make knowledge practical, and build pathways for others to act.
            </p>
          </div>

          {/* Selected Engagement Tags Strip */}
          <div className="selected-engagements-col">
            <span className="engagements-kicker">SELECTED ENGAGEMENT</span>
            <div className="engagements-chips-row">
              {SELECTED_ENGAGEMENTS.map((tag, idx) => (
                <span key={idx} className="engagement-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
