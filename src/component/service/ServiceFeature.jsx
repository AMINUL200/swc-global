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
      <div className="relative w-full max-w-[340px]">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}20` }} />
        <div className="flex flex-col gap-3">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 animate-[float_3s_ease-in-out_infinite]" style={{ borderColor: `${accent}10` }}>
            <div className="flex items-center gap-1.5 font-sora text-[0.72rem] font-semibold text-gray-700 mb-2.5">
              <FileText size={14} color={accent} /><span>employee_file.pdf</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-1.5 rounded-full w-full bg-gray-100" />
              <div className="h-1.5 rounded-full w-full bg-gray-100" />
              <div className="h-1.5 rounded-full w-[60%] bg-gray-100" />
            </div>
            <div className="inline-flex items-center gap-1 mt-2.5 px-2.5 py-0.5 rounded-full border font-sora text-[0.68rem] font-bold" style={{ background: `${accent}18`, color: accent, borderColor: `${accent}30` }}>✓ Verified</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 animate-[float_3s_ease-in-out_infinite_1.5s]" style={{ borderColor: `${accent}10` }}>
            <div className="flex items-center gap-1.5 font-sora text-[0.72rem] font-semibold text-gray-700 mb-2.5">
              <Lock size={14} color={accent} /><span>secure_vault</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-1.5 rounded-full w-[80%] bg-gray-100" />
              <div className="h-1.5 rounded-full w-[55%] bg-gray-100" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 right-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full shadow-md font-sora text-[0.72rem] font-bold animate-[float_3s_ease-in-out_infinite]" style={{ borderColor: `${accent}25`, color: accent }}>
          <Database size={13} color={accent} /><span>10,000+ files</span>
        </div>
      </div>
    ),
    compliance: (
      <div className="relative w-full max-w-[340px] min-h-[260px] flex items-center justify-center">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}12` }} />
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center animate-[spin_15s_linear_infinite]" style={{ borderColor: `${accent}20` }}>
            <div className="w-[110px] h-[110px] rounded-full border-2 flex items-center justify-center" style={{ background: `${accent}10`, borderColor: `${accent}25` }}>
              <ShieldCheck size={44} color={accent} strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute -inset-5 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accent}18, transparent 70%)` }} />
        </div>
        <div className="absolute top-2.5 -right-5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-md font-dm-sans text-[0.72rem] font-semibold text-gray-700 whitespace-nowrap animate-[float_3s_ease-in-out_infinite]" style={{ borderColor: `${accent}10` }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Right to Work — Valid
        </div>
        <div className="absolute bottom-2.5 -left-5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-md font-dm-sans text-[0.72rem] font-semibold text-gray-700 whitespace-nowrap animate-[float_3s_ease-in-out_infinite_1.5s]" style={{ borderColor: `${accent}10` }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Visa expires in 87 days
        </div>
      </div>
    ),
    recruitment: (
      <div className="relative w-full max-w-[340px]">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}12` }} />
        <div className="flex gap-2 w-full">
          {["Applied", "Shortlisted", "Interview", "Offer"].map((stage, i) => (
            <div key={stage} className="flex-1">
              <div className="font-sora text-[0.65rem] font-bold text-gray-400 uppercase tracking-wide mb-1.5">{stage}</div>
              <div className="flex flex-col gap-1.5">
                {Array.from({ length: 3 - i }).map((_, j) => (
                  <div key={j} className="h-9 rounded-md animate-[float_3s_ease-in-out_infinite]" style={{ background: i === 3 ? `${accent}15` : "rgba(30,58,138,0.06)", border: i === 3 ? `1px solid ${accent}30` : "1px solid rgba(30,58,138,0.08)", animationDelay: `${j * 0.5}s` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-3 right-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full shadow-md font-sora text-[0.72rem] font-bold animate-[float_3s_ease-in-out_infinite]" style={{ borderColor: `${accent}25`, color: accent }}>
          <TrendingUp size={13} color={accent} /><span>3× faster hire</span>
        </div>
      </div>
    ),
    hrprep: (
      <div className="relative w-full max-w-[340px]">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}12` }} />
        <div className="flex flex-col gap-2.5">
          {[
            { name: "Employment Contract", pct: 100 },
            { name: "Staff Handbook", pct: 100 },
            { name: "GDPR Policy", pct: 88 },
            { name: "Disciplinary Procedure", pct: 72 },
          ].map((doc, i) => (
            <div key={doc.name} className="flex items-center gap-2.5 animate-[slideIn_0.4s_cubic-bezier(0.34,1.2,0.64,1)_both]" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0" style={{ background: `${accent}15`, borderColor: `${accent}25` }}>
                {doc.pct === 100 ? <CheckCircle2 size={13} color={accent} /> : <ClipboardList size={13} color={accent} />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-dm-sans text-[0.78rem] font-semibold text-gray-700 mb-1 truncate">{doc.name}</span>
                <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${doc.pct}%`, background: accent }} />
                </div>
              </div>
              <span className="font-sora text-[0.72rem] font-bold flex-shrink-0" style={{ color: accent }}>{doc.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
    skilled: (
      <div className="relative w-full max-w-[340px] min-h-[260px]">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}12` }} />
        <div className="flex items-center justify-center">
          <div className="w-[140px] h-[140px] rounded-full border-2 border-dashed flex items-center justify-center relative animate-[spin_18s_linear_infinite] mx-auto" style={{ borderColor: `${accent}20` }}>
            <Globe size={40} color={accent} strokeWidth={1.5} />
            <div className="absolute -inset-2.5 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)` }} />
          </div>
        </div>
        {[
          { label: "CoS Active", val: "24", top: "18%", left: "72%" },
          { label: "Expiring Soon", val: "3", top: "58%", left: "78%" },
          { label: "Renewals", val: "7", top: "72%", left: "18%" },
        ].map((c, idx) => (
          <div key={c.label} className="absolute flex flex-col items-center p-1.5 px-2.5 bg-white border rounded-xl shadow-md font-sora text-[0.62rem] font-semibold text-gray-500 leading-tight animate-[float_3s_ease-in-out_infinite]" style={{ top: c.top, left: c.left, borderColor: `${accent}25`, animationDelay: `${idx * 0.8}s` }}>
            <span className="font-extrabold" style={{ color: accent }}>{c.val}</span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    ),
    analytics: (
      <div className="relative w-full max-w-[340px]">
        <div className="absolute -inset-6 rounded-full border border-dashed opacity-40 animate-[spin_20s_linear_infinite] pointer-events-none" style={{ borderColor: `${accent}12` }} />
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5" style={{ borderColor: `${accent}10` }}>
          <div className="flex items-center gap-1.5 font-sora text-[0.75rem] font-bold text-gray-700 mb-4">
            <BarChart3 size={13} color={accent} /> Headcount Trend
          </div>
          <div className="flex items-end gap-1 h-[90px]">
            {[55, 62, 58, 75, 70, 88, 82, 95, 90, 100].map((h, i) => (
              <div key={i} className="flex-1 h-full flex items-end">
                <div className="w-full rounded-t-sm animate-[barGrow_0.7s_cubic-bezier(0.34,1.2,0.64,1)_both]" style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}, ${accent}55)`, animationDelay: `${i * 0.05}s` }} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 font-sora text-[0.75rem] font-bold">
            <span style={{ color: accent }}>↑ 247%</span>
            <span className="font-dm-sans font-normal text-gray-400">vs last year</span>
          </div>
        </div>
        <div className="absolute -bottom-3 right-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full shadow-md font-sora text-[0.72rem] font-bold animate-[float_3s_ease-in-out_infinite]" style={{ borderColor: `${accent}25`, color: accent }}>
          <Award size={13} color={accent} /><span>Top 1% ROI</span>
        </div>
      </div>
    ),
  };
  return visuals[type] || null;
};

/* ─── Main Section ─── */
const ServiceFeature = () => {
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
    <section className="bg-[#F0F4FF] py-8 md:py-10 relative overflow-hidden" ref={sectionRef}>
      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(-5px); }
        }
        @keyframes slideIn {
          from { opacity:0; transform:translateX(-12px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes barGrow {
          from { height:0; }
        }
        .animate-\[float_3s_ease-in-out_infinite\] {
          animation: float 3s ease-in-out infinite;
        }
        .animate-\[float_3s_ease-in-out_infinite_1\.5s\] {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        .animate-\[spin_15s_linear_infinite\] {
          animation: spin 15s linear infinite;
        }
        .animate-\[spin_18s_linear_infinite\] {
          animation: spin 18s linear infinite;
        }
        .animate-\[spin_20s_linear_infinite\] {
          animation: spin 20s linear infinite;
        }
        .animate-\[slideIn_0\.4s_cubic-bezier\(0\.34\,1\.2\,0\.64\,1\)_both\] {
          animation: slideIn 0.4s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .animate-\[barGrow_0\.7s_cubic-bezier\(0\.34\,1\.2\,0\.64\,1\)_both\] {
          animation: barGrow 0.7s cubic-bezier(0.34,1.2,0.64,1) both;
        }
      `}</style>

      {/* Background blobs */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-gradient-radial from-blue-900/5 to-transparent blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-[600px] h-[600px] rounded-full bg-gradient-radial from-teal-500/6 to-transparent blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className={`flex items-end justify-between gap-8 flex-wrap mb-14 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="max-w-[600px]">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.25 rounded-full bg-blue-900/10 border border-blue-900/15 font-sora text-[0.7rem] font-bold tracking-wide uppercase text-blue-900 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-900 to-teal-500 animate-pulse" />
              Our Services
            </span>
            <h2 className="font-sora text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tighter text-gray-900 mb-3">
              Everything you need to<br />
              <span className="bg-gradient-to-br from-blue-900 via-blue-600 to-teal-500 bg-clip-text text-transparent">manage your workforce.</span>
            </h2>
            <p className="font-dm-sans text-base text-gray-400 leading-relaxed">
              From legal compliance to recruitment, SWC delivers a complete HR ecosystem built specifically for UK employers managing skilled workers.
            </p>
          </div>
        </div>

        {/* Tab Bar */}
        <div className={`mb-12 transition-all duration-700 delay-150 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex gap-1 flex-wrap p-1.5 bg-white/70 backdrop-blur-md border border-blue-900/10 rounded-2xl w-fit max-w-full" ref={tabsRef}>
            {services.map((svc, i) => (
              <button
                key={svc.id}
                className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border-[1.5px] font-sora text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-200 ${active === i ? "bg-white border-blue-900/15 text-gray-900 shadow-md" : "border-transparent text-gray-500 hover:bg-blue-900/5 hover:text-blue-900"}`}
                style={active === i ? { boxShadow: "0 2px 12px rgba(30,58,138,0.10)" } : {}}
                onClick={() => handleTabChange(i)}
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${active === i ? "bg-opacity-10" : ""}`} style={active === i ? { background: svc.accentLight } : {}}>
                  <svc.icon size={14} color={active === i ? svc.accent : "#9CA3AF"} strokeWidth={2} />
                </span>
                <span>{svc.category}</span>
                {active === i && <span className="w-1 h-1 rounded-full" style={{ background: svc.accent }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-200 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${animating ? "opacity-0 translate-y-2.5 transition-all duration-200" : "opacity-100 translate-y-0 transition-all duration-400 delay-50 ease-[cubic-bezier(0.34,1.2,0.64,1)]"}`}>
          {/* Left: Text Content */}
          <div className="flex flex-col">
            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-sora text-[0.7rem] font-bold tracking-wide uppercase w-fit mb-4" style={{ color: s.accent, background: s.accentLight, borderColor: s.accentBorder }}>
              <s.icon size={12} />
              {s.tag} · {s.category}
            </span>

            {/* Headline */}
            <h3 className="font-sora text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
              {s.headline}
            </h3>

            {/* Desc */}
            <p className="font-dm-sans text-base text-gray-500 leading-relaxed mb-7 max-w-[500px]">
              {s.desc}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-2 mb-8">
              {s.features.map((f, fi) => (
                <div key={fi} className="flex items-start gap-3 p-3.5 bg-white border rounded-xl transition-all duration-200 hover:translate-x-1 hover:shadow-sm" style={{ borderColor: "rgba(30,58,138,0.07)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: s.accentLight, border: `1px solid ${s.accentBorder}` }}>
                    <CheckCircle2 size={14} color={s.accent} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-sora text-[0.8125rem] font-bold text-gray-900 mb-0.5">{f.label}</div>
                    <div className="font-dm-sans text-[0.8rem] text-gray-400 leading-relaxed">{f.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-900 via-blue-600 to-teal-500 text-white font-sora text-[0.875rem] font-bold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105">
                Get Started
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-blue-900 font-sora text-[0.875rem] font-semibold rounded-xl border-[1.5px] transition-all duration-200 hover:bg-blue-900/5 hover:border-blue-900/35 hover:-translate-y-0.5" style={{ borderColor: "rgba(30,58,138,0.20)" }}>
                <Play size={12} fill="currentColor" />
                See Demo
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex items-center justify-center min-h-[380px]">
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 60% 40%, ${s.accentLight}, transparent 70%)` }} />
            <div className="relative z-10 w-full p-6 md:p-10 bg-white rounded-2xl border shadow-xl flex items-center justify-center min-h-[380px]" style={{ borderColor: "rgba(30,58,138,0.08)" }}>
              <ServiceVisual type={s.visual} accent={s.accent} />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-3.5 right-6 z-20 inline-flex items-center gap-2 px-4 py-2.5 bg-white border rounded-full shadow-lg font-sora whitespace-nowrap" style={{ borderColor: "rgba(30,58,138,0.10)" }}>
              <span className="text-base font-extrabold bg-gradient-to-br from-blue-900 to-teal-500 bg-clip-text text-transparent">{s.stat.val}</span>
              <span className="text-[0.75rem] text-gray-400">{s.stat.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeature;