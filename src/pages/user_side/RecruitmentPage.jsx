import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase, MapPin, Clock, ChevronDown, ChevronUp,
  ArrowRight, Search, Star, Users, TrendingUp, Award,
  CheckCircle2, Zap, Building2, DollarSign, Globe,
  Bell, BookOpen, Target, Layers, Filter, ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const recruitmentSteps = [
  { num: "01", label: "Identifying the Need",      icon: Target,   color: "#14B8A6" },
  { num: "02", label: "Job Analysis & Description", icon: BookOpen, color: "#3B82F6" },
  { num: "03", label: "Sourcing",                   icon: Globe,    color: "#8B5CF6" },
  { num: "04", label: "Screening & Shortlisting",   icon: Filter,   color: "#F59E0B" },
  { num: "05", label: "Evaluation & Selection",     icon: Award,    color: "#EC4899" },
  { num: "06", label: "Offer & Negotiation",        icon: DollarSign, color: "#14B8A6" },
  { num: "07", label: "Onboarding",                 icon: CheckCircle2, color: "#22C55E" },
];

const noticeItems = [
  { id:1,  title: "Senior Software Engineer – Remote UK",           company: "TechNova Ltd",       type: "Full-time",   loc: "Remote, UK",      date: "Posted 2h ago",   urgent: true  },
  { id:2,  title: "Compliance Manager – Skilled Worker Sponsor",    company: "Apex HR Group",      type: "Permanent",   loc: "London, EC2",     date: "Posted 4h ago",   urgent: false },
  { id:3,  title: "Healthcare Support Worker (Tier 2 Visa)",        company: "NHS Partner Trust",  type: "Full-time",   loc: "Birmingham",      date: "Posted 6h ago",   urgent: true  },
  { id:4,  title: "Data Analyst – Fintech Startup",                 company: "Kova Analytics",     type: "Contract",    loc: "Manchester",      date: "Posted 8h ago",   urgent: false },
  { id:5,  title: "HR Business Partner – Global Expansion",         company: "PrimeStaff UK",      type: "Permanent",   loc: "Edinburgh",       date: "Posted 10h ago",  urgent: false },
  { id:6,  title: "Construction Project Manager",                   company: "BuildRight Group",   type: "Full-time",   loc: "Leeds, UK",       date: "Posted 12h ago",  urgent: true  },
  { id:7,  title: "Registered Nurse – ICU (Sponsored)",             company: "CareFirst NHS",      type: "Permanent",   loc: "Bristol",         date: "Posted 14h ago",  urgent: false },
  { id:8,  title: "DevOps Engineer – Cloud Infrastructure",         company: "CloudStack Inc",     type: "Full-time",   loc: "Remote / London", date: "Posted 16h ago",  urgent: false },
  { id:9,  title: "International Recruitment Consultant",           company: "SWC Recruitment",    type: "Permanent",   loc: "London, W1",      date: "Posted 18h ago",  urgent: true  },
  { id:10, title: "Supply Chain Analyst – FMCG",                    company: "Meridian Foods Ltd", type: "Contract",    loc: "Coventry",        date: "Posted 20h ago",  urgent: false },
  { id:11, title: "Legal Counsel – Immigration Law",                company: "Nexus Law Group",    type: "Full-time",   loc: "London, EC4",     date: "Posted 22h ago",  urgent: false },
  { id:12, title: "UX/UI Designer – Enterprise SaaS",               company: "Orbital Digital",    type: "Full-time",   loc: "Remote, UK",      date: "Posted 1d ago",   urgent: false },
];

const featuredJobs = [
  { id:1,  title: "Senior Compliance Officer",        company: "Apex HR Group",     loc: "London",       salary: "£55–70K",  type: "Permanent",  tags: ["Compliance","HR","Legal"],             logo: "AH", accent: "#1E3A8A",  hot: true  },
  { id:2,  title: "Healthcare Recruitment Manager",   company: "NHS Partner Trust",  loc: "Birmingham",  salary: "£45–58K",  type: "Full-time",  tags: ["NHS","Healthcare","Management"],        logo: "NH", accent: "#14B8A6",  hot: false },
  { id:3,  title: "DevOps Engineer",                  company: "CloudStack Inc",     loc: "Remote",      salary: "£65–85K",  type: "Contract",   tags: ["AWS","Docker","Kubernetes"],            logo: "CS", accent: "#3B82F6",  hot: true  },
  { id:4,  title: "International HR Consultant",      company: "SWC Recruitment",    loc: "London",      salary: "£50–65K",  type: "Permanent",  tags: ["HRBP","Skilled Workers","Visa"],        logo: "SW", accent: "#8B5CF6",  hot: false },
  { id:5,  title: "Data Scientist – AI & ML",         company: "Kova Analytics",     loc: "Manchester",  salary: "£60–80K",  type: "Full-time",  tags: ["Python","ML","Data"],                  logo: "KA", accent: "#F59E0B",  hot: true  },
  { id:6,  title: "Registered Nurse – Critical Care", company: "CareFirst NHS",      loc: "Bristol",     salary: "£38–48K",  type: "Permanent",  tags: ["Nursing","NHS","Sponsor"],             logo: "CF", accent: "#EC4899",  hot: false },
];

const faqs = [
  { q: "What is the Skilled Workers Cloud Recruitment Platform?", a: "Skilled Workers Cloud is a specialist recruitment platform connecting UK employers who hold or need a sponsor licence with qualified skilled workers globally. We streamline the entire hiring journey — from job posting and candidate sourcing to visa support and onboarding documentation." },
  { q: "How does the recruitment process work?", a: "Our process follows seven key stages: identifying the hiring need, job analysis and description, sourcing candidates through multiple channels, screening and shortlisting, evaluation and selection interviews, offer and negotiation, and finally onboarding. Our platform automates and supports every step." },
  { q: "Can I recruit internationally through this platform?", a: "Yes. We specialise in international recruitment for skilled roles under the UK Skilled Worker visa route. We assist employers in sourcing candidates from a global talent pool and guide both parties through the certificate of sponsorship (CoS) and visa application process." },
  { q: "What industries do you recruit for?", a: "We cover a wide range of sectors including healthcare (NHS and private), technology, construction, finance, logistics, legal, and hospitality. Our specialist consultants understand the specific compliance and skills requirements within each sector." },
  { q: "How much does it cost to post a job?", a: "We offer flexible plans for employers — from free basic job listings to premium featured slots with enhanced visibility, candidate matching, and dedicated consultant support. Visit our pricing page or contact our sales team for a tailored quote." },
  { q: "What support is provided for visa sponsorship?", a: "We provide end-to-end sponsor licence guidance — including initial assessment, application support, right-to-work checks, certificate of sponsorship management, and ongoing compliance monitoring to ensure your organisation stays fully compliant with UKVI regulations." },
  { q: "How long does the recruitment process typically take?", a: "Timelines vary by role and whether sponsorship is required. Domestic hires can be completed in 2–4 weeks. International sponsored hires typically take 8–16 weeks accounting for visa processing. Our platform gives you real-time visibility at every stage to keep things on track." },
];

/* ══════════════════════════════════
   NOTICE BOARD — auto-scroll ticker
══════════════════════════════════ */
const NoticeBoardTicker = () => {
    const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const pauseRef = useRef(false);
  const posRef   = useRef(0);
  const SPEED    = 0.55; // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardH   = 104; // approx card height + gap
    const totalH  = cardH * noticeItems.length;

    const tick = () => {
      if (!pauseRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalH) posRef.current = 0;
        track.style.transform = `translateY(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="rp-notice-board">
      {/* Header */}
      <div className="rp-notice-board__header">
        <div className="rp-notice-board__header-left">
          <div className="rp-notice-board__icon">
            <Bell size={16} color="#14B8A6" />
          </div>
          <div>
            <span className="rp-notice-board__title">Recruitment Notice Board</span>
            <span className="rp-notice-board__sub">Live opportunities • Updated hourly</span>
          </div>
        </div>
        <span className="rp-notice-board__live">
          <span className="rp-notice-board__live-dot" />
          LIVE
        </span>
      </div>

      {/* Ticker window */}
      <div
        className="rp-notice-board__window"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        <div ref={trackRef} className="rp-notice-board__track">
          {/* Double the items so the loop is seamless */}
          {[...noticeItems, ...noticeItems].map((item, i) => (
            <div key={`${item.id}-${i}`} className={`rp-notice-card ${item.urgent ? "rp-notice-card--urgent" : ""}`}
            onClick={() => navigate(`/recruitment/${item.id}`)}
            >
              <div className="rp-notice-card__top">
                <span className="rp-notice-card__type">{item.type}</span>
                {item.urgent && <span className="rp-notice-card__urgent-badge">🔥 Urgent</span>}
                <span className="rp-notice-card__date">{item.date}</span>
              </div>
              <h4 className="rp-notice-card__title">{item.title}</h4>
              <div className="rp-notice-card__meta">
                <span><Building2 size={11} /> {item.company}</span>
                <span><MapPin size={11} /> {item.loc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient masks top/bottom */}
        <div className="rp-notice-board__fade rp-notice-board__fade--top" />
        <div className="rp-notice-board__fade rp-notice-board__fade--bottom" />
      </div>

      <a href="#featured" className="rp-notice-board__cta">
        View All Opportunities <ArrowRight size={13} strokeWidth={2.5} />
      </a>
    </div>
  );
};

/* ══════════════════════════════════
   FAQ ITEM
══════════════════════════════════ */
const FaqItem = ({ faq, idx, open, toggle }) => {
  const bodyRef = useRef(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.maxHeight = open ? el.scrollHeight + "px" : "0px";
  }, [open]);

  return (
    <div className={`rp-faq-item ${open ? "rp-faq-item--open" : ""}`}>
      <button className="rp-faq-item__btn" onClick={() => toggle(idx)}>
        <span className="rp-faq-item__num">0{idx + 1}</span>
        <span className="rp-faq-item__q">{faq.q}</span>
        <span className="rp-faq-item__chevron">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <div ref={bodyRef} className="rp-faq-item__body">
        <p className="rp-faq-item__a">{faq.a}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════
   MAIN PAGE
══════════════════════════════════ */
const RecruitmentPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = (i) => setOpenFaq(prev => (prev === i ? null : i));
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        :root {
          --pb: #1E3A8A;
          --pb-hover: #1d4ed8;
          --sb: #3B82F6;
          --teal: #14B8A6;
          --teal-h: #0d9488;
          --bg: #F0F4FF;
          --bg-s: #F8FAFC;
          --card: #FFFFFF;
          --border: rgba(30,58,138,0.10);
          --txt: #111827;
          --muted: #6B7280;
          --grad: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          --grad-text: linear-gradient(135deg,#1E3A8A,#14B8A6);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', system-ui, sans-serif; }

        .rp-root {
          background: var(--bg);
          color: var(--txt);
          overflow-x: hidden;
        }

        /* ── Gradient text ── */
        .rp-gt {
          background: var(--grad-text);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ════════════════════════════
           HERO
        ════════════════════════════ */
        .rp-hero {
          position: relative;
          background: linear-gradient(145deg, #040d26 0%, #0c1a4a 55%, #083030 100%);
          overflow: hidden;
          padding: 4rem 2rem 5rem;
        }
        .rp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: rp-grid 10s linear infinite;
          pointer-events: none;
        }
        @keyframes rp-grid { to { background-position: 30px 30px; } }

        .rp-hero__blob {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none;
        }
        .rp-hero__blob--1 { width:600px;height:600px;top:-200px;right:-150px;background:radial-gradient(circle,rgba(59,130,246,0.18),transparent 70%); }
        .rp-hero__blob--2 { width:500px;height:500px;bottom:-150px;left:-100px;background:radial-gradient(circle,rgba(20,184,166,0.16),transparent 70%); }
        .rp-hero__blob--3 { width:350px;height:350px;top:35%;left:42%;background:radial-gradient(circle,rgba(30,58,138,0.14),transparent 70%); }

        /* top accent */
        .rp-hero__bar { position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad);z-index:2; }

        .rp-hero__inner {
          position: relative; z-index: 3;
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: start;
        }
        @media (max-width:1023px){
          .rp-hero__inner { grid-template-columns:1fr; }
          .rp-notice-board { margin-top:2rem; }
        }

        /* ── Hero LEFT ── */
        .rp-hero__left { display:flex;flex-direction:column;gap:0; }

        .rp-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 999px;
          background: rgba(20,184,166,0.12);
          border: 1px solid rgba(20,184,166,0.28);
          font-family: 'Sora', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: #14B8A6; margin-bottom: 1.375rem;
          width: fit-content;
          animation: rp-fadeUp 0.7s 0.1s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .rp-hero__eyebrow-dot {
          width:6px;height:6px;border-radius:50%;background:#14B8A6;
          animation: rp-blink 2s ease-in-out infinite;
        }
        @keyframes rp-blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.6)} }

        .rp-hero__headline {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 0.375rem;
          animation: rp-fadeUp 0.7s 0.18s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .rp-hero__headline-sub {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700; letter-spacing: -0.03em;
          margin-bottom: 0.5rem;
          animation: rp-fadeUp 0.7s 0.26s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .rp-hero__tagline {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1rem, 2vw, 1.375rem);
          font-weight: 600; color: rgba(255,255,255,0.55);
          letter-spacing: -0.01em;
          margin-bottom: 1.875rem;
          animation: rp-fadeUp 0.7s 0.33s cubic-bezier(0.34,1.2,0.64,1) both;
        }

        .rp-hero__intro {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.8;
          margin-bottom: 1.875rem;
          animation: rp-fadeUp 0.7s 0.4s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .rp-hero__intro--2 {
          font-size: 0.875rem;
          margin-bottom: 2rem;
          animation-delay: 0.47s;
        }

        /* ── Process Steps ── */
        .rp-steps-label {
          font-family: 'Sora', sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.875rem;
          animation: rp-fadeUp 0.7s 0.52s both;
        }
        .rp-steps-grid {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-bottom: 2rem;
          animation: rp-fadeUp 0.7s 0.58s both;
        }
        .rp-step-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          font-family: 'Sora', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          color: rgba(255,255,255,0.70);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .rp-step-chip:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-2px);
        }
        .rp-step-chip__num {
          font-size: 0.6rem; font-weight: 800;
          opacity: 0.45; letter-spacing: 0.05em;
        }

        /* ── Hero CTAs ── */
        .rp-hero__actions {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
          animation: rp-fadeUp 0.7s 0.64s both;
        }
        .rp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.875rem 1.875rem;
          background: var(--grad);
          color: #fff;
          font-family: 'Sora', sans-serif; font-size: 0.9rem; font-weight: 700;
          border-radius: 12px; border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 20px rgba(30,58,138,0.40);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
          letter-spacing: 0.005em;
        }
        .rp-btn-primary:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(30,58,138,0.50); filter:brightness(1.07); }
        .rp-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
        //   padding: 0.875rem 1.5rem;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          font-family: 'Sora', sans-serif; font-size: 0.9rem; font-weight: 600;
          border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.18);
          cursor: pointer; text-decoration: none; backdrop-filter: blur(8px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .rp-btn-ghost:hover { background:rgba(255,255,255,0.15); transform:translateY(-2px); }

        /* ── Hero stats row ── */
        .rp-hero__stats {
          display: flex; gap: 2rem; flex-wrap: wrap;
          margin-top: 2.5rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          animation: rp-fadeUp 0.7s 0.70s both;
        }
        .rp-hero__stat-val {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem; font-weight: 800; letter-spacing: -0.04em;
          background: var(--grad-text);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .rp-hero__stat-lbl {
          font-size: 0.75rem; color: rgba(255,255,255,0.40);
          margin-top: 3px;
        }

        @keyframes rp-fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ════════════════════════════
           NOTICE BOARD
        ════════════════════════════ */
        .rp-notice-board {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 20px;
          overflow: hidden;
          display: flex; flex-direction: column;
          animation: rp-fadeUp 0.7s 0.3s both;
        }

        .rp-notice-board__header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .rp-notice-board__header-left { display:flex;align-items:center;gap:10px; }
        .rp-notice-board__icon {
          width:34px;height:34px;border-radius:9px;
          background: rgba(20,184,166,0.15);
          border: 1px solid rgba(20,184,166,0.28);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
        }
        .rp-notice-board__title {
          display:block;
          font-family:'Sora',sans-serif;font-size:0.8125rem;font-weight:700;
          color:#fff;line-height:1.2;
        }
        .rp-notice-board__sub {
          display:block;
          font-size:0.68rem;color:rgba(255,255,255,0.38);
          margin-top:2px;
        }
        .rp-notice-board__live {
          display:inline-flex;align-items:center;gap:5px;
          padding:3px 9px;border-radius:999px;
          background:rgba(20,184,166,0.15);
          border:1px solid rgba(20,184,166,0.30);
          font-family:'Sora',sans-serif;font-size:0.62rem;font-weight:800;
          letter-spacing:0.08em;color:#14B8A6;
        }
        .rp-notice-board__live-dot {
          width:6px;height:6px;border-radius:50%;background:#14B8A6;
          animation:rp-blink 1.4s ease-in-out infinite;
        }

        .rp-notice-board__window {
          position:relative;
          height:440px;
          overflow:hidden;
          padding:0.75rem 1rem;
        }
        .rp-notice-board__track {
          display:flex;flex-direction:column;gap:8px;
          will-change:transform;
        }

        .rp-notice-board__fade {
          position:absolute;left:0;right:0;height:64px;pointer-events:none;z-index:5;
        }
        .rp-notice-board__fade--top {
          top:0;
          background:linear-gradient(to bottom, rgba(12,26,74,0.95), transparent);
        }
        .rp-notice-board__fade--bottom {
          bottom:0;
          background:linear-gradient(to top, rgba(12,26,74,0.95), transparent);
        }

        .rp-notice-board__cta {
          display:inline-flex;align-items:center;justify-content:center;gap:7px;
          margin:0.75rem 1rem 1rem;
          padding:0.7rem;
          border-radius:11px;
          border:1.5px solid rgba(20,184,166,0.28);
          background:rgba(20,184,166,0.08);
          color:#14B8A6;
          font-family:'Sora',sans-serif;font-size:0.8rem;font-weight:700;
          text-decoration:none;
          transition:background 0.2s ease,transform 0.2s ease;
        }
        .rp-notice-board__cta:hover { background:rgba(20,184,166,0.15);transform:translateY(-2px); }

        /* ── Notice Cards ── */
        .rp-notice-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          flex-shrink:0;
          transition: background 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .rp-notice-card:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(20,184,166,0.30);
        }
        .rp-notice-card--urgent { border-left: 3px solid #14B8A6; }

        .rp-notice-card__top {
          display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;
        }
        .rp-notice-card__type {
          font-family:'Sora',sans-serif;font-size:0.62rem;font-weight:700;
          letter-spacing:0.06em;text-transform:uppercase;
          padding:2px 8px;border-radius:999px;
          background:rgba(59,130,246,0.15);color:#60A5FA;
        }
        .rp-notice-card__urgent-badge {
          font-size:0.62rem;font-weight:700;color:#14B8A6;
          font-family:'Sora',sans-serif;
        }
        .rp-notice-card__date {
          margin-left:auto;font-size:0.65rem;color:rgba(255,255,255,0.35);
          font-family:'DM Sans',sans-serif;
        }
        .rp-notice-card__title {
          font-family:'Sora',sans-serif;font-size:0.8125rem;font-weight:700;
          color:rgba(255,255,255,0.88);line-height:1.3;margin-bottom:7px;
        }
        .rp-notice-card__meta {
          display:flex;align-items:center;gap:12px;flex-wrap:wrap;
        }
        .rp-notice-card__meta span {
          display:inline-flex;align-items:center;gap:4px;
          font-size:0.7rem;color:rgba(255,255,255,0.38);
          font-family:'DM Sans',sans-serif;
        }

        /* ════════════════════════════
           FEATURED JOBS
        ════════════════════════════ */
        .rp-jobs-section {
          padding: 7rem 2rem;
          background: var(--bg-s);
          position: relative;
          overflow: hidden;
        }
        .rp-jobs-section::before {
          content:'';position:absolute;top:-160px;right:-160px;
          width:600px;height:600px;border-radius:50%;
          background:radial-gradient(circle,rgba(30,58,138,0.06),transparent 70%);
          filter:blur(60px);pointer-events:none;
        }
        .rp-section-inner { max-width:1280px;margin:0 auto;position:relative;z-index:1; }

        .rp-section-header {
          display:flex;align-items:flex-end;justify-content:space-between;
          gap:2rem;margin-bottom:3.5rem;flex-wrap:wrap;
        }
        .rp-section-eyebrow {
          display:inline-flex;align-items:center;gap:8px;
          padding:5px 14px;border-radius:999px;
          background:rgba(30,58,138,0.07);border:1px solid rgba(30,58,138,0.14);
          font-family:'Sora',sans-serif;font-size:0.7rem;font-weight:700;
          letter-spacing:0.09em;text-transform:uppercase;color:var(--pb);
          margin-bottom:1.125rem;
        }
        .rp-section-eyebrow__dot {
          width:6px;height:6px;border-radius:50%;
          background:linear-gradient(135deg,var(--pb),var(--teal));
          animation:rp-blink 2.2s ease-in-out infinite;
        }
        .rp-section-headline {
          font-family:'Sora',sans-serif;
          font-size:clamp(1.875rem,3.5vw,2.75rem);
          font-weight:800;letter-spacing:-0.035em;
          color:var(--txt);line-height:1.1;margin-bottom:0.75rem;
        }
        .rp-section-sub {
          font-family:'DM Sans',sans-serif;
          font-size:1rem;color:var(--muted);line-height:1.75;
        }
        .rp-section-cta {
          display:inline-flex;align-items:center;gap:8px;
        //   padding:0.8rem 1.75rem;
          background:var(--grad);color:#fff;
          font-family:'Sora',sans-serif;font-size:0.875rem;font-weight:700;
          border-radius:12px;border:none;cursor:pointer;text-decoration:none;
          box-shadow:0 4px 18px rgba(30,58,138,0.28);
          transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.2s ease,filter 0.2s ease;
          white-space:nowrap;flex-shrink:0;
        }
        .rp-section-cta:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(30,58,138,0.40);filter:brightness(1.06); }

        /* Search bar */
        .rp-search-bar {
          display:flex;align-items:center;gap:1rem;
          padding:0.875rem 1.5rem;
          background:#fff;border:1px solid var(--border);
          border-radius:14px;box-shadow:0 2px 12px rgba(30,58,138,0.06);
          margin-bottom:2.5rem;
          flex-wrap:wrap;
        }
        .rp-search-bar__icon { color:var(--muted);flex-shrink:0; }
        .rp-search-bar input {
          flex:1;border:none;outline:none;background:transparent;
          font-family:'DM Sans',sans-serif;font-size:0.9375rem;color:var(--txt);
          min-width:120px;
        }
        .rp-search-bar input::placeholder { color:var(--muted); }
        .rp-search-btn {
          display:inline-flex;align-items:center;gap:7px;
          padding:0.6rem 1.375rem;
          background:var(--grad);color:#fff;
          font-family:'Sora',sans-serif;font-size:0.8125rem;font-weight:700;
          border-radius:10px;border:none;cursor:pointer;
          transition:filter 0.2s ease,transform 0.2s ease;
          white-space:nowrap;
        }
        .rp-search-btn:hover { filter:brightness(1.08);transform:translateY(-1px); }

        /* Jobs grid */
        .rp-jobs-grid {
          display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;
          margin-bottom:3rem;
        }
        @media (max-width:1100px){ .rp-jobs-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:640px) { .rp-jobs-grid { grid-template-columns:1fr; } }

        .rp-job-card {
          background:var(--card);
          border:1px solid var(--border);
          border-radius:18px;padding:1.625rem;
          display:flex;flex-direction:column;gap:0;
          position:relative;overflow:hidden;
          transition:transform 0.25s ease,box-shadow 0.25s ease,border-color 0.25s ease;
          cursor:pointer;
        }
        .rp-job-card:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 48px rgba(30,58,138,0.12);
          border-color:rgba(30,58,138,0.18);
        }
        .rp-job-card__bar {
          position:absolute;top:0;left:0;right:0;height:3px;
          border-radius:18px 18px 0 0;opacity:0;
          transition:opacity 0.25s ease;
        }
        .rp-job-card:hover .rp-job-card__bar { opacity:1; }
        .rp-job-card__hot {
          position:absolute;top:14px;right:14px;
          display:inline-flex;align-items:center;gap:4px;
          padding:3px 9px;border-radius:999px;
          background:rgba(245,158,11,0.10);
          border:1px solid rgba(245,158,11,0.25);
          font-family:'Sora',sans-serif;font-size:0.62rem;font-weight:800;
          color:#D97706;
        }

        .rp-job-card__top { display:flex;align-items:center;gap:12px;margin-bottom:1rem; }
        .rp-job-card__logo {
          width:44px;height:44px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          font-family:'Sora',sans-serif;font-size:0.875rem;font-weight:800;
          color:#fff;flex-shrink:0;
        }
        .rp-job-card__company {
          font-family:'DM Sans',sans-serif;font-size:0.8rem;color:var(--muted);margin-bottom:2px;
        }
        .rp-job-card__title {
          font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;
          color:var(--txt);line-height:1.25;margin-bottom:0.75rem;
          letter-spacing:-0.01em;
        }
        .rp-job-card__meta {
          display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;
        }
        .rp-job-card__meta span {
          display:inline-flex;align-items:center;gap:5px;
          font-size:0.78rem;color:var(--muted);font-family:'DM Sans',sans-serif;
        }
        .rp-job-card__tags { display:flex;flex-wrap:wrap;gap:0.375rem;margin-bottom:1.125rem; }
        .rp-job-card__tag {
          padding:3px 10px;border-radius:999px;
          font-family:'Sora',sans-serif;font-size:0.65rem;font-weight:700;
          background:rgba(30,58,138,0.06);color:var(--pb);
          border:1px solid rgba(30,58,138,0.10);
        }
        .rp-job-card__footer {
          display:flex;align-items:center;justify-content:space-between;
          padding-top:0.875rem;border-top:1px solid var(--border);margin-top:auto;
        }
        .rp-job-card__salary {
          font-family:'Sora',sans-serif;font-size:0.875rem;font-weight:800;
          background:var(--grad-text);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .rp-job-card__apply {
          display:inline-flex;align-items:center;gap:5px;
          padding:6px 14px;border-radius:8px;
          background:rgba(30,58,138,0.07);border:1px solid rgba(30,58,138,0.12);
          font-family:'Sora',sans-serif;font-size:0.75rem;font-weight:700;
          color:var(--pb);cursor:pointer;text-decoration:none;
          transition:background 0.2s ease,border-color 0.2s ease,transform 0.2s ease;
        }
        .rp-job-card__apply:hover { background:var(--pb);color:#fff;border-color:transparent;transform:scale(1.03); }

        /* ════════════════════════════
           FAQ
        ════════════════════════════ */
        .rp-faq-section {
          padding:7rem 2rem 8rem;
          background:var(--bg);
          position:relative;overflow:hidden;
        }
        .rp-faq-section::after {
          content:'';position:absolute;bottom:-120px;right:-120px;
          width:500px;height:500px;border-radius:50%;
          background:radial-gradient(circle,rgba(20,184,166,0.07),transparent 70%);
          filter:blur(50px);pointer-events:none;
        }

        .rp-faq-grid {
          display:grid;grid-template-columns:0.9fr 1.1fr;gap:4rem;align-items:start;
        }
        @media (max-width:900px){ .rp-faq-grid { grid-template-columns:1fr; } }

        .rp-faq-left-sticky { position:sticky;top:7rem; }
        .rp-faq-deco-card {
          margin-top:2.5rem;
          padding:1.5rem;
          background:#fff;border:1px solid var(--border);
          border-radius:18px;box-shadow:0 4px 20px rgba(30,58,138,0.06);
        }
        .rp-faq-deco-card__label {
          font-family:'Sora',sans-serif;font-size:0.68rem;font-weight:700;
          letter-spacing:0.08em;text-transform:uppercase;color:var(--teal);
          margin-bottom:0.875rem;
        }
        .rp-faq-deco-stat {
          display:flex;align-items:center;gap:12px;
          padding:0.75rem 0;border-top:1px solid var(--border);
        }
        .rp-faq-deco-stat:first-of-type { border-top:none;padding-top:0; }
        .rp-faq-deco-stat__icon {
          width:32px;height:32px;border-radius:9px;
          background:linear-gradient(135deg,rgba(30,58,138,0.08),rgba(20,184,166,0.08));
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
          color:var(--pb);
        }
        .rp-faq-deco-stat__val {
          font-family:'Sora',sans-serif;font-size:1.125rem;font-weight:800;
          letter-spacing:-0.03em;
          background:var(--grad-text);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          line-height:1;
        }
        .rp-faq-deco-stat__lbl {
          font-family:'DM Sans',sans-serif;font-size:0.75rem;color:var(--muted);margin-top:1px;
        }

        /* FAQ Items */
        .rp-faq-list { display:flex;flex-direction:column;gap:0.625rem; }
        .rp-faq-item {
          background:#fff;border:1px solid var(--border);
          border-radius:14px;overflow:hidden;
          transition:border-color 0.2s ease,box-shadow 0.2s ease;
        }
        .rp-faq-item--open {
          border-color:rgba(30,58,138,0.20);
          box-shadow:0 4px 20px rgba(30,58,138,0.07);
        }
        .rp-faq-item__btn {
          width:100%;display:flex;align-items:center;gap:12px;
          padding:1.125rem 1.25rem;
          background:none;border:none;cursor:pointer;text-align:left;
        }
        .rp-faq-item--open .rp-faq-item__btn { padding-bottom:0.875rem; }
        .rp-faq-item__num {
          font-family:'Sora',sans-serif;font-size:0.65rem;font-weight:800;
          color:var(--teal);letter-spacing:0.05em;flex-shrink:0;
          width:22px;
        }
        .rp-faq-item__q {
          flex:1;font-family:'Sora',sans-serif;font-size:0.9rem;font-weight:700;
          color:var(--txt);line-height:1.4;text-align:left;
        }
        .rp-faq-item--open .rp-faq-item__q { color:var(--pb); }
        .rp-faq-item__chevron {
          flex-shrink:0;color:var(--muted);
          transition:color 0.2s ease;
        }
        .rp-faq-item--open .rp-faq-item__chevron { color:var(--pb); }
        .rp-faq-item__body {
          max-height:0;overflow:hidden;
          transition:max-height 0.35s cubic-bezier(0.34,1.2,0.64,1);
        }
        .rp-faq-item__a {
          font-family:'DM Sans',sans-serif;font-size:0.9rem;
          color:var(--muted);line-height:1.8;
          padding:0 1.25rem 1.25rem 3.25rem;
        }

        /* ── Bottom CTA ── */
        .rp-bottom-cta {
          position:relative;overflow:hidden;
          margin-top:5rem;
          border-radius:24px;
          background:linear-gradient(135deg,#040d26 0%,#0c1a4a 60%,#083030 100%);
          padding:3.5rem;
          display:flex;align-items:center;justify-content:space-between;
          gap:2rem;flex-wrap:wrap;
        }
        .rp-bottom-cta::before {
          content:'';position:absolute;
          background-image:radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px);
          background-size:24px 24px;inset:0;pointer-events:none;
        }
        .rp-bottom-cta__blob {
          position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;
        }
        .rp-bottom-cta__heading {
          position:relative;z-index:1;
          font-family:'Sora',sans-serif;font-size:clamp(1.375rem,2.5vw,2rem);
          font-weight:800;letter-spacing:-0.035em;color:#fff;line-height:1.2;
          margin-bottom:0.625rem;
        }
        .rp-bottom-cta__sub {
          position:relative;z-index:1;
          font-family:'DM Sans',sans-serif;font-size:0.9375rem;
          color:rgba(255,255,255,0.50);line-height:1.65;max-width:440px;
        }
        .rp-bottom-cta__actions {
          position:relative;z-index:1;
          display:flex;flex-direction:column;gap:0.75rem;flex-shrink:0;min-width:180px;
        }
      `}</style>

      <div className="rp-root">

        {/* ════════════════════════════
            HERO
        ════════════════════════════ */}
        <section className="rp-hero">
          <div className="rp-hero__bar" />
          <div className="rp-hero__blob rp-hero__blob--1" />
          <div className="rp-hero__blob rp-hero__blob--2" />
          <div className="rp-hero__blob rp-hero__blob--3" />

          <div className="rp-hero__inner">
            {/* ── LEFT ── */}
            <div className="rp-hero__left">
              <span className="rp-hero__eyebrow">
                <span className="rp-hero__eyebrow-dot" />
                Skilled Workers Cloud
              </span>

              <h1 className="rp-hero__headline">Recruitment Platform</h1>
              <h2 className="rp-hero__headline-sub text-white">
                <span className="rp-gt">Connecting Talent</span><br />with Opportunity
              </h2>
              <p className="rp-hero__tagline">Your bridge between skilled professionals &amp; great employers.</p>

              <p className="rp-hero__intro">
                At Skilled Workers Cloud Recruitment platform, we're committed to revolutionizing the way job seekers and employers connect. Whether you're a seasoned professional looking for your next career move or an employer seeking top talent, our platform provides the tools and resources you need to succeed.
              </p>
              <p className="rp-hero__intro rp-hero__intro--2">
                The global labour market is undergoing significant transformations as a result of various local and international influences — regulations, population demographics, technological advancements, workforce mobility, and other factors. As a consequence, employers face growing challenges in securing candidates equipped with the essential skills required for the job.
              </p>

              {/* Process steps chips */}
              

              {/* CTAs */}
              <div className="rp-hero__actions">
                <a href="#featured" className="rp-btn-primary btn-slide-bg">
                  Browse Jobs <ArrowRight size={15} strokeWidth={2.5} />
                </a>
               
              </div>

             
            </div>

            {/* ── RIGHT: Notice Board ── */}
            <NoticeBoardTicker />
          </div>
        </section>

        {/* ════════════════════════════
            FEATURED JOBS
        ════════════════════════════ */}
        <section className="rp-jobs-section" id="featured">
          <div className="rp-section-inner">
            <div className="rp-section-header">
              <div>
                <span className="rp-section-eyebrow">
                  <span className="rp-section-eyebrow__dot" />
                  Featured Opportunities
                </span>
                <h2 className="rp-section-headline">
                  Find Your Next <span className="rp-gt">Career Move</span>
                </h2>
                <p className="rp-section-sub">
                  Handpicked roles from top UK employers. Apply directly through our platform.
                </p>
              </div>
             
            </div>

            {/* Search bar */}
           

            {/* Jobs Grid */}
            <div className="rp-jobs-grid">
              {featuredJobs.map(job => (
                <div key={job.id} className="rp-job-card">
                  {/* Hover top bar */}
                  <div className="rp-job-card__bar" style={{ background: job.accent }} />
                  {/* Hot badge */}
                  {job.hot && <span className="rp-job-card__hot">🔥 Hot Role</span>}
                  {/* Top row */}
                  <div className="rp-job-card__top">
                    <div className="rp-job-card__logo" style={{ background: job.accent }}>
                      {job.logo}
                    </div>
                    <div>
                      <div className="rp-job-card__company">{job.company}</div>
                      <span style={{
                        display:"inline-block",padding:"2px 9px",borderRadius:999,
                        background:`${job.accent}15`,border:`1px solid ${job.accent}30`,
                        fontFamily:"'Sora',sans-serif",fontSize:"0.62rem",fontWeight:700,
                        color:job.accent,
                      }}>{job.type}</span>
                    </div>
                  </div>
                  <h3 className="rp-job-card__title">{job.title}</h3>
                  <div className="rp-job-card__meta">
                    <span><MapPin size={12} /> {job.loc}</span>
                    <span><Clock size={12} /> Full-time</span>
                    <span><Briefcase size={12} /> {job.type}</span>
                  </div>
                  <div className="rp-job-card__tags">
                    {job.tags.map(t => (
                      <span key={t} className="rp-job-card__tag">{t}</span>
                    ))}
                  </div>
                  <div className="rp-job-card__footer">
                    <span className="rp-job-card__salary">{job.salary}</span>
                    <Link to={`/recruitment/${job.id}`} className="rp-job-card__apply">
                      Apply Now <ExternalLink size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View more */}
            <div style={{ textAlign:"center" }}>
              <a href="#all-jobs" className="rp-section-cta btn-slide-bg btn-teal" style={{ display:"inline-flex" }}>
                View All Featured Jobs <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            FAQ
        ════════════════════════════ */}
        <section className="rp-faq-section">
          <div className="rp-section-inner">
            <div className="rp-faq-grid">

              {/* Left sticky */}
              <div className="rp-faq-left-sticky">
                <span className="rp-section-eyebrow">
                  <span className="rp-section-eyebrow__dot" />
                  FAQs
                </span>
                <h2 className="rp-section-headline">
                  Got Questions?<br /><span className="rp-gt">We've Got Answers.</span>
                </h2>
                <p className="rp-section-sub" style={{ marginBottom:"2rem" }}>
                  Everything you need to know about our recruitment platform, the hiring process, and sponsored roles in the UK.
                </p>
                <a href="#contact" className="rp-section-cta" style={{ display:"inline-flex",marginBottom:"2rem" }}>
                  Still have questions? <ArrowRight size={15} strokeWidth={2.5} />
                </a>

                {/* Deco card */}
                <div className="rp-faq-deco-card">
                  <div className="rp-faq-deco-card__label">
                    <Zap size={11} style={{ display:"inline",marginRight:4,verticalAlign:"middle" }} />
                    Platform at a Glance
                  </div>
                  {[
                    { icon:Users,      val:"10K+", lbl:"Registered candidates"   },
                    { icon:Briefcase,  val:"1.2K", lbl:"Live job listings"        },
                    { icon:TrendingUp, val:"98%",  lbl:"Employer satisfaction"    },
                    { icon:Award,      val:"4.9★", lbl:"Average platform rating"  },
                  ].map(s => (
                    <div key={s.lbl} className="rp-faq-deco-stat">
                      <div className="rp-faq-deco-stat__icon"><s.icon size={16} strokeWidth={2} /></div>
                      <div>
                        <div className="rp-faq-deco-stat__val">{s.val}</div>
                        <div className="rp-faq-deco-stat__lbl">{s.lbl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: FAQ list */}
              <div className="rp-faq-list">
                {faqs.map((faq, i) => (
                  <FaqItem
                    key={i} faq={faq} idx={i}
                    open={openFaq === i}
                    toggle={toggleFaq}
                  />
                ))}

                {/* Bottom CTA inside FAQ col */}
                <div className="rp-bottom-cta" style={{ marginTop:"2rem" }}>
                  <div
                    className="rp-bottom-cta__blob"
                    style={{ top:-80,right:80,width:300,height:300,background:"radial-gradient(circle,rgba(20,184,166,0.14),transparent 70%)" }}
                  />
                  <div>
                    <h3 className="rp-bottom-cta__heading">
                      Ready to find your<br /><span className="rp-gt">perfect match?</span>
                    </h3>
                    <p className="rp-bottom-cta__sub">
                      Join thousands of candidates and employers already using Skilled Workers Cloud.
                    </p>
                  </div>
                  <div className="rp-bottom-cta__actions">
                    <a href="#jobs" className="rp-btn-primary" style={{ justifyContent:"center" }}>
                      Browse Jobs <ArrowRight size={14} strokeWidth={2.5} />
                    </a>
                    <a href="#post" className="rp-btn-ghost" style={{ justifyContent:"center" }}>
                      <Building2 size={14} /> Post a Role
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default RecruitmentPage;