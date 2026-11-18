"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  FiArrowUpRight,
  FiDownload,
  FiStar,
  FiMapPin,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./story.scss";

export default function Story() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !storyRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".story-header-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Arch and content reveal
      gsap.fromTo(
        ".story-body-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-main-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, storyRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleResumeDownload = () => {
    try {
      const downloadLink = document.createElement("a");
      downloadLink.href = "/assert/doc/resume.pdf";
      downloadLink.download = "Yuti_Acharya_Resume.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Resume download error:", err);
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="story-section" id="story" ref={storyRef}>
      {/* Subtle brand ambient accents */}
      <div className="story-ambient-glow" aria-hidden="true" />
      <div className="story-ambient-secondary" aria-hidden="true" />

      <div className="story-container">
        {/* ====================================================
            Editorial Header: Clean Split Style (Matching Foundations)
        ==================================================== */}
        <header className="story-header">
          <div className="header-left">
            <span className="story-kicker">02 / STORY</span>
            <h2 className="story-title">About me.</h2>
          </div>

          <div className="header-right">
            <p className="story-subtitle">
              Blending human ingenuity with intelligent systems to architect purposeful,
              frictionless digital experiences and scalable web software.
            </p>
          </div>
        </header>

        {/* ====================================================
            Main Grid: Sculpted Arched Portrait + Signature & Story
        ==================================================== */}
        <div className="story-main-grid">
          {/* Left Wing: Distinctive Arched Portrait Portal */}
          <div className="story-arch-column story-body-item">
            <div className="arch-portal-container">
              {/* Outer Floating Hairline Halo Arch */}
              <div className="arch-halo-frame" aria-hidden="true" />

              {/* Sculpted Arched Photo Vault (Single High-Res Image) */}
              <div className="arch-vault">
                <Image
                  src="/assert/img/yuti.png"
                  alt="Yuti Acharya - Full Stack & AI Engineer"
                  width={900}
                  height={1100}
                  priority
                  className="arch-portrait-img"
                />

                {/* Overlaid Top Tag */}
                <div className="arch-tag-top">
                  <span className="arch-badge">
                    <FiStar className="badge-star" />
                    <span>Full Stack &bull; AI Engineer</span>
                  </span>
                </div>

                {/* Overlaid Bottom Status Badge */}
                <div className="arch-tag-bottom">
                  <div className="status-pill">
                    <span className="status-dot" />
                    <span className="status-label">Available for Select Projects</span>
                  </div>
                </div>
              </div>

              {/* Under-arch Minimalist Location Plinth */}
              <div className="arch-location-plinth">
                <FiMapPin className="plinth-icon" />
                <span>Ahmedabad, India &bull; Working Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Wing: Signature & Clean Narrative Content */}
          <div className="story-narrative-column story-body-item">
            {/* Signature & Author Identity */}
            <div className="signature-area">
              <div className="signature-art">
                <span className="signature-script">Yuti Acharya</span>
              </div>
              <div className="signature-caption">
                <span className="caption-dash" />
                <span className="caption-text">Full Stack Developer &amp; AI Engineer</span>
              </div>
            </div>

            {/* Concise, High-Impact Narrative Prose (Less Content, Pure Quality) */}
            <div className="narrative-body">
              <p className="narrative-p lead">
                I&apos;m <strong>Yuti Acharya</strong>, an engineer and strategist dedicated to building
                high-performance web applications, intelligent automations, and resilient digital architectures
                that transform complex workflows into effortless human experiences.
              </p>

              <p className="narrative-p">
                My engineering ethos bridges clean code with deliberate aesthetics. From architecting
                <strong> Salahakar AI</strong>—an intelligent legal advisory ecosystem—to crafting
                bespoke luxury digital storefronts like <strong>Designs of Dreams</strong>, I design software
                that pairs technical rigor with sub-100ms fluidity.
              </p>

              <p className="narrative-p">
                I thrive at the intersection of modern full-stack development, agentic workflows, and
                tactile product design. Every project is approached with curiosity, craftsmanship, and a
                commitment to building enduring value.
              </p>
            </div>

            {/* Refined Action Buttons Station */}
            <div className="story-actions">
              <a
                href="/assert/doc/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                className="story-btn primary-btn"
                title="Download Yuti Acharya's Resume (PDF)"
              >
                <FiDownload className="btn-icon" />
                <span>Download Resume</span>
                <span className="btn-pill">PDF</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="story-btn secondary-btn"
              >
                <span>Let&apos;s Connect</span>
                <FiArrowUpRight className="arrow-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
