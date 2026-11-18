"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import "./priloader.scss";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftGateRef = useRef<HTMLDivElement>(null);
  const rightGateRef = useRef<HTMLDivElement>(null);
  const centerSealRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating Stardust Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(112, 45, 58,", // Oxblood
      "rgba(88, 59, 97,",  // Aubergine
      "rgba(196, 123, 137,", // Rose
      "rgba(180, 140, 50,",  // Gold
    ];

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.55 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.phase += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const dynamicAlpha = Math.max(
          0.1,
          p.alpha * (0.6 + 0.4 * Math.sin(p.phase))
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${dynamicAlpha.toFixed(2)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth counter timer
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const duration = 2800;
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2.3);
      const val = Math.floor(eased * 100);

      setPercent(val);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setPercent(100);
        setIsCompleted(true);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Grand Dual-Gate Reveal Transition
  useEffect(() => {
    if (!isCompleted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.32,
        onComplete: () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          setShouldRemove(true);
        },
      });

      // 1. Center seal unlocks & blooms
      if (centerSealRef.current) {
        tl.to(centerSealRef.current, {
          scale: 1.15,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.45,
          ease: "power2.inOut",
        });
      }

      // 2. Dual Gates slide open horizontally (Left door slides left, right door slides right!)
      if (leftGateRef.current && rightGateRef.current) {
        tl.to(
          leftGateRef.current,
          {
            xPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "-=0.25"
        );

        tl.to(
          rightGateRef.current,
          {
            xPercent: 100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "<"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPercent(100);
    setIsCompleted(true);
  };

  if (shouldRemove) return null;

  // Circular progress stroke math
  const circleRadius = 58;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div
      className={`atelier-preloader-overlay ${isCompleted ? "is-exiting" : ""}`}
      ref={containerRef}
      aria-hidden="true"
    >
      {/* Floating Stardust Canvas */}
      <canvas ref={canvasRef} className="atelier-stardust-canvas" />

      {/* ----------------------------------------------------
          Left Atelier Gate
      ----------------------------------------------------- */}
      <div className="atelier-gate gate-left" ref={leftGateRef}>
        <div className="gate-inner">
          {/* Top Left Header */}
          <div className="gate-header-left">
            <span className="live-sparkle" />
            <span className="edition-text">Vol. 01 &bull; 2024</span>
          </div>

          {/* Left Hero Typographic Monolith */}
          <div className="gate-hero-text">
            <span className="eyebrow-script">Creative Engineering</span>
            <h1 className="monolith-name name-left">YUTI</h1>
            <p className="subtitle-role">Full Stack &amp; AI Engineer</p>
          </div>

          {/* Bottom Left Footer Info */}
          <div className="gate-footer-left">
            <span className="meta-capsule">Ahmedabad &bull; India</span>
            <span className="meta-sub">Crafting Modern Solutions</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          Right Atelier Gate
      ----------------------------------------------------- */}
      <div className="atelier-gate gate-right" ref={rightGateRef}>
        <div className="gate-inner">
          {/* Top Right Header Controls */}
          <div className="gate-header-right">
            <button
              type="button"
              onClick={handleSkip}
              className="skip-pill"
              title="Skip intro"
            >
              <span>Skip</span>
              <FiArrowRight className="arrow" />
            </button>
          </div>

          {/* Right Hero Typographic Monolith */}
          <div className="gate-hero-text">
            <span className="eyebrow-script">Digital Atelier</span>
            <h1 className="monolith-name name-right">ACHARYA</h1>
            <p className="subtitle-role">Intelligent Interactive Systems</p>
          </div>

          {/* Bottom Right Milestones */}
          <div className="gate-footer-right">
            <div className="milestone-track">
              <span className={`pill-node ${percent >= 33 ? "done" : ""}`}>
                01 Architecture
              </span>
              <span className={`pill-node ${percent >= 66 ? "done" : ""}`}>
                02 AI Systems
              </span>
              <span className={`pill-node ${percent >= 100 ? "done" : ""}`}>
                03 Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          Center Medallion Seal (Bridges the Two Gates)
      ----------------------------------------------------- */}
      <div className="center-seal-wrapper" ref={centerSealRef}>
        <div className="seal-ambient-aura" />

        {/* Circular SVG Progress Ring */}
        <div className="seal-ring-container">
          <svg className="seal-ring-svg" viewBox="0 0 136 136">
            <circle
              className="svg-track"
              cx="68"
              cy="68"
              r={circleRadius}
            />
            <circle
              className="svg-progress"
              cx="68"
              cy="68"
              r={circleRadius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Frosted Core Medallion with Portrait Image */}
          <div className="seal-frosted-core">
            <div className="seal-portrait-wrap">
              <Image
                src="/assert/img/yuti1.png"
                alt="Yuti Acharya"
                width={120}
                height={120}
                className="seal-portrait-img"
                priority
              />
            </div>
            <div className="seal-percent-badge">
              <span>{percent}%</span>
            </div>
          </div>

          {/* Rotating Corner Sparkles */}
          <div className="orbiting-gems">
            <FiStar className="gem g1" />
            <FiStar className="gem g2" />
          </div>
        </div>

        {/* Minimalist Caption Below Seal */}
        <div className="seal-caption">
          <span>{percent < 100 ? "Loading Atelier..." : "Welcome In ✨"}</span>
        </div>
      </div>
    </div>
  );
}
