"use client";

import React, { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./questions.scss";

interface Inquiry {
  id: string;
  num: string;
  category: string;
  title: string;
  focus: string;
  narrative: string;
  tags: string[];
}

const INQUIRIES: Inquiry[] = [
  {
    id: "unorganised-artisans",
    num: "01",
    category: "FIELD INQUIRY",
    title: "Hidden Economy: Unorganised Women Artisans",
    focus: "Informal Economy · Livelihood Visibility & Structural Equity",
    narrative:
      "Exploring visibility, livelihoods and structural barriers in the informal economy.",
    tags: [
      "Informal Economy",
      "Women Artisans",
      "Structural Barriers",
      "Livelihood Visibility",
      "Qualitative Fieldwork",
    ],
  },
  {
    id: "youth-entrepreneurship",
    num: "02",
    category: "EMPIRICAL STUDY",
    title: "Overcoming Barriers to Entrepreneurship among Youth",
    focus: "Youth Ecosystems · 180 Founders & 25 Ecosystem Leaders",
    narrative:
      "Engaged 180 youth entrepreneurs and 25 leaders to examine barriers, enabling conditions and the ecosystem needed for young founders to progress.",
    tags: [
      "180 Youth Entrepreneurs",
      "25 Leadership Voices",
      "Enabling Conditions",
      "Ecosystem Architecture",
      "Founder Progression",
    ],
  },
];

export default function Questions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          { y: 24, opacity: 0 },
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

      // Reveal inquiry rows
      if (contentRef.current) {
        const rows = contentRef.current.querySelectorAll(".questions-row");
        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
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
    <section className="questions-section" id="questions" ref={sectionRef}>
      <div className="questions-container">
        {/* ====================================================
            Top Split Header: Kicker + Title + Subtitle
        ==================================================== */}
        <header className="questions-header" ref={headerRef}>
          <div className="header-left">
            <span className="questions-kicker">07 / QUESTIONS I FOLLOW</span>
            <h2 className="questions-title">
              Evidence before<br />
              <span className="title-italic">assumptions.</span>
            </h2>
          </div>

          <div className="header-right">
            <p className="questions-subtitle">
              Research that surfaces overlooked work, tests assumptions and gives
              decision-makers a clearer view of barriers.
            </p>
          </div>
        </header>

        {/* ====================================================
            Editorial Divider Rows (Research Tracks)
        ==================================================== */}
        <div className="questions-content" ref={contentRef}>
          {INQUIRIES.map((item) => (
            <article key={item.id} className="questions-row">
              {/* Left Column Meta */}
              <div className="row-meta">
                <span className="row-category-label">{item.category}</span>
                <span className="row-index-label">{"//"} {item.num}</span>
              </div>

              {/* Right Column Body */}
              <div className="row-body">
                <h3 className="row-inquiry-title">{item.title}</h3>
                <p className="row-focus-line">{item.focus}</p>
                <p className="row-narrative">{item.narrative}</p>

                {/* Rectangular Boxed Competency / Focus Tags */}
                <div className="row-tags-strip">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="inquiry-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ====================================================
            Bottom Research Manifesto Plinth
        ==================================================== */}
        <div className="questions-manifesto-plinth">
          <div className="manifesto-left">
            <span className="manifesto-tag">RESEARCH &amp; INQUIRY</span>
            <blockquote className="manifesto-quote">
              &ldquo;Research that surfaces overlooked work, tests assumptions and gives
              decision-makers a clearer view of barriers.&rdquo;
            </blockquote>
          </div>

          <div className="manifesto-right">
            <a href="#contact" className="inquire-btn">
              <span>Discuss Research</span>
              <FiArrowUpRight className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
