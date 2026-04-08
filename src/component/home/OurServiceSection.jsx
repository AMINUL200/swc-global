import React, { useEffect, useRef, useState } from "react";
import {
  FileText, ShieldCheck, Users, Briefcase,
  ClipboardList, BarChart3, ArrowRight, CheckCircle2,
  Zap, Star, Globe, Lock, ChevronRight, Play,
  TrendingUp, Shield, Database, Search, Award,
} from "lucide-react";

/* ─── Service Data ─── */
const services = [
  {
    id: 1,
    icon: FileText,
    category: "Records",
    title: "Employee Records Management",
    headline: "Centralised HR files, always audit-ready.",
    desc: "Manage every employee document in one secure, cloud-based hub. From personal details to full employment history — perfectly organised, instantly accessible, and built to pass any audit.",
    features: [
      { label: "Digital HR file storage", detail: "Unlimited secure cloud storage for all staff documents" },
      { label: "Real-time record updates", detail: "Changes sync instantly across your entire organisation" },
      { label: "Audit trail & history", detail: "Every change logged with timestamp and user identity" },
      { label: "Secure document vault", detail: "Bank-grade AES-256 encryption on all files" },
    ],
    accent: "#14B8A6",
    accentLight: "rgba(20,184,166,0.10)",
    accentBorder: "rgba(20,184,166,0.22)",
    tag: "Core",
    visual: "records",
    stat: { val: "10K+", label: "Files managed" },
  },
  {
    id: 2,
    icon: ShieldCheck,
    category: "Compliance",
    title: "UK Legal Compliance",
    headline: "Zero compliance gaps. Total peace of mind.",
    desc: "Stay fully aligned with UK employment law. Our intelligent compliance engine monitors regulatory shifts, flags risks before they become liabilities, and keeps your business protected 24/7.",
    features: [
      { label: "Right to work checks", detail: "Automated verification against Home Office standards" },
      { label: "Visa & permit tracking", detail: "Live expiry dashboard with escalating alert system" },
      { label: "Compliance alerts", detail: "Proactive notifications 90, 60 and 30 days before deadlines" },
      { label: "Legal guidance updates", detail: "Regulations pushed to your dashboard as they change" },
    ],
    accent: "#1E3A8A",
    accentLight: "rgba(30,58,138,0.10)",
    accentBorder: "rgba(30,58,138,0.22)",
    tag: "Most Popular",
    visual: "compliance",
    stat: { val: "100%", label: "Compliance rate" },
  },
  {
    id: 3,
    icon: Briefcase,
    category: "Recruitment",
    title: "Recruitment & Onboarding",
    headline: "Hire the right people, faster.",
    desc: "End-to-end hiring made effortless. From job posting to signed offer letter, every step of the candidate journey is tracked, automated, and optimised for speed and quality.",
    features: [
      { label: "Candidate pipeline", detail: "Visual kanban board for every active role" },
      { label: "Skill & role matching", detail: "AI-powered candidate scoring against your job criteria" },
      { label: "Offer letter templates", detail: "Legally reviewed templates with one-click generation" },
      { label: "Digital onboarding flow", detail: "Paperless onboarding completed before day one" },
    ],
    accent: "#3B82F6",
    accentLight: "rgba(59,130,246,0.10)",
    accentBorder: "rgba(59,130,246,0.22)",
    tag: "Popular",
    visual: "recruitment",
    stat: { val: "3×", label: "Faster time-to-hire" },
  },
  {
    id: 4,
    icon: ClipboardList,
    category: "HR Prep",
    title: "HR File Preparation",
    headline: "Expert-built HR files, zero gaps.",
    desc: "Let our specialist team build and maintain your entire workforce documentation suite. Contracts, policies, handbooks — structured, compliant, and ready for any inspection.",
    features: [
      { label: "Contract preparation", detail: "Bespoke employment contracts drafted by HR specialists" },
      { label: "Policy documentation", detail: "Full policy library aligned to current UK legislation" },
      { label: "Staff handbook setup", detail: "Custom handbooks tailored to your culture and rules" },
      { label: "File audit support", detail: "We attend and support during UKVI and HR audits" },
    ],
    accent: "#8B5CF6",
    accentLight: "rgba(139,92,246,0.10)",
    accentBorder: "rgba(139,92,246,0.22)",
    tag: "Expert",
    visual: "hrprep",
    stat: { val: "500+", label: "Files prepared" },
  },
  {
    id: 5,
    icon: Users,
    category: "Skilled Workers",
    title: "Skilled Worker Management",
    headline: "Purpose-built for UK sponsor licence holders.",
    desc: "Manage every visa, certificate, and CoS in one intelligent workspace. Smart alerts ensure nothing ever lapses — protecting your sponsor licence and your skilled workforce.",
    features: [
      { label: "Sponsor licence support", detail: "Step-by-step guidance from application to renewal" },
      { label: "CoS management", detail: "Assign, track and manage Certificates of Sponsorship" },
      { label: "Visa expiry reminders", detail: "Multi-level alerts starting 120 days before expiry" },
      { label: "Worker skill tracking", detail: "Maintain up-to-date skill and qualification records" },
    ],
    accent: "#F59E0B",
    accentLight: "rgba(245,158,11,0.10)",
    accentBorder: "rgba(245,158,11,0.22)",
    tag: "Specialist",
    visual: "skilled",
    stat: { val: "40+", label: "Countries covered" },
  },
  {
    id: 6,
    icon: BarChart3,
    category: "Analytics",
    title: "Workforce Analytics & Reporting",
    headline: "People data that drives confident decisions.",
    desc: "Transform raw workforce data into strategic clarity. Real-time dashboards, custom reports, and predictive insights give leadership the visibility to act before problems arise.",
    features: [
      { label: "Live workforce dashboard", detail: "Real-time headcount, absence and cost metrics" },
      { label: "Custom report builder", detail: "Drag-and-drop report designer — no SQL required" },
      { label: "Absence & leave analytics", detail: "Pattern detection with Bradford Factor scoring" },
      { label: "Headcount forecasting", detail: "Predictive modelling for hiring and budget planning" },
    ],
    accent: "#EC4899",
    accentLight: "rgba(236,72,153,0.10)",
    accentBorder: "rgba(236,72,153,0.22)",
    tag: "Intelligence",
    visual: "analytics",
    stat: { val: "247%", label: "Avg. insight uplift" },
  },
];

/* ─── SVG Visuals per service ─── */
const ServiceVisual = ({ type, accent }) => {
  const visuals = {
    records: (
      <div className="svc-vis svc-vis--records">
        <div className="svc-vis__doc svc-vis__doc--1" style={{ "--a": accent }}>
          <div className="svc-vis__doc-header"><FileText size={14} color={accent} /><span>employee_file.pdf</span></div>
          <div className="svc-vis__doc-lines"><div /><div /><div style={{ width: "60%" }} /></div>
          <div className="svc-vis__doc-badge" style={{ background: `${accent}18`, color: accent, borderColor: `${accent}30` }}>✓ Verified</div>
        </div>
        <div className="svc-vis__doc svc-vis__doc--2" style={{ "--a": accent }}>
          <div className="svc-vis__doc-header"><Lock size={14} color={accent} /><span>secure_vault</span></div>
          <div className="svc-vis__doc-lines"><div style={{ width: "80%" }} /><div style={{ width: "55%" }} /></div>
        </div>
        <div className="svc-vis__floating-stat" style={{ borderColor: `${accent}25`, "--a": accent }}>
          <Database size={13} color={accent} /><span>10,000+ files</span>
        </div>
        <div className="svc-vis__ring" style={{ borderColor: `${accent}15` }} />
      </div>
    ),
    compliance: (
      <div className="svc-vis svc-vis--compliance">
        <div className="svc-vis__shield-wrap" style={{ "--a": accent }}>
          <div className="svc-vis__shield-outer" style={{ borderColor: `${accent}20` }}>
            <div className="svc-vis__shield-inner" style={{ background: `${accent}10`, borderColor: `${accent}25` }}>
              <ShieldCheck size={44} color={accent} strokeWidth={1.5} />
            </div>
          </div>
          <div className="svc-vis__shield-glow" style={{ background: `radial-gradient(circle, ${accent}18, transparent 70%)` }} />
        </div>
        <div className="svc-vis__alert svc-vis__alert--1" style={{ "--a": accent }}>
          <span className="svc-vis__alert-dot" style={{ background: "#22C55E" }} />
          Right to Work — Valid
        </div>
        <div className="svc-vis__alert svc-vis__alert--2" style={{ "--a": accent }}>
          <span className="svc-vis__alert-dot" style={{ background: "#F59E0B" }} />
          Visa expires in 87 days
        </div>
        <div className="svc-vis__ring" style={{ borderColor: `${accent}12` }} />
      </div>
    ),
    recruitment: (
      <div className="svc-vis svc-vis--recruitment">
        <div className="svc-vis__pipeline" style={{ "--a": accent }}>
          {["Applied", "Shortlisted", "Interview", "Offer"].map((stage, i) => (
            <div key={stage} className="svc-vis__stage">
              <div className="svc-vis__stage-label">{stage}</div>
              <div className="svc-vis__stage-cards">
                {Array.from({ length: 3 - i }).map((_, j) => (
                  <div key={j} className="svc-vis__stage-card" style={{ background: i === 3 ? `${accent}15` : undefined, borderColor: i === 3 ? `${accent}30` : undefined }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="svc-vis__floating-stat" style={{ borderColor: `${accent}25`, "--a": accent }}>
          <TrendingUp size={13} color={accent} /><span>3× faster hire</span>
        </div>
        <div className="svc-vis__ring" style={{ borderColor: `${accent}12` }} />
      </div>
    ),
    hrprep: (
      <div className="svc-vis svc-vis--hrprep">
        {[
          { name: "Employment Contract", pct: 100 },
          { name: "Staff Handbook", pct: 100 },
          { name: "GDPR Policy", pct: 88 },
          { name: "Disciplinary Procedure", pct: 72 },
        ].map((doc, i) => (
          <div key={doc.name} className="svc-vis__checklist-row" style={{ "--a": accent, animationDelay: `${i * 0.1}s` }}>
            <div className="svc-vis__checklist-icon" style={{ background: `${accent}15`, borderColor: `${accent}25` }}>
              {doc.pct === 100 ? <CheckCircle2 size={13} color={accent} /> : <ClipboardList size={13} color={accent} />}
            </div>
            <div className="svc-vis__checklist-info">
              <span>{doc.name}</span>
              <div className="svc-vis__checklist-bar">
                <div style={{ width: `${doc.pct}%`, background: accent }} />
              </div>
            </div>
            <span className="svc-vis__checklist-pct" style={{ color: accent }}>{doc.pct}%</span>
          </div>
        ))}
        <div className="svc-vis__ring" style={{ borderColor: `${accent}12` }} />
      </div>
    ),
    skilled: (
      <div className="svc-vis svc-vis--skilled">
        <div className="svc-vis__globe-wrap" style={{ "--a": accent }}>
          <div className="svc-vis__globe" style={{ borderColor: `${accent}20` }}>
            <Globe size={40} color={accent} strokeWidth={1.5} />
            <div className="svc-vis__globe-glow" style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)` }} />
          </div>
        </div>
        {[
          { label: "CoS Active", val: "24", top: "18%", left: "72%" },
          { label: "Expiring Soon", val: "3", top: "58%", left: "78%" },
          { label: "Renewals", val: "7", top: "72%", left: "18%" },
        ].map(c => (
          <div key={c.label} className="svc-vis__country-chip"
            style={{ top: c.top, left: c.left, borderColor: `${accent}25`, "--a": accent }}>
            <span style={{ color: accent, fontWeight: 800 }}>{c.val}</span>
            <span>{c.label}</span>
          </div>
        ))}
        <div className="svc-vis__ring" style={{ borderColor: `${accent}12` }} />
      </div>
    ),
    analytics: (
      <div className="svc-vis svc-vis--analytics">
        <div className="svc-vis__chart-card" style={{ "--a": accent }}>
          <div className="svc-vis__chart-title"><BarChart3 size={13} color={accent} /> Headcount Trend</div>
          <div className="svc-vis__chart-bars">
            {[55, 62, 58, 75, 70, 88, 82, 95, 90, 100].map((h, i) => (
              <div key={i} className="svc-vis__bar-wrap">
                <div className="svc-vis__bar"
                  style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}, ${accent}55)`, animationDelay: `${i * 0.05}s` }} />
              </div>
            ))}
          </div>
          <div className="svc-vis__chart-footer">
            <span style={{ color: accent }}>↑ 247%</span>
            <span>vs last year</span>
          </div>
        </div>
        <div className="svc-vis__floating-stat" style={{ borderColor: `${accent}25`, "--a": accent }}>
          <Award size={13} color={accent} /><span>Top 1% ROI</span>
        </div>
        <div className="svc-vis__ring" style={{ borderColor: `${accent}12` }} />
      </div>
    ),
  };
  return visuals[type] || null;
};

/* ─── Main Section ─── */
const OurServiceSection = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const prevActive = useRef(0);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (idx) => {
    if (idx === active || animating) return;
    prevActive.current = active;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 260);
  };

  const s = services[active];

  return (
    <>
      <style>{`
        /* ── Section Shell ── */
        .svc2-section {
          background: #F0F4FF;
          padding: 7rem 0 6rem;
          position: relative;
          overflow: hidden;
        }
        .svc2-section::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(30,58,138,0.05), transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .svc2-section::after {
          content: '';
          position: absolute;
          bottom: -150px; left: -150px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(20,184,166,0.06), transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }
        .svc2-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── Header ── */
        .svc2-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .svc2-header.svc2--visible {
          opacity: 1; transform: translateY(0);
        }
        .svc2-header__left { max-width: 600px; }
        .svc2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(30,58,138,0.07);
          border: 1px solid rgba(30,58,138,0.14);
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #1E3A8A;
          margin-bottom: 1.125rem;
        }
        .svc2-eyebrow__dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1E3A8A,#14B8A6);
          animation: svc2-pulse 2.2s ease-in-out infinite;
        }
        @keyframes svc2-pulse {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.3; transform:scale(0.6); }
        }
        .svc2-headline {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(2rem,4vw,3rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #111827;
          margin-bottom: 0.875rem;
        }
        .svc2-headline span {
          background: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .svc2-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: #9CA3AF; line-height: 1.75;
        }
        .svc2-header__cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.75rem;
          background: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          color: #fff;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem; font-weight: 700;
          border-radius: 12px; border: none; cursor: pointer;
          box-shadow: 0 4px 18px rgba(30,58,138,0.28);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
          white-space: nowrap; flex-shrink: 0; text-decoration: none;
        }
        .svc2-header__cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(30,58,138,0.40);
          filter: brightness(1.06);
        }

        /* ── Tab Bar ── */
        .svc2-tabs-wrap {
          margin-bottom: 3rem;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease;
        }
        .svc2-tabs-wrap.svc2--visible { opacity: 1; transform: translateY(0); }
        .svc2-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 6px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(30,58,138,0.09);
          border-radius: 18px;
          width: fit-content;
          max-width: 100%;
        }
        .svc2-tab {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.625rem 1.125rem;
          border-radius: 12px;
          border: 1.5px solid transparent;
          background: transparent;
          cursor: pointer;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.8125rem; font-weight: 600;
          color: #6B7280;
          transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
          white-space: nowrap;
          user-select: none;
        }
        .svc2-tab:hover:not(.svc2-tab--active) {
          background: rgba(30,58,138,0.05);
          color: #1E3A8A;
        }
        .svc2-tab--active {
          background: #fff;
          border-color: rgba(30,58,138,0.12);
          color: #111827;
          box-shadow: 0 2px 12px rgba(30,58,138,0.10);
        }
        .svc2-tab__icon {
          width: 26px; height: 26px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .svc2-tab--active .svc2-tab__icon {
          background: var(--tab-accent-bg);
        }
        .svc2-tab__dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Content Panel ── */
        .svc2-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s 0.25s ease, transform 0.6s 0.25s ease;
        }
        .svc2-panel.svc2--visible { opacity: 1; transform: translateY(0); }
        .svc2-panel.svc2--exiting {
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.24s ease, transform 0.24s ease;
        }
        .svc2-panel.svc2--entering {
          opacity: 1; transform: translateY(0);
          transition: opacity 0.4s 0.05s ease, transform 0.4s 0.05s cubic-bezier(0.34,1.2,0.64,1);
        }
        @media (max-width: 1023px) {
          .svc2-panel { grid-template-columns: 1fr; }
          .svc2-tabs { width: 100%; }
          .svc2-tab { flex: 1; justify-content: center; }
        }

        /* ── Left: Content ── */
        .svc2-content { display: flex; flex-direction: column; gap: 0; }
        .svc2-content__tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          width: fit-content;
          margin-bottom: 1.125rem;
          border: 1px solid;
        }
        .svc2-content__headline {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(1.5rem,2.8vw,2.125rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .svc2-content__desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9875rem;
          color: #6B7280;
          line-height: 1.8;
          margin-bottom: 1.75rem;
          max-width: 500px;
        }

        /* Feature list */
        .svc2-features { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
        .svc2-feature {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 0.875rem 1rem;
          background: #fff;
          border: 1px solid rgba(30,58,138,0.07);
          border-radius: 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .svc2-feature:hover {
          border-color: var(--f-accent-border);
          box-shadow: 0 4px 16px rgba(30,58,138,0.07);
          transform: translateX(4px);
        }
        .svc2-feature__icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .svc2-feature__label {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.8125rem; font-weight: 700;
          color: #111827; margin-bottom: 2px;
        }
        .svc2-feature__detail {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem; color: #9CA3AF; line-height: 1.5;
        }

        /* CTAs */
        .svc2-content__actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .svc2-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.625rem;
          background: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          color: #fff;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem; font-weight: 700;
          border-radius: 11px; border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 18px rgba(30,58,138,0.28);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
        }
        .svc2-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(30,58,138,0.40); filter: brightness(1.06); }
        .svc2-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.5rem;
          background: transparent; color: #1E3A8A;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem; font-weight: 600;
          border-radius: 11px;
          border: 1.5px solid rgba(30,58,138,0.20);
          cursor: pointer; text-decoration: none;
          transition: all 0.2s ease;
        }
        .svc2-btn-ghost:hover { background: rgba(30,58,138,0.05); border-color: rgba(30,58,138,0.35); transform: translateY(-2px); }

        /* ── Right: Visual ── */
        .svc2-visual-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 380px;
        }
        .svc2-visual-bg {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          z-index: 0;
        }
        .svc2-visual-content {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 2.5rem;
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(30,58,138,0.08);
          box-shadow: 0 16px 48px rgba(30,58,138,0.10);
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── Stat badge ── */
        .svc2-stat-badge {
          position: absolute;
          bottom: -14px;
          right: 24px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: #fff;
          border: 1px solid rgba(30,58,138,0.10);
          border-radius: 999px;
          box-shadow: 0 6px 20px rgba(30,58,138,0.12);
          font-family: 'Sora', system-ui, sans-serif;
          white-space: nowrap;
        }
        .svc2-stat-badge__val {
          font-size: 1rem; font-weight: 800;
          background: linear-gradient(135deg,#1E3A8A,#14B8A6);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .svc2-stat-badge__lbl { font-size: 0.75rem; color: #9CA3AF; }

        /* ── Shared Visual Styles ── */
        .svc-vis { position: relative; width: 100%; max-width: 340px; }
        .svc-vis__ring {
          position: absolute;
          inset: -24px;
          border-radius: 50%;
          border: 1px dashed;
          opacity: 0.4;
          animation: svc2-rotate 20s linear infinite;
          pointer-events: none;
        }
        @keyframes svc2-rotate { to { transform: rotate(360deg); } }
        .svc-vis__floating-stat {
          position: absolute;
          bottom: -12px; right: 0;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: #fff;
          border: 1px solid;
          border-radius: 999px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: var(--a);
          box-shadow: 0 4px 14px rgba(30,58,138,0.10);
          white-space: nowrap;
          animation: svc2-float 3s ease-in-out infinite;
        }
        @keyframes svc2-float { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-5px); } }

        /* Records */
        .svc-vis--records { display: flex; flex-direction: column; gap: 12px; }
        .svc-vis__doc {
          background: #F8FAFC;
          border: 1px solid rgba(30,58,138,0.08);
          border-radius: 12px;
          padding: 14px;
          animation: svc2-float 3s ease-in-out infinite;
        }
        .svc-vis__doc--2 { animation-delay: 1.5s; }
        .svc-vis__doc-header {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.72rem; font-weight: 600; color: #374151;
          margin-bottom: 10px;
        }
        .svc-vis__doc-lines { display: flex; flex-direction: column; gap: 5px; }
        .svc-vis__doc-lines div { height: 6px; border-radius: 3px; width: 100%; background: rgba(30,58,138,0.10); }
        .svc-vis__doc-badge {
          display: inline-flex; align-items: center; gap: 4px;
          margin-top: 10px;
          padding: 3px 10px;
          border-radius: 999px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.68rem; font-weight: 700;
          border: 1px solid;
        }

        /* Compliance */
        .svc-vis--compliance { display: flex; align-items: center; justify-content: center; min-height: 260px; }
        .svc-vis__shield-wrap { position: relative; }
        .svc-vis__shield-outer {
          width: 160px; height: 160px;
          border-radius: 50%;
          border: 2px dashed;
          display: flex; align-items: center; justify-content: center;
          animation: svc2-rotate 15s linear infinite;
        }
        .svc-vis__shield-inner {
          width: 110px; height: 110px;
          border-radius: 50%;
          border: 2px solid;
          display: flex; align-items: center; justify-content: center;
        }
        .svc-vis__shield-glow {
          position: absolute; inset: -20px; border-radius: 50%;
          pointer-events: none;
        }
        .svc-vis__alert {
          position: absolute;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: #fff;
          border: 1px solid rgba(30,58,138,0.10);
          border-radius: 999px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.72rem; font-weight: 600; color: #374151;
          box-shadow: 0 3px 12px rgba(30,58,138,0.08);
          white-space: nowrap;
          animation: svc2-float 3s ease-in-out infinite;
        }
        .svc-vis__alert--1 { top: 10px; right: -20px; }
        .svc-vis__alert--2 { bottom: 10px; left: -20px; animation-delay: 1.5s; }
        .svc-vis__alert-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

        /* Recruitment */
        .svc-vis--recruitment { width: 100%; }
        .svc-vis__pipeline { display: flex; gap: 8px; width: 100%; }
        .svc-vis__stage { flex: 1; }
        .svc-vis__stage-label {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.65rem; font-weight: 700; color: #9CA3AF;
          letter-spacing: 0.05em; text-transform: uppercase;
          margin-bottom: 7px;
        }
        .svc-vis__stage-cards { display: flex; flex-direction: column; gap: 6px; }
        .svc-vis__stage-card {
          height: 36px;
          border-radius: 7px;
          background: rgba(30,58,138,0.06);
          border: 1px solid rgba(30,58,138,0.08);
          animation: svc2-float 3s ease-in-out infinite;
        }
        .svc-vis__stage-card:nth-child(2) { animation-delay: 0.5s; }
        .svc-vis__stage-card:nth-child(3) { animation-delay: 1s; }

        /* HR Prep */
        .svc-vis--hrprep { width: 100%; display: flex; flex-direction: column; gap: 10px; }
        .svc-vis__checklist-row {
          display: flex; align-items: center; gap: 10px;
          animation: svc2-slideIn 0.4s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        @keyframes svc2-slideIn {
          from { opacity:0; transform:translateX(-12px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .svc-vis__checklist-icon {
          width: 28px; height: 28px;
          border-radius: 8px; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .svc-vis__checklist-info { flex: 1; min-width: 0; }
        .svc-vis__checklist-info span {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.78rem; font-weight: 600; color: #374151;
          margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .svc-vis__checklist-bar {
          height: 4px; border-radius: 999px;
          background: rgba(30,58,138,0.08); overflow: hidden;
        }
        .svc-vis__checklist-bar div {
          height: 100%; border-radius: 999px;
          transition: width 0.8s cubic-bezier(0.34,1.2,0.64,1);
        }
        .svc-vis__checklist-pct {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.72rem; font-weight: 800; flex-shrink: 0;
        }

        /* Skilled */
        .svc-vis--skilled { position: relative; width: 100%; min-height: 260px; }
        .svc-vis__globe-wrap { display: flex; align-items: center; justify-content: center; }
        .svc-vis__globe {
          width: 140px; height: 140px;
          border-radius: 50%;
          border: 2px dashed;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          animation: svc2-rotate 18s linear infinite;
          margin: 0 auto;
        }
        .svc-vis__globe-glow { position: absolute; inset: -10px; border-radius: 50%; pointer-events: none; }
        .svc-vis__country-chip {
          position: absolute;
          display: flex; flex-direction: column; align-items: center;
          padding: 6px 10px;
          background: #fff;
          border: 1px solid;
          border-radius: 10px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.62rem; font-weight: 600; color: #6B7280;
          box-shadow: 0 3px 12px rgba(30,58,138,0.08);
          animation: svc2-float 3s ease-in-out infinite;
          line-height: 1.3;
        }
        .svc-vis__country-chip:nth-child(2) { animation-delay: 0.8s; }
        .svc-vis__country-chip:nth-child(3) { animation-delay: 1.6s; }

        /* Analytics */
        .svc-vis--analytics { width: 100%; }
        .svc-vis__chart-card {
          background: #F8FAFC;
          border: 1px solid rgba(30,58,138,0.08);
          border-radius: 14px;
          padding: 1.25rem;
        }
        .svc-vis__chart-title {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.75rem; font-weight: 700; color: #374151;
          margin-bottom: 1rem;
        }
        .svc-vis__chart-bars {
          display: flex; align-items: flex-end; gap: 5px;
          height: 90px;
        }
        .svc-vis__bar-wrap { flex: 1; height: 100%; display: flex; align-items: flex-end; }
        .svc-vis__bar {
          width: 100%; border-radius: 3px 3px 1px 1px;
          animation: svc2-barGrow 0.7s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        @keyframes svc2-barGrow { from{ height:0; } }
        .svc-vis__chart-footer {
          display: flex; align-items: center; gap: 6px;
          margin-top: 10px;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.75rem; font-weight: 700;
        }
        .svc-vis__chart-footer span:last-child { color: #9CA3AF; font-weight: 400; font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

      <section className="svc2-section" ref={sectionRef}>
        <div className="svc2-inner">

          {/* ── Header ── */}
          <div className={`svc2-header ${visible ? "svc2--visible" : ""}`}>
            <div className="svc2-header__left">
              <span className="svc2-eyebrow">
                <span className="svc2-eyebrow__dot" />
                Our Services
              </span>
              <h2 className="svc2-headline">
                Everything you need to<br />
                <span>manage your workforce.</span>
              </h2>
              <p className="svc2-sub">
                From legal compliance to recruitment, SWC delivers a complete HR ecosystem built specifically for UK employers managing skilled workers.
              </p>
            </div>
            
          </div>

          {/* ── Tab Bar ── */}
          <div className={`svc2-tabs-wrap ${visible ? "svc2--visible" : ""}`}>
            <div className="svc2-tabs" ref={tabsRef}>
              {services.map((svc, i) => (
                <button
                  key={svc.id}
                  className={`svc2-tab ${active === i ? "svc2-tab--active" : ""}`}
                  style={{ "--tab-accent-bg": svc.accentLight }}
                  onClick={() => handleTabChange(i)}
                >
                  <span
                    className="svc2-tab__icon"
                    style={active === i ? { background: svc.accentLight } : {}}
                  >
                    <svc.icon size={14} color={active === i ? svc.accent : "#9CA3AF"} strokeWidth={2} />
                  </span>
                  <span>{svc.category}</span>
                  {active === i && (
                    <span className="svc2-tab__dot" style={{ background: svc.accent }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content Panel ── */}
          <div
            className={`svc2-panel ${visible ? "svc2--visible" : ""} ${animating ? "svc2--exiting" : "svc2--entering"}`}
          >
            {/* Left: Text Content */}
            <div className="svc2-content">
              {/* Tag */}
              <span
                className="svc2-content__tag"
                style={{ color: s.accent, background: s.accentLight, borderColor: s.accentBorder }}
              >
                <s.icon size={12} />
                {s.tag} · {s.category}
              </span>

              {/* Headline */}
              <h3 className="svc2-content__headline">{s.headline}</h3>

              {/* Desc */}
              <p className="svc2-content__desc">{s.desc}</p>

              {/* Features */}
              <div className="svc2-features">
                {s.features.map((f, fi) => (
                  <div
                    key={fi}
                    className="svc2-feature"
                    style={{ "--f-accent-border": s.accentBorder }}
                  >
                    <div
                      className="svc2-feature__icon"
                      style={{ background: s.accentLight, border: `1px solid ${s.accentBorder}` }}
                    >
                      <CheckCircle2 size={14} color={s.accent} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="svc2-feature__label">{f.label}</div>
                      <div className="svc2-feature__detail">{f.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="svc2-content__actions">
                <button href="/contact" className="svc2-btn-primary btn-slide-bg">
                  Get Started
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
               <button className="btn btn-slide-bg btn-outline">
                  <Play size={12} fill="currentColor" />
                  See Demo
                </button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="svc2-visual-wrap">
              <div
                className="svc2-visual-bg"
                style={{ background: `radial-gradient(ellipse at 60% 40%, ${s.accentLight}, transparent 70%)` }}
              />
              <div className="svc2-visual-content">
                <ServiceVisual type={s.visual} accent={s.accent} />
              </div>
              {/* Floating stat badge */}
              <div className="svc2-stat-badge">
                <span className="svc2-stat-badge__val">{s.stat.val}</span>
                <span className="svc2-stat-badge__lbl">{s.stat.label}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OurServiceSection;