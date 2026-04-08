import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  X,
  Send,
  User,
  Building,
  MessageSquare,
  Briefcase,
  HeadphonesIcon,
  Users,
  Shield,
  Star,
  Zap,
  Globe,
  Clock,
  MessageCircle,
  Video,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand tokens ─── */
const C = {
  primaryBlue: "#1E3A8A",
  secondaryBlue: "#3B82F6",
  tealAccent: "#14B8A6",
  tealHover: "#0d9488",
  bgMain: "#F0F4FF",
  bgSection: "#F8FAFC",
  bgCard: "#FFFFFF",
  border: "rgba(30,58,138,0.12)",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  gradientBrand: "linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%)",
};

/* ─── Helpers ─── */
const GText = ({ children }) => (
  <span
    style={{
      background: "linear-gradient(135deg,#1E3A8A,#14B8A6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </span>
);

const Badge = ({ children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "5px 14px",
      borderRadius: 999,
      background: "rgba(20,184,166,0.10)",
      border: "1px solid rgba(20,184,166,0.25)",
      fontFamily: "'Sora',sans-serif",
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.09em",
      textTransform: "uppercase",
      color: "#0d9488",
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#14B8A6",
        display: "inline-block",
        animation: "cp-pulse 2s ease-in-out infinite",
      }}
    />
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   CONTACT HERO VISUAL  — GSAP, fully centred
══════════════════════════════════════════════ */

const channels = [
  {
    icon: Phone,
    label: "Call",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.18)",
    angle: -90,
  },
  {
    icon: Mail,
    label: "Email",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.18)",
    angle: -30,
  },
  {
    icon: MessageCircle,
    label: "Chat",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.18)",
    angle: 30,
  },
  {
    icon: MapPin,
    label: "Visit",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.18)",
    angle: 90,
  },
  {
    icon: Video,
    label: "Video",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.18)",
    angle: 150,
  },
  {
    icon: HeadphonesIcon,
    label: "Help",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.18)",
    angle: 210,
  },
];

const RADIUS = 130; // orbit radius
const SIZE = 340; // canvas size
const CX = SIZE / 2; // 170 — true center
const CY = SIZE / 2; // 170

/* ─── Helper: polar → cartesian ─── */
const polar = (angleDeg, r = RADIUS) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
};

const ContactHeroVisual = () => {
  const wrapRef = useRef(null);
  const centerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const nodeRefs = useRef([]);
  const dotRefs = useRef([]);
  const pulse1Ref = useRef(null);
  const pulse2Ref = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      /* 1 ── Center node entrance */
      tl.fromTo(
        centerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" },
        0,
      );

      /* 2 ── Pulse rings loop */
      [pulse1Ref.current, pulse2Ref.current].forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0.65, opacity: 0.7 },
          {
            scale: 1.85,
            opacity: 0,
            duration: 2.5,
            ease: "power1.out",
            repeat: -1,
            delay: i * 1.25,
          },
        );
      });

      /* 3 ── Rings rotate (infinite, no timeline entry needed) */
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(ring2Ref.current, {
        rotation: 360,
        duration: 45,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(ring3Ref.current, {
        rotation: -360,
        duration: 20,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      /* 4 ── Channel nodes entrance (staggered) */
      tl.fromTo(
        nodeRefs.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(2)",
          stagger: 0.12,
        },
        0.2,
      );

      /* 5 ── Travelling dots (one per line, loops forever) */
      channels.forEach((ch, i) => {
        const { x: x2, y: y2 } = polar(ch.angle);
        gsap.fromTo(
          dotRefs.current[i],
          { motionPathPlugin: null, opacity: 0, attr: { cx: CX, cy: CY } },
          {
            keyframes: [
              { attr: { cx: CX, cy: CY }, opacity: 0, duration: 0 },
              { attr: { cx: CX, cy: CY }, opacity: 0.9, duration: 0.05 },
              { attr: { cx: x2, cy: y2 }, opacity: 0.9, duration: 1.2 },
              { attr: { cx: x2, cy: y2 }, opacity: 0, duration: 0.2 },
            ],
            duration: 3,
            ease: "power1.inOut",
            repeat: -1,
            delay: 0.3 * i,
          },
        );
      });

      /* 6 ── Subtle idle float on node icons */
      nodeRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -5 : 5,
          duration: 2.2 + i * 0.15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .chv-wrap {
          position: relative;
          width: ${SIZE}px;
          height: ${SIZE}px;
          flex-shrink: 0;
          /* ensure sub-elements don't inherit unexpected positioning */
        }
 
        /* ── Center node ── */
        .chv-center {
          position: absolute;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1E3A8A,#14B8A6);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(20,184,166,0.40), 0 0 0 6px rgba(20,184,166,0.12);
          z-index: 25;
          /* centered via left/top + transform, NOT translate(-50%,-50%) to avoid GSAP conflict */
          left: ${CX - 40}px;
          top:  ${CY - 40}px;
        }
 
        /* ── Pulse rings ── */
        .chv-pulse {
          position: absolute;
          width: 90px; height: 90px;
          border-radius: 50%;
          border: 1.5px solid rgba(20,184,166,0.40);
          pointer-events: none;
          z-index: 10;
          left: ${CX - 45}px;
          top:  ${CY - 45}px;
        }
 
        /* ── SVG layers ── */
        .chv-svg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .chv-svg--lines { z-index: 5; }
        .chv-svg--rings { z-index: 4; }
 
        /* ── Channel node ── */
        .chv-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          z-index: 18;
        }
        .chv-node__icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--node-shadow);
          backdrop-filter: blur(10px);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }
        .chv-node__icon:hover { transform: scale(1.12); }
        .chv-node__label {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.6rem; font-weight: 700;
          color: rgba(30,58,138,0.55);
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="chv-wrap" ref={wrapRef}>
        {/* ── Connection lines + travelling dots ── */}
        <svg className="chv-svg chv-svg--lines">
          {channels.map((ch, i) => {
            const { x: x2, y: y2 } = polar(ch.angle);
            return (
              <g key={i}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={x2}
                  y2={y2}
                  stroke={ch.color}
                  strokeWidth="1"
                  strokeOpacity="0.22"
                  strokeDasharray="5 5"
                />
                <circle
                  ref={(el) => (dotRefs.current[i] = el)}
                  r="3"
                  fill={ch.color}
                  cx={CX}
                  cy={CY}
                  opacity="0"
                />
              </g>
            );
          })}
        </svg>

        {/* ── Rotating rings ── */}
        <svg className="chv-svg chv-svg--rings">
          {/* outer two rings — rotate together */}
          <g ref={ring1Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle
              cx={CX}
              cy={CY}
              r="148"
              fill="none"
              stroke="rgba(20,184,166,0.18)"
              strokeWidth="1"
              strokeDasharray="8 6"
            />
          </g>
          <g ref={ring2Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle
              cx={CX}
              cy={CY}
              r="112"
              fill="none"
              stroke="rgba(30,58,138,0.13)"
              strokeWidth="1"
              strokeDasharray="5 8"
            />
          </g>
          {/* inner ring — counter-rotate */}
          <g ref={ring3Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle
              cx={CX}
              cy={CY}
              r="78"
              fill="none"
              stroke="rgba(59,130,246,0.15)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          </g>
        </svg>

        {/* ── Pulse rings (centered via CSS, animated by GSAP) ── */}
        <div ref={pulse1Ref} className="chv-pulse" />
        <div ref={pulse2Ref} className="chv-pulse" style={{ opacity: 0 }} />

        {/* ── Center node ── */}
        <div
          ref={centerRef}
          className="chv-center"
          style={{ opacity: 0, transform: "scale(0)" }}
        >
          <Globe size={32} color="#fff" strokeWidth={1.5} />
        </div>

        {/* ── Channel nodes ── */}
        {channels.map((ch, i) => {
          /* node icon is 48px wide; label ~48px wide
             offset by half (24px) to truly center the icon on the orbit point */
          const { x, y } = polar(ch.angle);
          return (
            <div
              key={i}
              ref={(el) => (nodeRefs.current[i] = el)}
              className="chv-node"
              style={{
                left: x - 24 /* center 48px icon on orbit point */,
                top: y - 24 /* center 48px icon on orbit point */,
                opacity: 0,
              }}
            >
              <div
                className="chv-node__icon"
                style={{
                  background: ch.bg,
                  border: `1.5px solid ${ch.color}35`,
                  "--node-shadow": `0 4px 16px ${ch.color}22`,
                }}
              >
                <ch.icon size={20} color={ch.color} strokeWidth={2} />
              </div>
              <span className="chv-node__label text-white!">{ch.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════
   FLOATING CHIPS  (GSAP float loop)
══════════════════════════════════════════════ */
const FloatingChip = ({ text, Icon, color, style, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", delay },
      );
      gsap.to(ref.current, {
        y: -8,
        duration: 3.2 + delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 14px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(30,58,138,0.10)",
        borderRadius: 999,
        fontFamily: "'Sora',sans-serif",
        fontSize: "0.72rem",
        fontWeight: 700,
        color,
        boxShadow: "0 4px 18px rgba(30,58,138,0.10)",
        whiteSpace: "nowrap",
        zIndex: 20,
        opacity: 0,
        ...style,
      }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {text}
    </div>
  );
};

/* ── Stat Float ── */
const StatFloat = ({ val, label, style, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", delay },
      );
      gsap.to(ref.current, {
        y: -6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: delay + 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        background: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(30,58,138,0.09)",
        borderRadius: 14,
        padding: "12px 16px",
        boxShadow: "0 8px 24px rgba(30,58,138,0.10)",
        zIndex: 20,
        minWidth: 110,
        opacity: 0,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: "1.375rem",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg,#1E3A8A,#14B8A6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        {val}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.72rem",
          color: "#9CA3AF",
          marginTop: 3,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ─── Data ─── */
const quickContacts = [
  {
    icon: Phone,
    label: "Call Support",
    value: "+44 20 1234 5678",
    sub: "Mon–Fri, 9am–6pm GMT",
    cta: "Speak with our HR experts",
    href: "tel:+442012345678",
    accent: C.secondaryBlue,
    bg: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(59,130,246,0.06))",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "hello@swcloud.co.uk",
    sub: "Response within 2 hours",
    cta: "Send queries & documents",
    href: "mailto:hello@swcloud.co.uk",
    accent: C.tealAccent,
    bg: "linear-gradient(135deg,rgba(20,184,166,0.08),rgba(13,148,136,0.04))",
  },
  {
    icon: MapPin,
    label: "Our Office",
    value: "London, EC2A 4NE",
    sub: "United Kingdom",
    cta: "Schedule an in-person visit",
    href: "https://maps.google.com",
    accent: C.primaryBlue,
    bg: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(29,78,216,0.04))",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Fri, 9–6pm",
    sub: "GMT / BST timezone",
    cta: "Book a consultation slot",
    href: "#contact-form",
    accent: "#7C3AED",
    bg: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))",
  },
];

const departments = [
  {
    icon: Briefcase,
    title: "Sales & Demos",
    desc: "Product demonstrations and pricing enquiries",
    email: "sales@swcloud.co.uk",
    phone: "+44 20 1234 5678",
    tag: "Sales",
  },
  {
    icon: HeadphonesIcon,
    title: "Technical Support",
    desc: "Platform assistance and troubleshooting",
    email: "support@swcloud.co.uk",
    phone: "+44 20 1234 5679",
    tag: "Support",
  },
  {
    icon: Users,
    title: "HR Consulting",
    desc: "HR strategy, compliance and implementation",
    email: "consulting@swcloud.co.uk",
    phone: "+44 20 1234 5680",
    tag: "Consulting",
  },
];

const subjects = [
  "Sales & Pricing",
  "Technical Support",
  "HR Consulting",
  "Product Demo",
  "Partnership",
  "General Inquiry",
];

/* ══════════════════════════════════════════════
   SCROLL-FADE WRAPPER
══════════════════════════════════════════════ */
const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════ */
const Toast = ({ msg, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" },
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  const hide = () => {
    gsap.to(ref.current, {
      opacity: 0,
      y: -16,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "linear-gradient(135deg,#0B1437,#111D4A)",
        border: "1px solid rgba(20,184,166,0.35)",
        borderRadius: 14,
        padding: "14px 20px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
        minWidth: 300,
      }}
    >
      <CheckCircle size={17} color={C.tealAccent} />
      <p style={{ margin: 0, fontSize: 13.5, color: "#fff", fontWeight: 500 }}>
        {msg}
      </p>
      <button
        onClick={hide}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.45)",
          marginLeft: "auto",
          padding: 0,
          display: "flex",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════
   HERO LEFT — GSAP entrance
══════════════════════════════════════════════ */
const HeroLeft = () => {
  const wrapRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = wrapRef.current.querySelectorAll(".cp-hero-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ maxWidth: 600 }}>
      {/* Trust bar */}
      <div
        className="cp-hero-item"
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 36,
          flexWrap: "wrap",
          opacity: 0,
        }}
      >
        {[
          { icon: Shield, label: "UK-Based Support" },
          { icon: CheckCircle, label: "GDPR Compliant" },
          { icon: Star, label: "5-Star Rated" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "rgba(255,255,255,0.52)",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <Icon size={13} color={C.tealAccent} />
            {label}
          </div>
        ))}
      </div>

      <div className="cp-hero-item" style={{ marginBottom: 20, opacity: 0 }}>
        <Badge>Contact Us</Badge>
      </div>

      <h1
        className="cp-hero-item"
        style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: "clamp(2.5rem,5vw,4rem)",
          fontWeight: 800,
          lineHeight: 1.07,
          letterSpacing: "-0.04em",
          color: "#fff",
          margin: "0 0 8px",
          opacity: 0,
        }}
      >
        Let's Build Something
      </h1>
      <h1
        className="cp-hero-item"
        style={{
          fontFamily: "'Sora',sans-serif",
          fontSize: "clamp(2.5rem,5vw,4rem)",
          fontWeight: 800,
          lineHeight: 1.07,
          letterSpacing: "-0.04em",
          margin: "0 0 8px",
          opacity: 0,
        }}
      >
        <GText>Great Together.</GText>
      </h1>

      <p
        className="cp-hero-item"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "1.0625rem",
          color: "rgba(255,255,255,0.52)",
          lineHeight: 1.75,
          maxWidth: 460,
          margin: "22px 0 36px",
          opacity: 0,
        }}
      >
        Our UK HR-tech specialists are ready to help. Whether you're looking for
        a demo, need compliance advice, or want to explore the platform — get in
        touch today.
      </p>

      {/* CTAs */}
      <div
        className="cp-hero-item"
        style={{ display: "flex", gap: 12, flexWrap: "wrap", opacity: 0 }}
      >
        <button href="#contact-form" className="cp-btn-teal btn-slide-bg">
          Send a Message <ArrowRight size={15} strokeWidth={2.5} />
        </button>
        <button
          href="tel:+442012345678"
          className="cp-btn-ghost btn-slide-bg btn-outline"
        >
          <Phone size={15} strokeWidth={2.5} /> Call Us Now
        </button>
      </div>

      {/* Response badge */}
      <div
        className="cp-hero-item"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginTop: 28,
          padding: "9px 16px 9px 9px",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 999,
          opacity: 0,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#1E3A8A,#14B8A6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Zap size={13} color="#fff" strokeWidth={2.5} />
        </div>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.70)",
          }}
        >
          Average response time:{" "}
          <strong style={{ color: "#14B8A6" }}>under 2 hours</strong>
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   HERO RIGHT WRAPPER — entrance animation
══════════════════════════════════════════════ */
const HeroRight = () => {
  const wrapRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", delay: 0.2 },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 420,
        height: 420,
        opacity: 0,
        flexShrink: 0,
      }}
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(20,184,166,0.08),transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating chips */}
      <FloatingChip
        text="2hr Response"
        Icon={Clock}
        color="#14B8A6"
        delay={0.9}
        style={{ left: -10, top: 20 }}
      />
      <FloatingChip
        text="GDPR Safe"
        Icon={Shield}
        color="#3B82F6"
        delay={1.1}
        style={{ right: -10, top: 16 }}
      />
      <FloatingChip
        text="UK-Based"
        Icon={MapPin}
        color="#1E3A8A"
        delay={1.3}
        style={{ right: -10, bottom: 60 }}
      />
      <FloatingChip
        text="5★ Rated"
        Icon={Star}
        color="#F59E0B"
        delay={1.5}
        style={{ left: -10, bottom: 56 }}
      />

      {/* Stat floats */}
      <StatFloat
        val="500+"
        label="UK clients"
        delay={0.8}
        style={{ left: -80, top: 100 }}
      />
      <StatFloat
        val="98%"
        label="Satisfaction"
        delay={1.0}
        style={{ right: -80, top: 120 }}
      />

      {/* ── The network visual, centred inside this 420×420 box ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          /* We move by exactly half the visual's SIZE (340/2 = 170) */
          marginTop: -(SIZE / 2),
          marginLeft: -(SIZE / 2),
        }}
      >
        <ContactHeroVisual />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setToast({ msg: "Message sent! We'll reply within 2 hours." });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setToast(null), 5000);
    }, 1600);
  };

  /* Hover helpers using GSAP */
  const hoverIn = (e) =>
    gsap.to(e.currentTarget, {
      y: -5,
      boxShadow: "0 16px 36px rgba(30,58,138,0.12)",
      duration: 0.25,
      ease: "power2.out",
    });
  const hoverOut = (e) =>
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 2px 8px rgba(30,58,138,0.05)",
      duration: 0.2,
      ease: "power2.in",
    });
  const btnIn = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.015,
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  const btnOut = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  const btnTap = (e) =>
    gsap.to(e.currentTarget, { scale: 0.97, duration: 0.08 });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: C.bgMain,
        color: C.textPrimary,
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes cp-pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.65)} }
        @keyframes cp-spin   { to{transform:rotate(360deg)} }
        @keyframes cp-grid   { 0%{background-position:0 0} 100%{background-position:32px 32px} }
        * { box-sizing: border-box; }
        input, textarea, select, button { font-family: inherit; }
        a { text-decoration: none; }

        .cp-btn-teal {
          display: inline-flex; align-items: center; gap: 9px;
        //   padding: 0.875rem 1.875rem;
          background: linear-gradient(135deg,#14B8A6,#0d9488);
          color: #fff; font-family: 'Sora',sans-serif; font-size: 0.9rem; font-weight: 700;
          border-radius: 12px; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(20,184,166,0.38);
          letter-spacing: 0.005em;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
        }
        .cp-btn-teal:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(20,184,166,0.50); filter: brightness(1.07); }

        .cp-btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 0.875rem 1.5rem;
          background: rgba(255,255,255,0.10); color: rgba(255,255,255,0.85);
          font-family: 'Sora',sans-serif; font-size: 0.9rem; font-weight: 600;
          border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.20); cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .cp-btn-ghost:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); }

        .cp-qcard {
          display: block; text-decoration: none;
          background: #fff; border: 1px solid rgba(30,58,138,0.12);
          border-radius: 20px; padding: 1.75rem 1.5rem;
          box-shadow: 0 2px 8px rgba(30,58,138,0.05);
          transition: box-shadow 0.25s ease;
        }
        .cp-feature-input {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          font-size: 14px; outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background: #F0F4FF; color: #111827;
        }
      `}</style>

      {/* ── Toast ── */}
      {toast && <Toast msg={toast.msg} onClose={() => setToast(null)} />}

      {/* ══════════════════
          HERO
      ══════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#040d26 0%,#0c1a4a 55%,#083030 100%)",
          paddingTop: 100,
          paddingBottom: 90,
        }}
      >
        {/* Animated dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "cp-grid 8s linear infinite",
          }}
        />

        {/* Blobs */}
        {[
          {
            style: {
              top: -120,
              right: -80,
              width: 500,
              height: 500,
              background:
                "radial-gradient(circle,rgba(59,130,246,0.18),transparent 70%)",
            },
          },
          {
            style: {
              bottom: -100,
              left: -80,
              width: 440,
              height: 440,
              background:
                "radial-gradient(circle,rgba(20,184,166,0.14),transparent 70%)",
            },
          },
          {
            style: {
              top: "30%",
              left: "40%",
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle,rgba(30,58,138,0.12),transparent 70%)",
            },
          },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              filter: "blur(55px)",
              pointerEvents: "none",
              ...b.style,
            }}
          />
        ))}

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: C.gradientBrand,
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <HeroLeft />
            <HeroRight />
          </div>
        </div>
      </section>

      {/* ══════════════════
          QUICK CONTACT CARDS
      ══════════════════ */}
      <section style={{ padding: "5rem 2rem", background: C.bgSection }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <Badge>Quick Contact</Badge>
            <h2
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "clamp(1.75rem,3.5vw,2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: C.textPrimary,
                margin: "16px 0 12px",
              }}
            >
              Reach us <GText>instantly</GText>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: C.textSecondary,
                maxWidth: 420,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Multiple channels, one mission — to get you the help you need,
              fast.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1.125rem",
            }}
          >
            {quickContacts.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="cp-qcard"
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      marginBottom: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${c.accent}22`,
                      background: c.bg,
                    }}
                  >
                    <c.icon size={21} color={c.accent} strokeWidth={2} />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: c.accent,
                      margin: "0 0 6px",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: C.textPrimary,
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {c.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 12.5,
                      color: C.textSecondary,
                      margin: "0 0 18px",
                      lineHeight: 1.6,
                    }}
                  >
                    {c.sub}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      paddingTop: 14,
                      borderTop: `1px solid ${C.border}`,
                      fontFamily: "'Sora',sans-serif",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: c.accent,
                    }}
                  >
                    {c.cta} <ArrowRight size={11} strokeWidth={2.5} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════
          FORM + DEPARTMENTS
      ══════════════════ */}
      <section
        id="contact-form"
        style={{ padding: "5rem 2rem 6rem", background: C.bgMain }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* ── Form ── */}
            <Reveal>
              <div
                style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
                }}
              >
                {/* Form header */}
                <div
                  style={{
                    padding: "2rem 2rem 1.75rem",
                    background: C.gradientBrand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Sora',sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 6px",
                      }}
                    >
                      Send a Message
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13.5,
                        color: "rgba(255,255,255,0.65)",
                        margin: 0,
                      }}
                    >
                      We'll respond within 2 hours on business days
                    </p>
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Send size={18} color="#fff" />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  style={{ padding: "1.75rem 2rem" }}
                >
                  {/* Name + Email */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      {
                        name: "name",
                        label: "Full Name",
                        icon: User,
                        placeholder: "Jane Smith",
                        type: "text",
                        required: true,
                      },
                      {
                        name: "email",
                        label: "Email Address",
                        icon: Mail,
                        placeholder: "jane@company.co.uk",
                        type: "email",
                        required: true,
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontFamily: "'Sora',sans-serif",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.07em",
                            color: C.primaryBlue,
                            marginBottom: 8,
                          }}
                        >
                          <f.icon size={11} color={C.secondaryBlue} /> {f.label}{" "}
                          {f.required && "*"}
                        </label>
                        <input
                          name={f.name}
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={formData[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                          className="cp-feature-input"
                          style={{
                            border: `1px solid ${focused === f.name ? C.tealAccent : C.border}`,
                            boxShadow:
                              focused === f.name
                                ? "0 0 0 3px rgba(20,184,166,0.12)"
                                : "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone + Company */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      {
                        name: "phone",
                        label: "Phone",
                        icon: Phone,
                        placeholder: "+44 20 1234 5678",
                        type: "tel",
                      },
                      {
                        name: "company",
                        label: "Company",
                        icon: Building,
                        placeholder: "Acme Ltd",
                        type: "text",
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontFamily: "'Sora',sans-serif",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.07em",
                            color: C.primaryBlue,
                            marginBottom: 8,
                          }}
                        >
                          <f.icon size={11} color={C.secondaryBlue} /> {f.label}
                        </label>
                        <input
                          name={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={formData[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                          className="cp-feature-input"
                          style={{
                            border: `1px solid ${focused === f.name ? C.tealAccent : C.border}`,
                            boxShadow:
                              focused === f.name
                                ? "0 0 0 3px rgba(20,184,166,0.12)"
                                : "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Subject pills */}
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Sora',sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: C.primaryBlue,
                        marginBottom: 8,
                      }}
                    >
                      <Briefcase size={11} color={C.secondaryBlue} /> Subject *
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 8,
                      }}
                    >
                      {subjects.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setFormData((p) => ({ ...p, subject: s }))
                          }
                          onMouseEnter={(e) =>
                            gsap.to(e.currentTarget, {
                              scale: 1.03,
                              duration: 0.18,
                              ease: "back.out(2)",
                            })
                          }
                          onMouseLeave={(e) =>
                            gsap.to(e.currentTarget, {
                              scale: 1,
                              duration: 0.15,
                              ease: "power2.in",
                            })
                          }
                          style={{
                            padding: "9px 10px",
                            borderRadius: 9,
                            fontSize: 12.5,
                            fontFamily: "'Sora',sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                            background:
                              formData.subject === s ? C.primaryBlue : C.bgMain,
                            color:
                              formData.subject === s ? "#fff" : C.textSecondary,
                            border: `1px solid ${formData.subject === s ? C.primaryBlue : C.border}`,
                            transition:
                              "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Sora',sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: C.primaryBlue,
                        marginBottom: 8,
                      }}
                    >
                      <MessageSquare size={11} color={C.secondaryBlue} />{" "}
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="cp-feature-input"
                      style={{
                        resize: "none",
                        border: `1px solid ${focused === "message" ? C.tealAccent : C.border}`,
                        boxShadow:
                          focused === "message"
                            ? "0 0 0 3px rgba(20,184,166,0.12)"
                            : "none",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    onMouseEnter={!sending ? btnIn : undefined}
                    onMouseLeave={!sending ? btnOut : undefined}
                    onMouseDown={!sending ? btnTap : undefined}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      borderRadius: 12,
                      border: "none",
                      fontFamily: "'Sora',sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      background: sending ? "#94A3B8" : C.gradientBrand,
                      color: "#fff",
                      cursor: sending ? "not-allowed" : "pointer",
                      boxShadow: sending
                        ? "none"
                        : "0 4px 20px rgba(30,58,138,0.28)",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {sending ? (
                      <>
                        <div
                          style={{
                            width: 15,
                            height: 15,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.35)",
                            borderTopColor: "#fff",
                            animation: "cp-spin 0.7s linear infinite",
                          }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} />
                      </>
                    )}
                  </button>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: C.textSecondary,
                      marginTop: 12,
                    }}
                  >
                    By submitting you agree to our{" "}
                    <a
                      href="#"
                      style={{ color: C.tealAccent, fontWeight: 600 }}
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </Reveal>

            {/* ── Departments ── */}
            <div>
              <Reveal style={{ marginBottom: 28 }}>
                <Badge>Department Contacts</Badge>
                <h3
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "clamp(1.5rem,3vw,2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: C.textPrimary,
                    margin: "16px 0 10px",
                  }}
                >
                  Talk to the <GText>right team</GText>
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: C.textSecondary,
                    lineHeight: 1.7,
                  }}
                >
                  Route your query directly to the specialist who can help most.
                </p>
              </Reveal>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {departments.map((d, i) => (
                  <Reveal key={d.title} delay={i * 0.09}>
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 16,
                        padding: "1.375rem 1.375rem 1.375rem 1.75rem",
                        background: C.bgCard,
                        border: `1px solid ${C.border}`,
                        boxShadow: "0 2px 8px rgba(30,58,138,0.05)",
                      }}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: 3,
                          background: C.gradientBrand,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `1px solid ${C.border}`,
                            background:
                              "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(20,184,166,0.06))",
                          }}
                        >
                          <d.icon
                            size={19}
                            color={C.tealAccent}
                            strokeWidth={2}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 6,
                            }}
                          >
                            <h4
                              style={{
                                fontFamily: "'Sora',sans-serif",
                                fontSize: 15,
                                fontWeight: 700,
                                color: C.textPrimary,
                                margin: 0,
                              }}
                            >
                              {d.title}
                            </h4>
                            <span
                              style={{
                                fontFamily: "'Sora',sans-serif",
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                padding: "2px 8px",
                                borderRadius: 999,
                                background: "rgba(20,184,166,0.10)",
                                border: "1px solid rgba(20,184,166,0.20)",
                                color: "#0d9488",
                              }}
                            >
                              {d.tag}
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: 13,
                              color: C.textSecondary,
                              margin: "0 0 12px",
                              lineHeight: 1.6,
                            }}
                          >
                            {d.desc}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 5,
                            }}
                          >
                            {[
                              {
                                icon: Mail,
                                href: `mailto:${d.email}`,
                                val: d.email,
                              },
                              {
                                icon: Phone,
                                href: `tel:${d.phone.replace(/\s/g, "")}`,
                                val: d.phone,
                              },
                            ].map(({ icon: Icon, href, val }) => (
                              <a
                                key={val}
                                href={href}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 7,
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: C.primaryBlue,
                                }}
                              >
                                <Icon
                                  size={12}
                                  color={C.secondaryBlue}
                                  strokeWidth={2.5}
                                />{" "}
                                {val}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Response guarantee */}
              <Reveal delay={0.35}>
                <div
                  style={{
                    marginTop: 20,
                    background: "linear-gradient(135deg,#0B1437,#111D4A)",
                    border: "1px solid rgba(59,130,246,0.20)",
                    borderRadius: 16,
                    padding: 22,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(20,184,166,0.15)",
                        border: "1px solid rgba(20,184,166,0.28)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Zap size={16} color={C.tealAccent} />
                    </div>
                    <p
                      style={{
                        fontFamily: "'Sora',sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      Response Guarantee
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      { label: "Email support", time: "Within 2 hours" },
                      { label: "Phone support", time: "Immediate" },
                      { label: "Technical issues", time: "Within 4 hours" },
                    ].map(({ label, time }) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 13,
                            color: "rgba(255,255,255,0.50)",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Sora',sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: C.tealAccent,
                          }}
                        >
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
