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
  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
    {children}
  </span>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 font-sans text-[0.7rem] font-bold tracking-[0.09em] uppercase text-teal-600">
    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block animate-[cp-pulse_2s_ease-in-out_infinite]" />
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   CONTACT HERO VISUAL  — GSAP, fully centred
══════════════════════════════════════════════ */

const channels = [
  { icon: Phone, label: "Call", color: "#3B82F6", bg: "rgba(59,130,246,0.18)", angle: -90 },
  { icon: Mail, label: "Email", color: "#14B8A6", bg: "rgba(20,184,166,0.18)", angle: -30 },
  { icon: MessageCircle, label: "Chat", color: "#8B5CF6", bg: "rgba(139,92,246,0.18)", angle: 30 },
  { icon: MapPin, label: "Visit", color: "#F59E0B", bg: "rgba(245,158,11,0.18)", angle: 90 },
  { icon: Video, label: "Video", color: "#EC4899", bg: "rgba(236,72,153,0.18)", angle: 150 },
  { icon: HeadphonesIcon, label: "Help", color: "#14B8A6", bg: "rgba(20,184,166,0.18)", angle: 210 },
];

const RADIUS = 130;
const SIZE = 340;
const CX = SIZE / 2;
const CY = SIZE / 2;

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        centerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" },
        0,
      );

      [pulse1Ref.current, pulse2Ref.current].forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0.65, opacity: 0.7 },
          { scale: 1.85, opacity: 0, duration: 2.5, ease: "power1.out", repeat: -1, delay: i * 1.25 },
        );
      });

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

      tl.fromTo(
        nodeRefs.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)", stagger: 0.12 },
        0.2,
      );

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
    <div ref={wrapRef} className="relative w-[340px] h-[340px] flex-shrink-0">
      {/* Connection lines + travelling dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
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

      {/* Rotating rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[4]">
        <g ref={ring1Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r="148" fill="none" stroke="rgba(20,184,166,0.18)" strokeWidth="1" strokeDasharray="8 6" />
        </g>
        <g ref={ring2Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r="112" fill="none" stroke="rgba(30,58,138,0.13)" strokeWidth="1" strokeDasharray="5 8" />
        </g>
        <g ref={ring3Ref} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r="78" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="4 5" />
        </g>
      </svg>

      {/* Pulse rings */}
      <div ref={pulse1Ref} className="absolute w-[90px] h-[90px] rounded-full border-[1.5px] border-teal-500/40 pointer-events-none z-[10] left-[calc(50%-45px)] top-[calc(50%-45px)]" />
      <div ref={pulse2Ref} className="absolute w-[90px] h-[90px] rounded-full border-[1.5px] border-teal-500/40 pointer-events-none z-[10] left-[calc(50%-45px)] top-[calc(50%-45px)] opacity-0" />

      {/* Center node */}
      <div
        ref={centerRef}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#14B8A6] flex items-center justify-center shadow-[0_8px_32px_rgba(20,184,166,0.40),0_0_0_6px_rgba(20,184,166,0.12)] z-25 left-[calc(50%-40px)] top-[calc(50%-40px)] opacity-0 scale-0"
      >
        <Globe size={32} color="#fff" strokeWidth={1.5} />
      </div>

      {/* Channel nodes */}
      {channels.map((ch, i) => {
        const { x, y } = polar(ch.angle);
        return (
          <div
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            className="absolute flex flex-col items-center gap-1 z-[18] opacity-0"
            style={{ left: x - 24, top: y - 24 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-transform duration-200 hover:scale-110 cursor-default"
              style={{
                background: ch.bg,
                border: `1.5px solid ${ch.color}35`,
                boxShadow: `0 4px 16px ${ch.color}22`,
              }}
            >
              <ch.icon size={20} color={ch.color} strokeWidth={2} />
            </div>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.07em] uppercase text-white/55">{ch.label}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ── Floating Chip ── */
const FloatingChip = ({ text, Icon, color, delay = 0, style = {} }) => {
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
      className="absolute flex items-center gap-1.5 px-3.5 py-2 bg-white/92 backdrop-blur-md border border-[rgba(30,58,138,0.10)] rounded-full font-sans text-[0.72rem] font-bold shadow-md whitespace-nowrap z-20 opacity-0"
      style={{ color, ...style }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {text}
    </div>
  );
};

/* ── Stat Float ── */
const StatFloat = ({ val, label, delay = 0, style = {} }) => {
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
      className="absolute bg-white/90 backdrop-blur-md border border-[rgba(30,58,138,0.09)] rounded-xl p-3 px-4 shadow-lg z-20 min-w-[110px] opacity-0"
      style={style}
    >
      <div className="font-sans text-[1.375rem] font-extrabold tracking-[-0.04em] bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent leading-none">
        {val}
      </div>
      <div className="font-dm-sans text-[0.72rem] text-gray-400 mt-0.5">{label}</div>
    </div>
  );
};

/* ─── Data ─── */
const quickContacts = [
  { icon: Phone, label: "Call Support", value: "+44 20 1234 5678", sub: "Mon–Fri, 9am–6pm GMT", cta: "Speak with our HR experts", href: "tel:+442012345678", accent: C.secondaryBlue, bg: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(59,130,246,0.06))" },
  { icon: Mail, label: "Email Support", value: "hello@swcloud.co.uk", sub: "Response within 2 hours", cta: "Send queries & documents", href: "mailto:hello@swcloud.co.uk", accent: C.tealAccent, bg: "linear-gradient(135deg,rgba(20,184,166,0.08),rgba(13,148,136,0.04))" },
  { icon: MapPin, label: "Our Office", value: "London, EC2A 4NE", sub: "United Kingdom", cta: "Schedule an in-person visit", href: "https://maps.google.com", accent: C.primaryBlue, bg: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(29,78,216,0.04))" },
  { icon: Clock, label: "Office Hours", value: "Mon–Fri, 9–6pm", sub: "GMT / BST timezone", cta: "Book a consultation slot", href: "#contact-form", accent: "#7C3AED", bg: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(109,40,217,0.04))" },
];

const departments = [
  { icon: Briefcase, title: "Sales & Demos", desc: "Product demonstrations and pricing enquiries", email: "sales@swcloud.co.uk", phone: "+44 20 1234 5678", tag: "Sales" },
  { icon: HeadphonesIcon, title: "Technical Support", desc: "Platform assistance and troubleshooting", email: "support@swcloud.co.uk", phone: "+44 20 1234 5679", tag: "Support" },
  { icon: Users, title: "HR Consulting", desc: "HR strategy, compliance and implementation", email: "consulting@swcloud.co.uk", phone: "+44 20 1234 5680", tag: "Consulting" },
];

const subjects = ["Sales & Pricing", "Technical Support", "HR Consulting", "Product Demo", "Partnership", "General Inquiry"];

/* ── Scroll Reveal ── */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay, scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

/* ── Toast ── */
const Toast = ({ msg, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" });
    }, ref);
    return () => ctx.revert();
  }, []);
  const hide = () => {
    gsap.to(ref.current, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };
  return (
    <div ref={ref} className="fixed top-6 right-6 z-[999] flex items-center gap-2.5 bg-gradient-to-br from-[#0B1437] to-[#111D4A] border border-teal-500/35 rounded-xl py-3.5 px-5 shadow-2xl min-w-[300px]">
      <CheckCircle size={17} color={C.tealAccent} />
      <p className="m-0 text-[13.5px] text-white font-medium">{msg}</p>
      <button onClick={hide} className="bg-none border-none cursor-pointer text-white/45 ml-auto p-0 flex">
        <X size={14} />
      </button>
    </div>
  );
};

/* ── Hero Left ── */
const HeroLeft = () => {
  const wrapRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = wrapRef.current.querySelectorAll(".cp-hero-item");
      gsap.fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="max-w-[600px]">
      <div className="cp-hero-item flex gap-6 mb-9 flex-wrap opacity-0">
        {[{ icon: Shield, label: "UK-Based Support" }, { icon: CheckCircle, label: "GDPR Compliant" }, { icon: Star, label: "5-Star Rated" }].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-white/52 text-[13px] font-medium">
            <Icon size={13} color={C.tealAccent} />
            {label}
          </div>
        ))}
      </div>

      <div className="cp-hero-item mb-5 opacity-0">
        <Badge>Contact Us</Badge>
      </div>

      <h1 className="cp-hero-item font-sans text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.07] tracking-[-0.04em] text-white m-0 mb-2 opacity-0">
        Let's Build Something
      </h1>
      <h1 className="cp-hero-item font-sans text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.07] tracking-[-0.04em] m-0 mb-2 opacity-0">
        <GText>Great Together.</GText>
      </h1>

      <p className="cp-hero-item font-dm-sans text-[1.0625rem] text-white/52 leading-relaxed max-w-[460px] my-5 mb-9 opacity-0">
        Our UK HR-tech specialists are ready to help. Whether you're looking for a demo, need compliance advice, or want to explore the platform — get in touch today.
      </p>

      <div className="cp-hero-item flex gap-3 flex-wrap opacity-0">
        <a href="#contact-form" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-sans text-[0.9rem] font-bold rounded-xl cursor-pointer shadow-[0_4px_20px_rgba(20,184,166,0.38)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(20,184,166,0.50)] btn-slide-bg">
          Send a Message <ArrowRight size={15} strokeWidth={2.5} />
        </a>
        <a href="tel:+442012345678" className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 backdrop-blur-md text-white/85 font-sans text-[0.9rem] font-semibold rounded-xl border border-white/20 cursor-pointer transition-all duration-200 hover:bg-white/15 hover:-translate-y-1 ">
          <Phone size={15} strokeWidth={2.5} /> Call Us Now
        </a>
      </div>

      <div className="cp-hero-item inline-flex items-center gap-2.5 mt-7 py-2 px-4 bg-white/7 backdrop-blur-md border border-white/12 rounded-full opacity-0">
        <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
          <Zap size={13} color="#fff" strokeWidth={2.5} />
        </div>
        <span className="font-dm-sans text-[0.8125rem] text-white/70">
          Average response time: <strong className="text-teal-500">under 2 hours</strong>
        </span>
      </div>
    </div>
  );
};

/* ── Hero Right ── */
const HeroRight = () => {
  const wrapRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", delay: 0.2 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="flex items-center justify-center relative w-[420px] h-[420px] flex-shrink-0 opacity-0">
      <div className="absolute inset-0 rounded-full bg-radial from-teal-500/8 to-transparent pointer-events-none" />

      <FloatingChip text="2hr Response" Icon={Clock} color="#14B8A6" delay={0.9} style={{ left: -10, top: 20 }} />
      <FloatingChip text="GDPR Safe" Icon={Shield} color="#3B82F6" delay={1.1} style={{ right: -10, top: 16 }} />
      <FloatingChip text="UK-Based" Icon={MapPin} color="#1E3A8A" delay={1.3} style={{ right: -10, bottom: 60 }} />
      <FloatingChip text="5★ Rated" Icon={Star} color="#F59E0B" delay={1.5} style={{ left: -10, bottom: 56 }} />

      <StatFloat val="500+" label="UK clients" delay={0.8} style={{ left: -80, top: 100 }} />
      <StatFloat val="98%" label="Satisfaction" delay={1.0} style={{ right: -80, top: 120 }} />

      <div className="absolute top-1/2 left-1/2 -mt-[170px] -ml-[170px]">
        <ContactHeroVisual />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setToast({ msg: "Message sent! We'll reply within 2 hours." });
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      setTimeout(() => setToast(null), 5000);
    }, 1600);
  };

  const hoverIn = (e) => gsap.to(e.currentTarget, { y: -5, boxShadow: "0 16px 36px rgba(30,58,138,0.12)", duration: 0.25, ease: "power2.out" });
  const hoverOut = (e) => gsap.to(e.currentTarget, { y: 0, boxShadow: "0 2px 8px rgba(30,58,138,0.05)", duration: 0.2, ease: "power2.in" });
  const btnIn = (e) => gsap.to(e.currentTarget, { scale: 1.015, y: -2, duration: 0.2, ease: "power2.out" });
  const btnOut = (e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.2, ease: "power2.in" });
  const btnTap = (e) => gsap.to(e.currentTarget, { scale: 0.97, duration: 0.08 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="font-dm-sans overflow-x-hidden" style={{ background: C.bgMain, color: C.textPrimary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes cp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.65)} }
        @keyframes cp-spin { to{transform:rotate(360deg)} }
        @keyframes cp-grid { 0%{background-position:0 0} 100%{background-position:32px 32px} }
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea, select, button { font-family: inherit; }
        .bg-radial { background: radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%); }
        .bg-white\\/7 { background: rgba(255,255,255,0.07); }
      `}</style>

      {toast && <Toast msg={toast.msg} onClose={() => setToast(null)} />}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040d26] via-[#0c1a4a] to-[#083030] pt-10 pb-22.5">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:32px_32px] animate-[cp-grid_8s_linear_infinite]" />
        
        <div className="absolute -top-[120px] -right-20 w-[500px] h-[500px] rounded-full bg-radial from-blue-500/18 to-transparent blur-[55px] pointer-events-none" />
        <div className="absolute -bottom-25 -left-20 w-[440px] h-[440px] rounded-full bg-radial from-teal-500/14 to-transparent blur-[55px] pointer-events-none" />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-radial from-[#1E3A8A]/12 to-transparent blur-[55px] pointer-events-none" />
        
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.gradientBrand }} />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <HeroLeft />
            <HeroRight />
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-20 px-8" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-13">
            <Badge>Quick Contact</Badge>
            <h2 className="font-sans text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.035em] mt-4 mb-3" style={{ color: C.textPrimary }}>
              Reach us <GText>instantly</GText>
            </h2>
            <p className="text-base max-w-[420px] mx-auto leading-relaxed" style={{ color: C.textSecondary }}>
              Multiple channels, one mission — to get you the help you need, fast.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.125rem]">
            {quickContacts.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="block no-underline bg-white border rounded-2xl p-7 shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderColor: C.border }}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-xl mb-[18px] flex items-center justify-center border border-opacity-10" style={{ borderColor: `${c.accent}22`, background: c.bg }}>
                    <c.icon size={21} color={c.accent} strokeWidth={2} />
                  </div>
                  <p className="font-sans text-[0.68rem] font-bold tracking-[0.08em] uppercase mb-1.5" style={{ color: c.accent }}>{c.label}</p>
                  <p className="font-sans text-[0.9375rem] font-bold m-0 mb-1 leading-tight" style={{ color: C.textPrimary }}>{c.value}</p>
                  <p className="font-dm-sans text-[12.5px] m-0 mb-[18px] leading-relaxed" style={{ color: C.textSecondary }}>{c.sub}</p>
                  <div className="flex items-center gap-1.5 pt-3.5 border-t font-sans text-[12.5px] font-bold" style={{ borderTopColor: C.border, color: c.accent }}>
                    {c.cta} <ArrowRight size={11} strokeWidth={2.5} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Departments */}
      <section id="contact-form" className="py-20 pb-24 px-8" style={{ background: C.bgMain }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
            {/* Form */}
            <Reveal>
              <div className="bg-white border rounded-2xl overflow-hidden shadow-md" style={{ borderColor: C.border }}>
                <div className="p-8 pb-7 flex items-center justify-between" style={{ background: C.gradientBrand }}>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-white m-0 mb-1.5">Send a Message</h3>
                    <p className="font-dm-sans text-[13.5px] text-white/65 m-0">We'll respond within 2 hours on business days</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                    <Send size={18} color="#fff" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-7 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[{ name: "name", label: "Full Name", icon: User, placeholder: "Jane Smith", type: "text", required: true },
                      { name: "email", label: "Email Address", icon: Mail, placeholder: "jane@company.co.uk", type: "email", required: true }].map((f) => (
                      <div key={f.name}>
                        <label className="flex items-center gap-1 font-sans text-[0.68rem] font-bold uppercase tracking-[0.07em] mb-2" style={{ color: C.primaryBlue }}>
                          <f.icon size={11} color={C.secondaryBlue} /> {f.label} {f.required && "*"}
                        </label>
                        <input
                          name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
                          value={formData[f.name]} onChange={handleChange}
                          onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)}
                          className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 bg-[#F0F4FF]"
                          style={{
                            border: `1px solid ${focused === f.name ? C.tealAccent : C.border}`,
                            boxShadow: focused === f.name ? "0 0 0 3px rgba(20,184,166,0.12)" : "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[{ name: "phone", label: "Phone", icon: Phone, placeholder: "+44 20 1234 5678", type: "tel" },
                      { name: "company", label: "Company", icon: Building, placeholder: "Acme Ltd", type: "text" }].map((f) => (
                      <div key={f.name}>
                        <label className="flex items-center gap-1 font-sans text-[0.68rem] font-bold uppercase tracking-[0.07em] mb-2" style={{ color: C.primaryBlue }}>
                          <f.icon size={11} color={C.secondaryBlue} /> {f.label}
                        </label>
                        <input
                          name={f.name} type={f.type} placeholder={f.placeholder}
                          value={formData[f.name]} onChange={handleChange}
                          onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)}
                          className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 bg-[#F0F4FF]"
                          style={{
                            border: `1px solid ${focused === f.name ? C.tealAccent : C.border}`,
                            boxShadow: focused === f.name ? "0 0 0 3px rgba(20,184,166,0.12)" : "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center gap-1 font-sans text-[0.68rem] font-bold uppercase tracking-[0.07em] mb-2" style={{ color: C.primaryBlue }}>
                      <Briefcase size={11} color={C.secondaryBlue} /> Subject *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {subjects.map((s) => (
                        <button
                          key={s} type="button"
                          onClick={() => setFormData((p) => ({ ...p, subject: s }))}
                          className="px-2.5 py-2 rounded-lg text-[12.5px] font-semibold cursor-pointer transition-all duration-180"
                          style={{
                            background: formData.subject === s ? C.primaryBlue : C.bgMain,
                            color: formData.subject === s ? "#fff" : C.textSecondary,
                            border: `1px solid ${formData.subject === s ? C.primaryBlue : C.border}`,
                          }}
                          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.18, ease: "back.out(2)" })}
                          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.15, ease: "power2.in" })}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-1 font-sans text-[0.68rem] font-bold uppercase tracking-[0.07em] mb-2" style={{ color: C.primaryBlue }}>
                      <MessageSquare size={11} color={C.secondaryBlue} /> Message *
                    </label>
                    <textarea
                      name="message" rows={4} required
                      placeholder="Tell us how we can help you..."
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 bg-[#F0F4FF] resize-none"
                      style={{
                        border: `1px solid ${focused === "message" ? C.tealAccent : C.border}`,
                        boxShadow: focused === "message" ? "0 0 0 3px rgba(20,184,166,0.12)" : "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit" disabled={sending}
                    onMouseEnter={!sending ? btnIn : undefined}
                    onMouseLeave={!sending ? btnOut : undefined}
                    onMouseDown={!sending ? btnTap : undefined}
                    className="w-full py-3.5 px-6 rounded-xl border-none font-sans font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200"
                    style={{
                      background: sending ? "#94A3B8" : C.gradientBrand,
                      color: "#fff",
                      cursor: sending ? "not-allowed" : "pointer",
                      boxShadow: sending ? "none" : "0 4px 20px rgba(30,58,138,0.28)",
                    }}
                  >
                    {sending ? (
                      <><div className="w-[15px] h-[15px] rounded-full border-2 border-white/35 border-t-white animate-[cp-spin_0.7s_linear_infinite]" /> Sending…</>
                    ) : (<>Send Message <Send size={15} /></>)}
                  </button>
                  <p className="text-center text-xs mt-3" style={{ color: C.textSecondary }}>
                    By submitting you agree to our <a href="#" className="font-semibold" style={{ color: C.tealAccent }}>Privacy Policy</a>
                  </p>
                </form>
              </div>
            </Reveal>

            {/* Departments */}
            <div>
              <Reveal className="mb-7">
                <Badge>Department Contacts</Badge>
                <h3 className="font-sans text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.03em] mt-4 mb-2.5" style={{ color: C.textPrimary }}>
                  Talk to the <GText>right team</GText>
                </h3>
                <p className="font-dm-sans text-[15px] leading-relaxed" style={{ color: C.textSecondary }}>
                  Route your query directly to the specialist who can help most.
                </p>
              </Reveal>

              <div className="flex flex-col gap-3.5">
                {departments.map((d, i) => (
                  <Reveal key={d.title} delay={i * 0.09}>
                    <div
                      className="relative overflow-hidden rounded-xl p-5 pl-7 bg-white border shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-xl"
                      style={{ borderColor: C.border }}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                    >
                      <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: C.gradientBrand }} />
                      <div className="flex items-start gap-3.5">
                        <div className="w-10.5 h-10.5 rounded-xl flex-shrink-0 flex items-center justify-center border" style={{ borderColor: C.border, background: "linear-gradient(135deg,rgba(30,58,138,0.08),rgba(20,184,166,0.06))" }}>
                          <d.icon size={19} color={C.tealAccent} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h4 className="font-sans text-[15px] font-bold m-0" style={{ color: C.textPrimary }}>{d.title}</h4>
                            <span className="font-sans text-[0.62rem] font-bold tracking-[0.07em] uppercase px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600"> {d.tag} </span>
                          </div>
                          <p className="font-dm-sans text-[13px] m-0 mb-3 leading-relaxed" style={{ color: C.textSecondary }}>{d.desc}</p>
                          <div className="flex flex-col gap-1.5">
                            <a href={`mailto:${d.email}`} className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: C.primaryBlue }}>
                              <Mail size={12} color={C.secondaryBlue} strokeWidth={2.5} /> {d.email}
                            </a>
                            <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: C.primaryBlue }}>
                              <Phone size={12} color={C.secondaryBlue} strokeWidth={2.5} /> {d.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.35}>
                <div className="mt-5 bg-gradient-to-br from-[#0B1437] to-[#111D4A] border border-blue-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-teal-500/15 border border-teal-500/28 flex items-center justify-center">
                      <Zap size={16} color={C.tealAccent} />
                    </div>
                    <p className="font-sans text-sm font-bold text-white m-0">Response Guarantee</p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[{ label: "Email support", time: "Within 2 hours" }, { label: "Phone support", time: "Immediate" }, { label: "Technical issues", time: "Within 4 hours" }].map(({ label, time }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="font-dm-sans text-[13px] text-white/50">{label}</span>
                        <span className="font-sans text-[13px] font-bold text-teal-500">{time}</span>
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