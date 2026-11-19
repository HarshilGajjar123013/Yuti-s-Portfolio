"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./projects.scss";

const TALENT_METRIC_TAGS = [
  "20% lower time-to-hire",
  "60% growth in qualified applicants",
  "35% lower time-to-fill for critical roles",
  "10% improvement in onboarding",
];

const CONSULTING_SYSTEM_TAGS = [
  "HRMS automation",
  "Employee handbook and policies",
  "Attendance workflows",
  "Retailer onboarding SOPs",
  "Product distribution",
  "Digital-commerce initiatives",
];

export default function Projects() {
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
        const rows = contentRef.current.querySelectorAll(".practice-row");
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
    <section className="practice-section" id="projects" ref={sectionRef}>
      <div className="practice-container">
        {/* ====================================================
            Top Split Header: Large Title + Right Subtitle
        ==================================================== */}
        <header className="practice-header" ref={headerRef}>
          <div className="header-left">
            <span className="practice-kicker">05 / IN PRACTICE</span>
            <h2 className="practice-title">
              Better hiring.<br />Stronger systems.
            </h2>
          </div>

          <div className="header-right">
            <p className="practice-subtitle">
              The focus is not activity for activity&rsquo;s sake. It is removing
              friction, improving decisions and making people operations work better.
            </p>
          </div>
        </header>

        {/* ====================================================
            Editorial Divider Rows (Corporate / Consulting)
        ==================================================== */}
        <div className="practice-content" ref={contentRef}>
          {/* Row 1: 2024 — PRESENT* */}
          <article className="practice-row">
            <div className="row-meta">
              <span className="row-time-label">2024 — PRESENT*</span>
            </div>

            <div className="row-body">
              <h3 className="row-role-title">Senior Talent Acquisition Executive</h3>
              <p className="row-organization">
                Appitsimple Infotek &middot; Talent Acquisition &amp; People Operations
              </p>
              <p className="row-narrative">
                Improved hiring performance through structured sourcing, stakeholder
                partnership and candidate experience: 20% lower time-to-hire, 60%
                growth in qualified applicants, 35% lower time-to-fill for critical
                roles, and a 10% improvement in onboarding.
              </p>

              {/* Elevated Metric Tags */}
              <div className="row-tags-strip">
                {TALENT_METRIC_TAGS.map((tag, idx) => (
                  <span key={idx} className="practice-tag-pill metric-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Row 2: CONSULTING */}
          <article className="practice-row">
            <div className="row-meta">
              <span className="row-time-label">CONSULTING</span>
            </div>

            <div className="row-body">
              <h3 className="row-role-title">Consultant</h3>
              <p className="row-organization">
                IAUF &middot; Business Operations &amp; People Systems
              </p>
              <p className="row-narrative">
                Helped strengthen the operating backbone: HRMS automation, employee
                handbook and policies, attendance workflows, retailer onboarding
                SOPs, product distribution and digital-commerce initiatives.
              </p>

              {/* Elevated System Capability Tags */}
              <div className="row-tags-strip">
                {CONSULTING_SYSTEM_TAGS.map((tag, idx) => (
                  <span key={idx} className="practice-tag-pill system-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Bottom Footnote */}
          <div className="practice-footnote-row">
            <p className="practice-footnote-text">
              *Confirm current employment status and dates before publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
