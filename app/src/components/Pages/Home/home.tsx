
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.scss";

interface Discipline {
  label: string;
  id: string;
}

const DISCIPLINES: Discipline[] = [
  { label: "Web Development", id: "web-dev" },
  { label: "AI & Automation", id: "ai-auto" },
  { label: "Product Design", id: "product-design" },
  { label: "UI/UX Design", id: "ui-ux" },
  { label: "Tech Consultancy", id: "tech-consultancy" },
];

const HT_W = 770;
const HT_H = 600;

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const halftoneRef = useRef<HTMLDivElement>(null);

  // AI & Automation is selected by default, as in the reference.
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState(1);

  const halftoneDots = useMemo(() => {
    const dots: {
      cx: number;
      cy: number;
      r: number;
      opacity: number;
    }[] = [];

    const step = 12.5;
    const centerX = HT_W / 2;
    const centerY = HT_H / 2;
    const radiusX = HT_W / 2 - 4;
    const radiusY = HT_H / 2 - 4;

    for (let x = step / 2; x < HT_W; x += step) {
      for (let y = step / 2; y < HT_H; y += step) {
        const dx = (x - centerX) / radiusX;
        const dy = (y - centerY) / radiusY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
          const factor = Math.pow(1 - distance, 0.9);

          dots.push({
            cx: x,
            cy: y,
            r: Number((0.55 + factor * 2.7).toFixed(2)),
            opacity: Number((0.3 + factor * 0.7).toFixed(2)),
          });
        }
      }
    }

    return dots;
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (
      !hero ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -35,
          scale: 0.97,
          transformOrigin: "bottom center",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (halftoneRef.current) {
        gsap.to(halftoneRef.current, {
          y: -20,
          scale: 0.95,
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  const handleHireMeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const contact = document.getElementById("contact");

    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact");
    }
  };

  return (
    <main>
      <section className="hero-page" id="home" ref={heroRef}>
        {/* Background shapes, watermark and halftone */}
        <div className="bg-canvas" aria-hidden="true">
          <svg
            className="bg-shapes"
            viewBox="0 0 1672 941"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <path
              d="M0 480 C180 560 380 760 540 941 L0 941 Z"
              fill="#E6DFD4"
              opacity=".42"
            />

            <path
              d="M0 800 C95 820 195 870 250 941 L0 941 Z"
              fill="#E6DFD4"
              opacity=".65"
            />

            {/* Right background shade moved to bottom side */}
            <path
              d="M1672 680 C1480 740 1320 830 1240 941 L1672 941 Z"
              fill="#E6DFD4"
              opacity=".42"
            />

            <path
              d="M1672 800 C1580 830 1510 880 1450 941 L1672 941 Z"
              fill="#E6DFD4"
              opacity=".65"
            />
          </svg>

          {/* Oversized background watermark moved to right side */}
          <svg
            className="watermark-bg"
            viewBox="0 0 1920 260"
            preserveAspectRatio="xMaxYMin meet"
          >
            <defs>
              <linearGradient
                id="wmFade"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="100"
                x2="0"
                y2="260"
              >
                <stop offset="0%" stopColor="#E6DFD4" stopOpacity=".8" />
                <stop offset="100%" stopColor="#E6DFD4" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g fill="url(#wmFade)" className="watermark-text">
              <text
                x="820"
                y="340"
                textLength="260"
                lengthAdjust="spacingAndGlyphs"
              >
                Y
              </text>

              <text
                x="1120"
                y="340"
                textLength="300"
                lengthAdjust="spacingAndGlyphs"
              >
                U
              </text>

              <text
                x="1460"
                y="340"
                textLength="230"
                lengthAdjust="spacingAndGlyphs"
              >
                T
              </text>

              <text
                x="1730"
                y="340"
                textLength="90"
                lengthAdjust="spacingAndGlyphs"
              >
                I
              </text>
            </g>
          </svg>

          {/* Elliptical halftone behind portrait */}
          <div className="halftone-container" ref={halftoneRef}>
            <svg
              className="halftone-svg"
              viewBox={`0 0 ${HT_W} ${HT_H}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {halftoneDots.map((dot, index) => (
                <circle
                  key={index}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={dot.r}
                  fill="#702D3A"
                  opacity={dot.opacity}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="eyebrow-text">{"01 //"} HEY THERE !</span>
          <span className="eyebrow-line" aria-hidden="true" />
        </div>

        {/* Main headline */}
        <h1 className="hero-headline" aria-label="Yuti Acharya">
          <svg viewBox="0 0 1496 170" aria-hidden="true">
            <text
              x="0"
              y="145"
              textLength="396"
              lengthAdjust="spacingAndGlyphs"
            >
              YUTI
            </text>

            <text
              x="448"
              y="145"
              textLength="1048"
              lengthAdjust="spacingAndGlyphs"
            >
              ACHARYA
            </text>
          </svg>
        </h1>

        {/* Portrait */}
        <div className="portrait-container">
          <div className="portrait-frame" ref={portraitRef}>
            <Image
              src="/assert/img/yuti.png"
              alt="Yuti Acharya"
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 640px) 90vw, 55vw"
              className="portrait-img"
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="hero-left-content">
          <p className="bio-line bio-intro">Hey there! I&apos;m Yuti Acharya</p>
          <p className="bio-line">
            I turn people challenges into better systems, early ideas into initiatives, and collaboration into measurable progress.
          </p>

          <div className="bio-accent-rule" aria-hidden="true" />
        </div>

        {/* Hire me CTA */}
        <div className="hero-cta-corner">
          <a
            href="/contact"
            onClick={handleHireMeClick}
            className="hire-me-link"
            aria-label="Hire Yuti Acharya"
          >
            <span className="hire-prefix">{"//"}</span>
            <span className="hire-text">HIRE ME</span>
            <FiArrowRight className="hire-arrow" aria-hidden="true" />
          </a>
        </div>

        {/* Interactive services */}
        <div className="hero-right-content">
          <div
            className="disciplines-track"
            style={
              {
                "--active-idx": activeDisciplineIndex,
              } as React.CSSProperties
            }
          >
            <div className="track-rail" aria-hidden="true">
              <div className="track-node" />
            </div>

            <ul className="disciplines-list">
              {DISCIPLINES.map((item, index) => {
                const isActive = index === activeDisciplineIndex;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`discipline-row ${isActive ? "active" : ""
                        }`}
                      onClick={() => setActiveDisciplineIndex(index)}
                      onFocus={() => setActiveDisciplineIndex(index)}
                      aria-pressed={isActive}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
