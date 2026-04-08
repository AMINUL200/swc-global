import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ArrowRight,
  Play,
  Zap,
  Code2,
  Layers,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Globe,
  TrendingUp,
} from "lucide-react";

/* ─── Slide Data ─── */
const slides = [
  {
    id: 1,
    tag: "Web Development",
    tagIcon: Code2,
    headline: ["We Build", "Digital", "Futures."],
    accentWord: 1, // index of highlighted word
    sub: "From concept to launch — we engineer world-class web experiences that scale with your ambition.",
    cta: { label: "Start a Project", href: "/contact" },
    ghost: { label: "View Our Work", href: "/portfolio" },
    badge: { icon: Star, text: "5.0 rated by 200+ clients" },
    visual: "code",
    accent: "#14B8A6",
    accentBg: "rgba(20,184,166,0.08)",
  },
  {
    id: 2,
    tag: "UI/UX Design",
    tagIcon: Layers,
    headline: ["Design That", "Converts &", "Inspires."],
    accentWord: 0,
    sub: "We craft pixel-perfect interfaces grounded in user psychology, brand strategy, and conversion science.",
    cta: { label: "See Design Work", href: "/services" },
    ghost: { label: "Explore Process", href: "/about" },
    badge: { icon: Users, text: "50M+ users impacted" },
    visual: "design",
    accent: "#3B82F6",
    accentBg: "rgba(59,130,246,0.08)",
  },
  {
    id: 3,
    tag: "Cloud Solutions",
    tagIcon: Globe,
    headline: ["Scale Without", "Limits,", "Globally."],
    accentWord: 2,
    sub: "Enterprise-grade cloud infrastructure built for reliability, security, and blazing-fast performance worldwide.",
    cta: { label: "Explore Cloud", href: "/services" },
    ghost: { label: "Read Case Studies", href: "/blog" },
    badge: { icon: Globe, text: "40+ countries served" },
    visual: "cloud",
    accent: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.08)",
  },
  {
    id: 4,
    tag: "Digital Marketing",
    tagIcon: BarChart3,
    headline: ["Growth That", "Moves the", "Needle."],
    accentWord: 1,
    sub: "Data-driven marketing strategies that turn traffic into revenue and visitors into loyal brand advocates.",
    cta: { label: "Grow With Us", href: "/contact" },
    ghost: { label: "View Results", href: "/blog" },
    badge: { icon: TrendingUp, text: "3× average ROI increase" },
    visual: "marketing",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.08)",
  },
];

/* ─── Decorative Visual Per Slide ─── */
const SlideVisual = ({ type, accent }) => {
  const visuals = {
    code: (
      <div className="hero-visual hero-visual--code">
        <div className="code-window">
          <div className="code-window__bar">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="code-window__title">index.tsx</span>
          </div>
          <div className="code-window__body">
            <div className="code-line">
              <span className="kw">const</span> <span className="fn">App</span>{" "}
              = () =&gt; {"{"}
            </div>
            <div className="code-line pl">
              <span className="kw">return</span> (
            </div>
            <div className="code-line pl2">
              <span className="tag">&lt;Hero</span>
            </div>
            <div className="code-line pl3">
              <span className="attr">title</span>=
              <span className="str">"Digital Future"</span>
            </div>
            <div className="code-line pl3">
              <span className="attr">animate</span>=
              <span className="bool">{"{true}"}</span>
            </div>
            <div className="code-line pl2">
              <span className="tag">/&gt;</span>
            </div>
            <div className="code-line pl">)</div>
            <div className="code-line">{"}"}</div>
            <div className="code-cursor" style={{ "--accent": accent }} />
          </div>
        </div>
        <div
          className="floating-chip floating-chip--1"
          style={{ "--accent": accent }}
        >
          <Zap size={12} /> TypeScript
        </div>
        <div
          className="floating-chip floating-chip--2"
          style={{ "--accent": accent }}
        >
          <Star size={12} /> React 18
        </div>
      </div>
    ),
    design: (
      <div className="hero-visual hero-visual--design">
        <div className="design-frame">
          <div className="design-frame__header">
            <div className="design-frame__dot" />
            <div className="design-frame__dot" />
            <div className="design-frame__dot" />
          </div>
          <div className="design-mock">
            <div className="mock-nav" style={{ "--accent": accent }} />
            <div className="mock-hero-bar" style={{ "--accent": accent }} />
            <div className="mock-cards">
              <div className="mock-card" style={{ "--accent": accent }} />
              <div
                className="mock-card mock-card--accent"
                style={{ "--accent": accent }}
              />
              <div className="mock-card" style={{ "--accent": accent }} />
            </div>
            <div className="mock-text-lines">
              <div className="mock-line" style={{ width: "80%" }} />
              <div className="mock-line" style={{ width: "60%" }} />
              <div className="mock-line" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
        <div
          className="floating-chip floating-chip--1"
          style={{ "--accent": accent }}
        >
          <Layers size={12} /> Figma
        </div>
        <div
          className="floating-chip floating-chip--2"
          style={{ "--accent": accent }}
        >
          <Star size={12} /> Award-Winning
        </div>
      </div>
    ),
    cloud: (
      <div className="hero-visual hero-visual--cloud">
        <div className="cloud-diagram">
          <div
            className="cloud-node cloud-node--center"
            style={{ "--accent": accent }}
          >
            <Globe size={22} color={accent} />
            <span>CDN</span>
          </div>
          {["EU", "US", "APAC", "ME"].map((region, i) => (
            <div
              key={region}
              className={`cloud-node cloud-node--${i}`}
              style={{ "--accent": accent }}
            >
              {region}
            </div>
          ))}
          <svg className="cloud-lines" viewBox="0 0 220 220" fill="none">
            {[45, 135, 225, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 110 + 80 * Math.cos(rad);
              const y2 = 110 + 80 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1="110"
                  y1="110"
                  x2={x2}
                  y2={y2}
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  strokeOpacity="0.5"
                />
              );
            })}
          </svg>
        </div>
        <div
          className="floating-chip floating-chip--1"
          style={{ "--accent": accent }}
        >
          <Zap size={12} /> 99.99% Uptime
        </div>
        <div
          className="floating-chip floating-chip--2"
          style={{ "--accent": accent }}
        >
          <Globe size={12} /> Multi-Region
        </div>
      </div>
    ),
    marketing: (
      <div className="hero-visual hero-visual--marketing">
        <div className="chart-card">
          <div className="chart-card__label">Revenue Growth</div>
          <div className="chart-bars">
            {[40, 55, 45, 70, 60, 85, 75, 95, 80, 100].map((h, i) => (
              <div key={i} className="chart-bar-wrap">
                <div
                  className="chart-bar"
                  style={{
                    "--h": `${h}%`,
                    "--accent": accent,
                    "--delay": `${i * 0.06}s`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="chart-badge" style={{ "--accent": accent }}>
            <TrendingUp size={12} /> +247% YoY
          </div>
        </div>
        <div
          className="floating-chip floating-chip--1"
          style={{ "--accent": accent }}
        >
          <BarChart3 size={12} /> SEO
        </div>
        <div
          className="floating-chip floating-chip--2"
          style={{ "--accent": accent }}
        >
          <Star size={12} /> Top 1% ROI
        </div>
      </div>
    ),
  };
  return visuals[type] || null;
};

/* ─── Trusted By Logos ─── */
const trustedLogos = [
  "Acme Corp",
  "NovaTech",
  "Helix Labs",
  "Prisma Co",
  "Vertex Inc",
  "Orbital",
];

/* ─── Hero Section ─── */
const HeroSection = () => {
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef(null);
  const AUTOPLAY_DELAY = 5000;

  const startProgress = () => {
    setProgress(0);
    const start = Date.now();
    clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressTimer.current);
    }, 16);
  };

  useEffect(() => {
    startProgress();
    return () => clearInterval(progressTimer.current);
  }, [activeIdx]);

  const slide = slides[activeIdx];

  return (
    <>
      <style>{`
        /* ── Hero Wrapper ── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          overflow: hidden;
          background: #F0F4FF;
          display: flex;
          flex-direction: column;
        }

        /* ── Swiper override: fill container ── */
        .hero-swiper {
          width: 100%;
          flex: 1;
          min-height: 100svh;
        }
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          height: 100%;
          min-height: 100svh;
        }

        /* ── Slide Layout ── */
        .hero-slide {
          width: 100%;
          min-height: 100svh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 2rem 2rem 5rem;
        }

        /* ── Slide BG ── */
        .hero-slide__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-slide__bg-blob-1 {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.12;
          top: -200px; left: -150px;
          background: radial-gradient(circle, #1E3A8A, transparent 70%);
        }
        .hero-slide__bg-blob-2 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.10;
          bottom: -100px; right: -100px;
        }
        .hero-slide__bg-grid {
          position: absolute;
          inset: 0;
        //   background-image:
        //     linear-gradient(rgba(30,58,138,0.04) 1px, transparent 1px),
        //     linear-gradient(90deg, rgba(30,58,138,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .hero-slide__bg-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(240,244,255,0.8) 100%);
        }

        /* ── Inner ── */
        .hero-slide__inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .hero-slide__inner { grid-template-columns: 1fr; text-align: center; }
          .hero-slide__right { display: none; }
          .hero-actions { justify-content: center; }
          .hero-badge { align-self: center; margin: 0 auto; }
        }

        /* ── Left Content ── */
        .hero-slide__left { display: flex; flex-direction: column; gap: 0; }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          width: fit-content;
          margin-bottom: 1.5rem;
          border: 1px solid;
          animation: fadeSlideUp 0.6s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        .hero-headline {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(2.75rem, 6vw, 5.25rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #111827;
          margin-bottom: 1.75rem;
        }
        .hero-headline__line {
          display: block;
          animation: fadeSlideUp 0.6s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .hero-headline__line:nth-child(1) { animation-delay: 0.1s; }
        .hero-headline__line:nth-child(2) { animation-delay: 0.18s; }
        .hero-headline__line:nth-child(3) { animation-delay: 0.26s; }
        .hero-headline__accent {
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #14B8A6 100%);
        }

        .hero-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          color: #6B7280;
          line-height: 1.75;
          max-width: 500px;
          margin-bottom: 2.25rem;
          animation: fadeSlideUp 0.6s 0.32s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        .hero-actions {
          display: flex;
          gap: 0.875rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.6s 0.40s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 1.875rem;
          background: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          color: #fff;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(30,58,138,0.35);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
          letter-spacing: 0.005em;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(30,58,138,0.45);
          filter: brightness(1.07);
        }
        .hero-btn-primary .btn-arrow {
          width: 22px; height: 22px;
          background: rgba(255,255,255,0.2);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease;
        }
        .hero-btn-primary:hover .btn-arrow { transform: translateX(3px); }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 1.5rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          color: #1E3A8A;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 12px;
          border: 1.5px solid rgba(30,58,138,0.18);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.95);
          border-color: rgba(30,58,138,0.35);
          transform: translateY(-2px);
        }
        .hero-btn-ghost .play-ring {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1E3A8A,#14B8A6);
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px 8px 8px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(30,58,138,0.12);
          border-radius: 999px;
          width: fit-content;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8125rem;
          color: #374151;
          animation: fadeSlideUp 0.6s 0.48s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .hero-badge__icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1E3A8A,#14B8A6);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        /* ── Right Visual ── */
        .hero-slide__right {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeSlideRight 0.7s 0.2s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        /* ─── Visual Shared ─── */
        .hero-visual {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        /* ─── Code Visual ─── */
        .code-window {
          background: #0F172A;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(15,23,42,0.4), 0 0 0 1px rgba(255,255,255,0.06);
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.8125rem;
        }
        .code-window__bar {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px;
          background: #1E293B;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot--red { background: #FF5F57; }
        .dot--yellow { background: #FEBC2E; }
        .dot--green { background: #28C840; }
        .code-window__title { margin-left: auto; font-size: 0.75rem; color: #64748B; font-family: 'DM Sans', sans-serif; }
        .code-window__body { padding: 1.25rem 1.5rem; line-height: 2; }
        .code-line { white-space: pre; color: #94A3B8; }
        .code-line.pl { padding-left: 1.5rem; }
        .code-line.pl2 { padding-left: 3rem; }
        .code-line.pl3 { padding-left: 4.5rem; }
        .kw { color: #C084FC; }
        .fn { color: #60A5FA; }
        .tag { color: #34D399; }
        .attr { color: #F9A8D4; }
        .str { color: #FCD34D; }
        .bool { color: #FB923C; }
        .code-cursor {
          display: inline-block;
          width: 9px; height: 18px;
          background: var(--accent, #14B8A6);
          border-radius: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* ─── Design Visual ─── */
        .design-frame {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(30,58,138,0.15), 0 0 0 1px rgba(30,58,138,0.06);
          overflow: hidden;
        }
        .design-frame__header {
          display: flex; gap: 6px; align-items: center;
          padding: 10px 14px;
          background: #F8FAFC;
          border-bottom: 1px solid rgba(30,58,138,0.08);
        }
        .design-frame__dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(30,58,138,0.15); }
        .design-mock { padding: 1rem; display: flex; flex-direction: column; gap: 10px; }
        .mock-nav { height: 10px; border-radius: 6px; background: var(--accent, #3B82F6); opacity: 0.8; }
        .mock-hero-bar { height: 56px; border-radius: 10px; background: linear-gradient(135deg, rgba(30,58,138,0.12), rgba(20,184,166,0.12)); }
        .mock-cards { display: flex; gap: 6px; }
        .mock-card { flex: 1; height: 44px; border-radius: 8px; background: rgba(30,58,138,0.06); }
        .mock-card--accent { background: var(--accent, #3B82F6); opacity: 0.85; }
        .mock-text-lines { display: flex; flex-direction: column; gap: 5px; }
        .mock-line { height: 7px; border-radius: 4px; background: rgba(30,58,138,0.10); }

        /* ─── Cloud Visual ─── */
        .cloud-diagram {
          position: relative;
          width: 220px; height: 220px;
          margin: 0 auto;
        }
        .cloud-lines { position: absolute; inset: 0; z-index: 0; }
        .cloud-node {
          position: absolute;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 2px solid var(--accent, #8B5CF6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif; font-size: 0.65rem; font-weight: 700;
          color: var(--accent, #8B5CF6);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          z-index: 2;
          flex-direction: column; gap: 2px;
        }
        .cloud-node--center {
          width: 68px; height: 68px;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          font-size: 0.6rem;
          background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(20,184,166,0.12));
        }
        .cloud-node--0 { top: 6px; left: 6px; }
        .cloud-node--1 { top: 6px; right: 6px; }
        .cloud-node--2 { bottom: 6px; left: 6px; }
        .cloud-node--3 { bottom: 6px; right: 6px; }

        /* ─── Marketing Visual ─── */
        .chart-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 50px rgba(30,58,138,0.12), 0 0 0 1px rgba(30,58,138,0.06);
          position: relative;
        }
        .chart-card__label {
          font-family: 'Sora', sans-serif;
          font-size: 0.8125rem; font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 100px;
        }
        .chart-bar-wrap { flex: 1; height: 100%; display: flex; align-items: flex-end; }
        .chart-bar {
          width: 100%;
          height: var(--h);
          background: linear-gradient(to top, var(--accent, #F59E0B), rgba(245,158,11,0.4));
          border-radius: 4px 4px 2px 2px;
          animation: barGrow 0.8s var(--delay, 0s) cubic-bezier(0.34,1.2,0.64,1) both;
        }
        @keyframes barGrow {
          from { height: 0; }
          to   { height: var(--h); }
        }
        .chart-badge {
          display: inline-flex; align-items: center; gap: 5px;
          margin-top: 0.875rem;
          padding: 5px 12px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--accent, #F59E0B) 12%, transparent);
          color: var(--accent, #F59E0B);
          font-family: 'Sora', sans-serif; font-size: 0.75rem; font-weight: 700;
          border: 1px solid color-mix(in srgb, var(--accent, #F59E0B) 25%, transparent);
        }

        /* ─── Floating Chips ─── */
        .floating-chip {
          position: absolute;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(30,58,138,0.10);
          border-radius: 999px;
          font-family: 'Sora', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          color: var(--accent);
          box-shadow: 0 4px 16px rgba(30,58,138,0.10);
          white-space: nowrap;
          animation: floatChip 3s ease-in-out infinite;
        }
        .floating-chip--1 {
          top: -16px; right: 10px;
          animation-delay: 0s;
        }
        .floating-chip--2 {
          bottom: -16px; left: 10px;
          animation-delay: 1.5s;
        }
        @keyframes floatChip {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }

        /* ─── Custom Pagination ─── */
        .hero-controls {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-nav-btn {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(30,58,138,0.14);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #1E3A8A;
          transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .hero-nav-btn:hover {
          background: #1E3A8A;
          color: #fff;
          border-color: transparent;
          transform: scale(1.08);
        }
        .hero-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-dot {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
          border: none;
          background: none;
          padding: 0;
        }
        .hero-dot__bar {
          height: 4px;
          border-radius: 999px;
          background: rgba(30,58,138,0.2);
          transition: width 0.3s ease, background 0.3s ease;
          width: 20px;
          overflow: hidden;
          position: relative;
        }
        .hero-dot--active .hero-dot__bar {
          width: 48px;
          background: rgba(30,58,138,0.2);
        }
        .hero-dot__fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: linear-gradient(90deg,#1E3A8A,#14B8A6);
          border-radius: 999px;
          width: 0%;
          transition: none;
        }
        .hero-dot--active .hero-dot__fill {
          width: var(--progress, 0%);
          transition: none;
        }

        /* ── Trusted By ── */
        .hero-trusted {
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(30,58,138,0.08);
          padding: 1.25rem 2rem;
          position: relative;
          z-index: 10;
        }
        .hero-trusted__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .hero-trusted__label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: #9CA3AF;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-trusted__divider {
          width: 1px; height: 20px;
          background: rgba(30,58,138,0.12);
          flex-shrink: 0;
        }
        .hero-trusted__logos {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .hero-trusted__logo {
          padding: 5px 14px;
          background: rgba(30,58,138,0.05);
          border: 1px solid rgba(30,58,138,0.08);
          border-radius: 8px;
          font-family: 'Sora', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #6B7280;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          cursor: default;
        }
        .hero-trusted__logo:hover {
          background: rgba(30,58,138,0.09);
          color: #1E3A8A;
          border-color: rgba(30,58,138,0.18);
        }

        /* ─── Keyframes ─── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ─── Swiper Pagination Hide (we use custom) ─── */
        .hero-swiper .swiper-pagination { display: none; }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev { display: none; }
      `}</style>

      <section className="hero-section">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          loop
          speed={800}
          onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
          className="hero-swiper"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="hero-slide">
                {/* BG */}
                <div className="hero-slide__bg">
                  <div className="hero-slide__bg-blob-1" />
                  <div
                    className="hero-slide__bg-blob-2"
                    style={{
                      background: `radial-gradient(circle, ${s.accent}, transparent 70%)`,
                    }}
                  />
                  <div className="hero-slide__bg-grid" />
                  <div className="hero-slide__bg-grad" />
                </div>

                {/* Content */}
                <div className="hero-slide__inner">
                  <div className="hero-slide__left">
                    {/* Tag */}
                    <span
                      className="hero-tag"
                      style={{
                        color: s.accent,
                        background: s.accentBg,
                        borderColor: `${s.accent}30`,
                      }}
                    >
                      <s.tagIcon size={13} />
                      {s.tag}
                    </span>

                    {/* Headline */}
                    <h1 className="hero-headline">
                      {s.headline.map((word, wi) => (
                        <span key={wi} className="hero-headline__line">
                          {wi === s.accentWord ? (
                            <span className="hero-headline__accent">
                              {word}
                            </span>
                          ) : (
                            word
                          )}
                        </span>
                      ))}
                    </h1>

                    {/* Sub */}
                    <p className="hero-sub">{s.sub}</p>

                    {/* Actions */}
                    <div className="hero-actions">
                     
                      <button className="btn btn-slide-bg">
                         {s.cta.label} <ArrowRight  /> 
                      </button>

                      <button className="btn btn-slide-bg btn-outline">
                        {s.ghost.label}
                      </button>
                    </div>

                    {/* Badge */}
                    <div className="hero-badge">
                      <span className="hero-badge__icon">
                        <s.badge.icon size={13} strokeWidth={2.5} />
                      </span>
                      <span>{s.badge.text}</span>
                    </div>
                  </div>

                  {/* Right Visual */}
                  <div className="hero-slide__right">
                    <SlideVisual type={s.visual} accent={s.accent} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Custom Controls ── */}
        <div className="hero-controls">
          <button
            className="hero-nav-btn"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            aria-label="Previous"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${activeIdx === i ? "hero-dot--active" : ""}`}
                onClick={() => swiperRef.current?.swiper.slideToLoop(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <div className="hero-dot__bar">
                  <div
                    className="hero-dot__fill"
                    style={{
                      "--progress": activeIdx === i ? `${progress}%` : "0%",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          <button
            className="hero-nav-btn"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            aria-label="Next"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
