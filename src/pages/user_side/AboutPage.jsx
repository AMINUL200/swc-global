import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Users,
  Lightbulb,
  Globe,
  Heart,
  TrendingUp,
  Zap,
  Award,
  Star,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";

/* ── Color tokens ─────────────────────────── */
const C = {
  primaryBlue: "#1E3A8A",
  primaryHover: "#1d4ed8",
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
  gradientText: "linear-gradient(135deg,#1E3A8A,#14B8A6)",
};

/* ── Helpers ──────────────────────────────── */
const GText = ({ children }) => (
  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
    {children}
  </span>
);

const Badge = ({ children, dark = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full border ${
      dark
        ? "bg-teal-500/15 border-teal-500/28"
        : "bg-teal-500/10 border-teal-500/28"
    } text-teal-600`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
    {children}
  </span>
);

const fade = (dir = 0, delay = 0) => ({
  initial: { opacity: 0, x: dir, y: dir === 0 ? 28 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
});

const ValueCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    {...fade(0, delay)}
    className="bg-white rounded-xl border p-5 shadow-sm"
    style={{ borderColor: C.border }}
  >
    <div
      className="w-11 h-11 rounded-xl mb-3.5 flex items-center justify-center border"
      style={{
        background:
          "linear-gradient(135deg,rgba(30,58,138,0.10),rgba(20,184,166,0.08))",
        borderColor: C.border,
      }}
    >
      <Icon size={20} color={C.tealAccent} />
    </div>
    <h4
      className="text-[14.5px] font-semibold m-0 mb-1.5"
      style={{ color: C.textPrimary }}
    >
      {title}
    </h4>
    <p
      className="text-[13px] m-0 leading-relaxed"
      style={{ color: C.textSecondary, lineHeight: 1.65 }}
    >
      {desc}
    </p>
  </motion.div>
);

/* Shared image card with gradient overlay + floating stat */
const ImageCard = ({ src, alt, stat, statLabel }) => (
  <div
    className="relative rounded-2xl overflow-hidden shadow-2xl"
    style={{ boxShadow: "0 20px 60px rgba(30,58,138,0.14)" }}
  >
    <img src={src} alt={alt} className="w-full h-[470px] object-cover block" />
    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,20,55,0.52)] via-transparent to-transparent" />
    <div
      className="absolute top-0 left-0 right-0 h-[3px]"
      style={{ background: C.gradientBrand }}
    />
    {stat && (
      <div className="absolute bottom-6 left-6 bg-white/96 rounded-xl p-3.5 px-5 shadow-lg">
        <p className="text-[26px] font-bold m-0 font-serif bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
          {stat}
        </p>
        <p
          className="text-[11.5px] m-0 mt-1 font-medium"
          style={{ color: C.textSecondary }}
        >
          {statLabel}
        </p>
      </div>
    )}
  </div>
);

/* ══════════════════════════════════════════════
   GSAP Node-Graph Canvas (hero right side)
══════════════════════════════════════════════ */
function lighten(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

const GsapCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const scriptId = "gsap-cdn-script";
    const startAnimation = () => {
      const gsap = window.gsap;
      const canvas = canvasRef.current;
      if (!gsap || !canvas) return;
      const ctx = canvas.getContext("2d");
      const W = (canvas.width =
        canvas.offsetWidth * (window.devicePixelRatio || 1));
      const H = (canvas.height =
        canvas.offsetHeight * (window.devicePixelRatio || 1));
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      const RW = canvas.offsetWidth;
      const RH = canvas.offsetHeight;

      const nodes = [
        {
          id: 0,
          x: RW * 0.5,
          y: RH * 0.5,
          r: 42,
          label: "SWC Core",
          color: "#1E3A8A",
        },
        {
          id: 1,
          x: RW * 0.5,
          y: RH * 0.13,
          r: 27,
          label: "Recruit",
          color: "#3B82F6",
        },
        {
          id: 2,
          x: RW * 0.83,
          y: RH * 0.31,
          r: 23,
          label: "Payroll",
          color: "#14B8A6",
        },
        {
          id: 3,
          x: RW * 0.83,
          y: RH * 0.69,
          r: 23,
          label: "Compliance",
          color: "#0d9488",
        },
        {
          id: 4,
          x: RW * 0.5,
          y: RH * 0.87,
          r: 27,
          label: "Analytics",
          color: "#1d4ed8",
        },
        {
          id: 5,
          x: RW * 0.17,
          y: RH * 0.69,
          r: 23,
          label: "Docs",
          color: "#3B82F6",
        },
        {
          id: 6,
          x: RW * 0.17,
          y: RH * 0.31,
          r: 23,
          label: "Attendance",
          color: "#14B8A6",
        },
        {
          id: 7,
          x: RW * 0.69,
          y: RH * 0.2,
          r: 16,
          label: "AI",
          color: "#2563EB",
        },
        {
          id: 8,
          x: RW * 0.93,
          y: RH * 0.5,
          r: 13,
          label: "API",
          color: "#0f766e",
        },
        {
          id: 9,
          x: RW * 0.31,
          y: RH * 0.2,
          r: 16,
          label: "HRIS",
          color: "#1E3A8A",
        },
      ];
      const edges = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 7],
        [2, 8],
        [1, 9],
        [3, 8],
        [4, 2],
        [5, 6],
        [6, 9],
      ];

      const state = nodes.map((n) => ({
        ...n,
        cx: n.x,
        cy: n.y,
        alpha: 0,
        pulse: 0,
        ring: 0,
      }));
      const travellers = edges.map(([a, b]) => ({
        a,
        b,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        alpha: 0,
      }));
      const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * RW,
        y: Math.random() * RH,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.3 + 0.08,
      }));

      // GSAP entrance
      const tl = gsap.timeline();
      state.forEach((s, i) => {
        tl.to(s, { alpha: 1, duration: 0.5, ease: "power2.out" }, i * 0.11);
      });
      state.slice(1).forEach((s) => {
        gsap.to(s, {
          cx: s.cx + (Math.random() - 0.5) * 16,
          cy: s.cy + (Math.random() - 0.5) * 16,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        });
      });
      gsap.to(state[0], {
        pulse: 1,
        duration: 1.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(state[0], {
        ring: 1,
        duration: 2.5,
        ease: "power1.out",
        repeat: -1,
        delay: 0.7,
      });
      gsap.to(travellers, {
        alpha: 0.88,
        duration: 0.6,
        delay: 1.1,
        stagger: 0.07,
      });

      const draw = () => {
        ctx.clearRect(0, 0, RW, RH);

        // Edges
        edges.forEach(([a, b]) => {
          const na = state[a],
            nb = state[b];
          ctx.save();
          ctx.globalAlpha = Math.min(na.alpha, nb.alpha) * 0.32;
          ctx.strokeStyle = "#3B82F6";
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 6]);
          ctx.beginPath();
          ctx.moveTo(na.cx, na.cy);
          ctx.lineTo(nb.cx, nb.cy);
          ctx.stroke();
          ctx.restore();
        });

        // Travelling dots
        travellers.forEach((tr) => {
          const na = state[tr.a],
            nb = state[tr.b];
          tr.t += tr.speed;
          if (tr.t > 1) tr.t = 0;
          const x = na.cx + (nb.cx - na.cx) * tr.t,
            y = na.cy + (nb.cy - na.cy) * tr.t;
          ctx.save();
          ctx.globalAlpha = tr.alpha * Math.min(na.alpha, nb.alpha);
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#14B8A6";
          ctx.fill();
          ctx.restore();
        });

        // Particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = RW;
          if (p.x > RW) p.x = 0;
          if (p.y < 0) p.y = RH;
          if (p.y > RH) p.y = 0;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "#3B82F6";
          ctx.fill();
          ctx.restore();
        });

        // Nodes
        state.forEach((s, i) => {
          if (s.alpha <= 0) return;
          ctx.save();
          ctx.globalAlpha = s.alpha;
          if (i === 0) {
            if (s.pulse > 0) {
              ctx.beginPath();
              ctx.arc(s.cx, s.cy, s.r + 10 + s.pulse * 20, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(59,130,246,${0.38 * (1 - s.pulse)})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            if (s.ring > 0) {
              ctx.beginPath();
              ctx.arc(s.cx, s.cy, s.r + 10 + s.ring * 38, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(20,184,166,${0.22 * (1 - s.ring)})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
          ctx.shadowColor = s.color + "60";
          ctx.shadowBlur = 18;
          const g = ctx.createRadialGradient(
            s.cx - s.r * 0.25,
            s.cy - s.r * 0.25,
            s.r * 0.1,
            s.cx,
            s.cy,
            s.r,
          );
          g.addColorStop(0, lighten(s.color, 35));
          g.addColorStop(1, s.color);
          ctx.beginPath();
          ctx.arc(s.cx, s.cy, s.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "rgba(255,255,255,0.22)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = "#fff";
          ctx.font = `${Math.max(9, s.r * 0.34)}px 'DM Sans',sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = "rgba(0,0,0,0.45)";
          ctx.shadowBlur = 4;
          ctx.fillText(s.label, s.cx, s.cy);
          ctx.restore();
        });

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    };

    if (window.gsap) {
      startAnimation();
    } else if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s.onload = startAnimation;
      document.head.appendChild(s);
    } else {
      const check = setInterval(() => {
        if (window.gsap) {
          clearInterval(check);
          startAnimation();
        }
      }, 80);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

/* ══════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════ */
const AboutPage = () => {
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
      className="font-sans overflow-x-hidden"
      style={{ background: C.bgMain, color: C.textPrimary }}
    >
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      @keyframes shimmer  { 0%,100%{opacity:0.35} 50%{opacity:0.65} }
      @keyframes spinCW   { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
      @keyframes spinCCW  { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }
    `}</style>

      {/* ═══════════════════════════════════════════
        SECTION 1  ·  HERO
        Content LEFT  |  GSAP canvas RIGHT
    ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{
          background:
            "linear-gradient(150deg,#040d26 0%,#0c1a4a 45%,#083030 100%)",
        }}
      >
        {/* Ambient blobs */}
        <div
          className="absolute -top-[140px] -left-20 w-[520px] h-[520px] rounded-full animate-[shimmer_8s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle,rgba(30,58,138,0.22) 0%,transparent 68%)",
          }}
        />
        <div
          className="absolute -bottom-25 -right-25 w-[440px] h-[440px] rounded-full animate-[shimmer_10s_ease-in-out_infinite_3s]"
          style={{
            background:
              "radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%)",
          }}
        />

        {/* Decorative rotating rings behind canvas */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none z-0">
          <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[spinCW_30s_linear_infinite]" />
          <div className="absolute inset-7 rounded-full border border-teal-500/8 animate-[spinCCW_22s_linear_infinite]" />
          <div className="absolute inset-15 rounded-full border border-blue-500/6 animate-[spinCW_18s_linear_infinite]" />
        </div>

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{ background: C.gradientBrand }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full relative z-10 py-20 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* ── LEFT: text ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge dark>About Us</Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif text-[62px] font-bold leading-[1.07] text-white mt-6 mb-5 tracking-tighter"
              >
                Redefining
                <br />
                <span className="italic text-teal-500">human</span>
                <br />
                resources.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-[17px] text-white/58 leading-relaxed max-w-[430px] mb-9"
              >
                Since 2018 we've built the HR platform that puts people at the
                centre — a connected ecosystem of intelligent tools that
                replaces fragmented workflows with one seamless experience.
              </motion.p>

              {/* Stat strip */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="flex gap-9 mb-10 pb-8 border-b border-white/10"
              >
                {[
                  { val: "500+", label: "Enterprise clients" },
                  { val: "98%", label: "Satisfaction score" },
                  { val: "£2B+", label: "Payroll processed" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p className="text-[30px] font-bold m-0 mb-0.5 text-white font-serif tracking-tighter">
                      {val}
                    </p>
                    <p className="text-[11.5px] text-white/42 m-0 font-medium tracking-wide uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42 }}
                className="flex gap-3.5 flex-wrap"
              >
                <button
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-none text-white text-sm font-semibold cursor-pointer btn-slide-bg btn-teal"
                  style={{
                    background: C.gradientBrand,
                    boxShadow: "0 6px 28px rgba(20,184,166,0.32)",
                  }}
                >
                  Book a free demo <ArrowRight size={15} />
                </button>
                <button
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium cursor-pointer backdrop-blur-md btn-slide-bg btn-outline"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                  }}
                >
                  Explore features
                </button>
              </motion.div>
            </div>

            {/* ── RIGHT: GSAP canvas ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-[520px] relative"
            >
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <GsapCanvas />
              </div>
              {/* Label chip */}
              <div
                className="absolute top-5 left-5 rounded-lg px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md"
                style={{
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.30)",
                  color: C.tealAccent,
                }}
              >
                Platform ecosystem
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
        SECTION 2  ·  OUR MISSION
        Content LEFT  |  Image RIGHT
    ═══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left – content */}
            <div>
              <motion.div {...fade(0, 0)}>
                <Badge>Our Mission</Badge>
              </motion.div>

              <motion.h2
                {...fade(0, 0.1)}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.13] mt-5 mb-4 tracking-tight"
                style={{ color: C.textPrimary }}
              >
                Built to make
                <br />
                <GText>HR human again</GText>
              </motion.h2>

              <motion.p
                {...fade(0, 0.15)}
                className="text-base leading-relaxed mb-6"
                style={{ color: C.textSecondary, lineHeight: 1.82 }}
              >
                We started with one belief: HR software should serve people, not
                the other way around. Too many organisations were drowning in
                spreadsheets while their teams suffered.
              </motion.p>

              <motion.p
                {...fade(0, 0.2)}
                className="text-base leading-relaxed mb-8"
                style={{ color: C.textSecondary, lineHeight: 1.82 }}
              >
                Our platform brings intelligent automation, compliance
                monitoring, and real-time analytics together in an experience
                people actually enjoy using.
              </motion.p>

              <motion.div {...fade(0, 0.25)} className="flex flex-col gap-3">
                {[
                  "AI-powered recruitment cuts time-to-hire by 60%",
                  "Compliance monitoring updated in real-time",
                  "Payroll integration with zero reconciliation errors",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={17}
                      color={C.tealAccent}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: C.textSecondary, lineHeight: 1.6 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right – image */}
            <motion.div {...fade(-32, 0.1)}>
              <ImageCard
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Team collaborating in a modern office"
                stat="60%"
                statLabel="Less HR admin time"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
        SECTION 3  ·  OUR VALUES
        Image LEFT  |  Content RIGHT
    ═══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: C.bgMain }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-11">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left – image */}
            <motion.div {...fade(32, 0.1)}>
              <ImageCard
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80"
                alt="Team celebrating company culture"
                stat="4.9 ★"
                statLabel="Average customer rating"
              />
            </motion.div>

            {/* Right – content */}
            <div>
              <motion.div {...fade(0, 0)}>
                <Badge>Our Values</Badge>
              </motion.div>

              <motion.h2
                {...fade(0, 0.1)}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.13] mt-5 mb-4 tracking-tight"
                style={{ color: C.textPrimary }}
              >
                What drives every
                <br />
                <GText>decision we make</GText>
              </motion.h2>

              <motion.p
                {...fade(0, 0.15)}
                className="text-base mb-8"
                style={{ color: C.textSecondary, lineHeight: 1.82 }}
              >
                Our values aren't wall posters — they're the framework behind
                every feature we ship, every partnership we build, and every
                customer we serve.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    icon: Lightbulb,
                    title: "Innovation first",
                    desc: "AI features that solve real problems, not technology for its own sake.",
                    delay: 0.18,
                  },
                  {
                    icon: Shield,
                    title: "Trust & security",
                    desc: "ISO 27001 certified, UK GDPR compliant, audited quarterly.",
                    delay: 0.23,
                  },
                  {
                    icon: Users,
                    title: "People-centred",
                    desc: "Every decision is rooted in what helps HR teams and employees thrive.",
                    delay: 0.28,
                  },
                  {
                    icon: Globe,
                    title: "Transparency",
                    desc: "Open SLAs, honest pricing, no hidden contractual surprises.",
                    delay: 0.33,
                  },
                ].map((v) => (
                  <ValueCard key={v.title} {...v} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
        SECTION 4  ·  OUR JOURNEY
        Content LEFT  |  Image RIGHT
    ═══════════════════════════════════════════ */}
      <section
        className="py-24 border-t"
        style={{
          background: C.bgSection,
          borderTopColor: C.border,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-11">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left – content + timeline */}
            <div>
              <motion.div {...fade(0, 0)}>
                <Badge>Our Journey</Badge>
              </motion.div>

              <motion.h2
                {...fade(0, 0.1)}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.13] mt-5 mb-4 tracking-tight"
                style={{ color: C.textPrimary }}
              >
                Six years building
                <br />
                <GText>the future of work</GText>
              </motion.h2>

              <motion.p
                {...fade(0, 0.15)}
                className="text-base mb-10"
                style={{ color: C.textSecondary, lineHeight: 1.82 }}
              >
                From a two-person startup in a Shoreditch co-working space to a
                team of 120 serving 500+ enterprise clients — defined by
                relentless focus on the customer.
              </motion.p>

              <div className="flex flex-col">
                {[
                  {
                    year: "2018",
                    event:
                      "Founded in London. First product: smart onboarding tool.",
                    color: C.primaryBlue,
                  },
                  {
                    year: "2020",
                    event:
                      "Launched AI-powered compliance engine. Reached 50 clients.",
                    color: C.secondaryBlue,
                  },
                  {
                    year: "2022",
                    event:
                      "Series A funding. Expanded into payroll and analytics.",
                    color: C.tealAccent,
                  },
                  {
                    year: "2024",
                    event:
                      "500+ enterprise clients. £2B+ payroll processed annually.",
                    color: C.tealHover,
                  },
                ].map(({ year, event, color }, i, arr) => (
                  <motion.div
                    key={year}
                    {...fade(0, 0.16 + i * 0.09)}
                    className="flex gap-5 relative"
                    style={{ paddingBottom: i < arr.length - 1 ? 28 : 0 }}
                  >
                    {i < arr.length - 1 && (
                      <div
                        className="absolute left-[19px] top-10 bottom-0 w-px"
                        style={{ background: C.border }}
                      />
                    )}
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                      style={{
                        background: `${color}18`,
                        borderColor: color,
                      }}
                    >
                      <Zap size={14} color={color} />
                    </div>
                    <div className="pt-2">
                      <p
                        className="text-xs font-bold mb-1 tracking-wide"
                        style={{ color, letterSpacing: "0.07em" }}
                      >
                        {year}
                      </p>
                      <p
                        className="text-sm m-0 leading-relaxed"
                        style={{ color: C.textSecondary, lineHeight: 1.65 }}
                      >
                        {event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right – image */}
            <motion.div {...fade(-32, 0.1)}>
              <ImageCard
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80"
                alt="Leadership team in a strategic meeting"
                stat="120+"
                statLabel="Team members worldwide"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
        FOOTER CTA
    ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-20 px-10 text-center"
        style={{
          background:
            "linear-gradient(135deg,#040d26 0%,#1E3A8A 55%,#083030 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: C.gradientBrand }}
        />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative z-10 max-w-[600px] mx-auto">
          <motion.div {...fade(0, 0)}>
            <Badge dark>Ready to begin?</Badge>
            <h2 className="font-serif text-[40px] font-bold text-white mt-5 mb-3.5 tracking-tighter leading-tight">
              Join 500+ organisations already transforming their HR
            </h2>
            <p className="text-base text-white/52 mb-9 leading-relaxed">
              Book a personalised demo and see what's possible.
            </p>
            <button
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border-none text-white text-[15px] font-semibold cursor-pointer"
              style={{
                background: C.gradientBrand,
                boxShadow: "0 8px 32px rgba(20,184,166,0.35)",
              }}
            >
              Book a free demo <ArrowRight size={17} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
