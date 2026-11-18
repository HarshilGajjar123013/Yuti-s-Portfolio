"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiArrowUpRight,
  FiMail,
  FiX,
} from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./navbar.scss";

interface NavItem {
  label: string;
  href: string;
  id: string;
  num: string;
  desc: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#home",
    id: "home",
    num: "01",
    desc: "Archive, Vision & Creative Introduction",
  },
  {
    label: "Story",
    href: "#story",
    id: "story",
    num: "02",
    desc: "Personal Journey, Milestones & Principles",
  },
  {
    label: "Education",
    href: "#education",
    id: "education",
    num: "03",
    desc: "Academic Background & Engineering Foundations",
  },
  {
    label: "Community",
    href: "#skills",
    id: "skills",
    num: "04",
    desc: "Civic Initiatives, Partnerships & Leadership Impact",
  },
  {
    label: "Practice",
    href: "#projects",
    id: "projects",
    num: "05",
    desc: "Talent Acquisition, People Systems & Operations",
  },
  {
    label: "Building",
    href: "#building",
    id: "building",
    num: "06",
    desc: "Ventures, Learning Platforms & Cultural Intelligence",
  },
  {
    label: "Questions",
    href: "#questions",
    id: "questions",
    num: "07",
    desc: "Research, Field Inquiry & Evidence-Based Insights",
  },
  {
    label: "Contact",
    href: "#contact",
    id: "contact",
    num: "08",
    desc: "Direct Dialogue, Inquiries & Global Partnerships",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lookbookOpen, setLookbookOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Live Ahmedabad (IST) Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setCurrentTime(istTime);
      } catch {
        setCurrentTime("IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // ScrollSpy & Sticky Navbar Detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const sections = [
        "home",
        "story",
        "education",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when lookbook overlay is open
  useEffect(() => {
    if (lookbookOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lookbookOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLookbookOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setLookbookOpen(false);

    if (targetId === "home") {
      const homeEl = document.getElementById("home");
      if (homeEl) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 85;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <>
      {/* ----------------------------------------------------
          Minimalist Top Atelier Header Bar
      ----------------------------------------------------- */}
      <header
        className={`atelier-lookbook-header ${isScrolled ? "scrolled" : ""} ${
          lookbookOpen ? "menu-active" : ""
        }`}
      >
        <div className="header-glass-bar">
          {/* Left: Brand Portrait Cameo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="brand-cameo-link"
            aria-label="Yuti Acharya Homepage"
          >
            <div className="cameo-medallion">
              <Image
                src="/assert/img/yuti1.png"
                alt="Yuti Acharya"
                width={40}
                height={40}
                className="cameo-img"
                priority
              />
              <span className="cameo-glint">✦</span>
            </div>
            <div className="brand-ident">
              <span className="brand-name">
                <span className="first">YUTI</span> ACHARYA
              </span>
              <span className="brand-tag">
                <span className="tag-dot" /> ATELIER &bull; AI ENGINEER
              </span>
            </div>
          </a>

          {/* Right: Haute Lookbook MENU Trigger */}
          <div className="header-actions">
            <button
              type="button"
              onClick={() => setLookbookOpen(!lookbookOpen)}
              className={`action-menu-trigger ${lookbookOpen ? "is-open" : ""}`}
              aria-label={lookbookOpen ? "Close lookbook menu" : "Open lookbook menu"}
              aria-expanded={lookbookOpen}
            >
              <span className="trigger-label">
                {lookbookOpen ? "CLOSE" : "MENU"}
              </span>
              <div className="trigger-burger-icon">
                <span className="bar bar-top" />
                <span className="bar bar-bottom" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
          Fullscreen Luxury Lookbook Menu Overlay
      ----------------------------------------------------- */}
      <div
        className={`luxury-lookbook-overlay ${lookbookOpen ? "is-visible" : ""}`}
        aria-hidden={!lookbookOpen}
      >
        {/* Soft Ambient Frosted Backdrop */}
        <div
          className="lookbook-backdrop"
          onClick={() => setLookbookOpen(false)}
        />

        <div className="lookbook-content-container">
          {/* Top Bar inside Overlay */}
          <div className="lookbook-top-bar">
            <div className="lookbook-edition">
              <span>VOL. 01</span>
              <span className="dot">&bull;</span>
              <span>PORTFOLIO LOOKBOOK</span>
              <span className="dot">&bull;</span>
              <span>2024–2025</span>
            </div>
            <button
              type="button"
              onClick={() => setLookbookOpen(false)}
              className="lookbook-close-button"
              aria-label="Close lookbook"
            >
              <span>CLOSE</span>
              <FiX className="close-icon" />
            </button>
          </div>

          {/* Main Lookbook Dual-Column Grid */}
          <div className="lookbook-grid">
            {/* Left Column: Creator Identity Profile Card */}
            <div className="lookbook-profile-card">
              <div className="profile-portrait-wrap">
                <div className="portrait-ring">
                  <Image
                    src="/assert/img/yuti1.png"
                    alt="Yuti Acharya"
                    width={180}
                    height={180}
                    className="portrait-photo"
                    priority
                  />
                  <span className="portrait-sparkle">✨</span>
                </div>
              </div>

              <div className="profile-bio">
                <h3 className="profile-name">Yuti Acharya</h3>
                <p className="profile-role">
                  Full Stack Developer &amp; AI Systems Engineer
                </p>
                <p className="profile-manifesto">
                  Crafting modern web architectures, autonomous agent workflows,
                  and bespoke interactive digital solutions with creative engineering.
                </p>
              </div>

              <div className="profile-meta-grid">
                <div className="meta-box">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">Ahmedabad, India</span>
                </div>
                <div className="meta-box">
                  <span className="meta-label">Local Time</span>
                  <span className="meta-value">
                    {currentTime ? `${currentTime} IST` : "India Standard Time"}
                  </span>
                </div>
                <div className="meta-box">
                  <span className="meta-label">Status</span>
                  <span className="meta-value status-available">
                    <span className="dot" /> Open to Roles
                  </span>
                </div>
              </div>

              {/* Social Quick Links */}
              <div className="profile-social-row">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <FaGithub />
                  <span>GitHub</span>
                  <FiArrowUpRight className="arrow" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <FaLinkedinIn />
                  <span>LinkedIn</span>
                  <FiArrowUpRight className="arrow" />
                </a>
                <a
                  href="mailto:yutiacharya@gmail.com"
                  className="social-pill"
                >
                  <FiMail />
                  <span>Email</span>
                  <FiArrowUpRight className="arrow" />
                </a>
              </div>
            </div>

            {/* Right Column: Giant Editorial Typography Navigation Spreads */}
            <div className="lookbook-menu-spread">
              <nav className="spread-nav" aria-label="Lookbook Sections">
                <ul className="spread-list">
                  {navItems.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li
                        key={item.id}
                        className={`spread-item ${isActive ? "active" : ""}`}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className="spread-link"
                        >
                          <div className="link-headline">
                            <span className="link-num">{item.num}</span>
                            <span className="link-title">{item.label}</span>
                            {isActive && (
                              <span className="current-badge">CURRENT</span>
                            )}
                          </div>
                          <div className="link-descriptor">
                            <span>{item.desc}</span>
                            <FiArrowUpRight className="link-arrow" />
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Lookbook Bottom Action Ribbon */}
              <div className="spread-bottom-ribbon">
                <div className="ribbon-quote">
                  <span>
                    &ldquo;Engineering intelligent solutions with aesthetics &amp; precision.&rdquo;
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLookbookOpen(false);
                    handleNavClick(
                      { preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>,
                      "contact"
                    );
                  }}
                  className="spread-collaborate-btn"
                >
                  <span>Start A Project Together</span>
                  <FiArrowUpRight className="arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
