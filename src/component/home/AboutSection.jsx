import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Award,
  ShieldCheck,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

/* ─── Color tokens ─── */
const C = {
  primaryBlue: "#1E3A8A",
  secondaryBlue: "#3B82F6",
  tealAccent: "#14B8A6",
  tealHover: "#0d9488",
  bgMain: "#F0F4FF",
  border: "rgba(30,58,138,0.12)",
  textPrimary: "#111827",
  textSecondary: "#111827",
  gradientBrand: "linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%)",
};

/* ─── Checkmarks ─── */
const checks = [
  "Enterprise-ready, UK-specific HR platform",
  "Real-time legal guidance and compliance alerts",
  "Centralised skilled worker file management",
  "Seamless onboarding and recruitment pipeline",
  "Dedicated HR team + intelligent software",
  "Hassle-free, fully managed operations",
];

/* ─── Stats Data ─── */
const stats = [
  { value: "500+", label: "UK Businesses", icon: Users },
  { value: "98%", label: "Compliance Rate", icon: ShieldCheck },
  { value: "10K+", label: "Workers Managed", icon: TrendingUp },
  { value: "40+", label: "Countries Served", icon: Globe },
];

/* ─── Counter Animation Hook ─── */
const useCountUp = (target, duration = 1800, shouldStart = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  const isPercent = target.includes("%");
  const isPlus = target.includes("+");
  if (!shouldStart) return target;
  return `${value}${isPercent ? "%" : ""}${isPlus ? "+" : ""}`;
};

/* ─── Stat Card Component ─── */
const StatCard = ({ value, label, icon: Icon, visible }) => {
  const displayValue = useCountUp(value, 1600, visible);
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: C.border }}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500/5 to-primary-500/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-teal/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <Icon size={18} className="text-primary" strokeWidth={2} />
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent mb-1 font-sora">
          {displayValue}
        </div>
        <div className="text-xs font-medium" style={{ color: C.textSecondary }}>{label}</div>
      </div>
    </div>
  );
};

/* ─── GSAP Node-Graph Canvas (same as hero section) ─── */
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
    const scriptId = "gsap-cdn-script-about";
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

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
};

/* ─── Main About Section ─── */
const AboutSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
      // style={{ backgroundColor: C.bgMain }}
    >
      {/* Background Decorations similar to hero section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/[0.02] to-teal/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Decorative rotating rings behind canvas */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none z-0">
        <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[spinCW_30s_linear_infinite]" />
        <div className="absolute inset-7 rounded-full border border-teal-500/8 animate-[spinCCW_22s_linear_infinite]" />
        <div className="absolute inset-15 rounded-full border border-blue-500/6 animate-[spinCW_18s_linear_infinite]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - GSAP Node-Graph Canvas (same as hero) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
          
            {/* Stats floating badge */}
          
          </motion.div>

          {/* Right Side - Content with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.tealAccent }}>
                About Skilled Workers Cloud
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display',Georgia,serif", color: C.textPrimary }}>
              About Skilled Workers Cloud{" "}
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent" 
                style={{ backgroundImage: C.gradientBrand, fontFamily: 'Sora, sans-serif' }}>
                HR-Tech Excellence
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-4 leading-relaxed" style={{ color: C.textSecondary }}>
              <p>
                <strong style={{ color: C.primaryBlue }}>Skilled Workers Cloud</strong>{" "}
                is a UK HR-tech company dedicated to helping you manage your
                workforce skillfully and effectively. We specialise in
                enterprise-ready HR systems built specifically for UK
                businesses.
              </p>
              <p>
                Our new-age software and expert HR team help individuals and
                organisations stay fully compliant with legal guidance — from
                keeping employee records current to smooth, hassle-free business
                operations across every avenue.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {checks.map((check, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                  className="flex items-start gap-2.5 group cursor-pointer"
                >
                  <CheckCircle2
                    size={18}
                    className="text-teal flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors" style={{ color: C.textPrimary }}>{check}</span>
                </motion.div>
              ))}
            </div>


            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <button 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold cursor-pointer transition-all btn-slide-bg btn-teal"
                style={{
                  background: C.gradientBrand,
                  boxShadow: "0 6px 28px rgba(20,184,166,0.32)",
                }}
              >
                Learn More About Our HRMS Software 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinCW { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
      `}</style>
    </section>
  );
};

export default AboutSection;