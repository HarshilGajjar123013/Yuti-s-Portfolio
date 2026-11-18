"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./education.scss";

const COMPETENCIES = [
  "Talent & People",
  "Business Strategy",
  "Product Thinking",
  "Research",
  "Partnerships",
  "Public Speaking",
  "Community Building",
];

export default function Education() {
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

      // Reveal content rows
      if (contentRef.current) {
        const rows = contentRef.current.querySelectorAll(".foundations-row");
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

        const tags = contentRef.current.querySelectorAll(".competency-box");
        gsap.fromTo(
          tags,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".competencies-boxes",
              start: "top 88%",
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
    <section className="education-section" id="education" ref={sectionRef}>
      <div className="education-container">
        {/* ====================================================
            Top Header: Kicker + Large Title + Right Subtitle
        ==================================================== */}
        <header className="foundations-header" ref={headerRef}>
          <div className="header-left">
            <span className="foundations-kicker">03 / FOUNDATIONS</span>
            <h2 className="foundations-title">
              Learning across<br />disciplines.
            </h2>
          </div>

          <div className="header-right">
            <p className="foundations-subtitle">
              A technical foundation, business education and<br />
              continuous professional learning.
            </p>
          </div>
        </header>

        {/* ====================================================
            Editorial Divider Rows (Business / Tech / Tools)
        ==================================================== */}
        <div className="foundations-content" ref={contentRef}>
          {/* Row 1: BUSINESS */}
          <div className="foundations-row">
            <div className="row-label">BUSINESS</div>
            <div className="row-body">
              <h3 className="row-degree">BBA · Human Resource Management</h3>
              <p className="row-institution">Dr. D. Y. Patil University</p>
            </div>
          </div>

          {/* Row 2: TECHNOLOGY */}
          <div className="foundations-row">
            <div className="row-label">TECHNOLOGY</div>
            <div className="row-body">
              <h3 className="row-degree">Diploma · Computer Science Engineering</h3>
              <p className="row-institution">Silver Oak University</p>
            </div>
          </div>

          {/* Row 3: TOOLS & STUDY */}
          <div className="foundations-row">
            <div className="row-label">TOOLS &amp; STUDY</div>
            <div className="row-body">
              <p className="row-tools-text">
                People Analytics &bull; HR Analytics &bull; Power BI &bull; Six Sigma &bull; Product Management &bull; Data Science &bull; Digital Marketing &bull; Business Analytics &bull; Keka HR
              </p>
            </div>
          </div>

          {/* Bottom Competencies Box Strip */}
          <div className="competencies-boxes">
            {COMPETENCIES.map((item, idx) => (
              <span key={idx} className="competency-box">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
