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
    <div className="group relative overflow-hidden bg-white rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'rgba(30,58,138,0.1)' }}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-500/5 to-primary-500/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-teal/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <Icon size={18} className="text-primary" strokeWidth={2} />
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent mb-1 font-sora">
          {displayValue}
        </div>
        <div className="text-xs font-medium" style={{ color: '#6B7280' }}>{label}</div>
      </div>
    </div>
  );
};

/* ─── Main About Section ─── */
const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
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

  // Load GSAP for image animations
  useEffect(() => {
    if (visible && imageRef.current) {
      const loadGSAP = async () => {
        const gsap = (await import('gsap')).default;
        const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Main image container animation
        gsap.fromTo(imageContainerRef.current,
          { 
            opacity: 0, 
            scale: 0.85,
            rotationY: -15,
            x: -50
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Floating animation for image
        gsap.to(imageRef.current, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
        
        // Animate decorative circles
        gsap.utils.toArray('.deco-circle').forEach((circle, i) => {
          gsap.to(circle, {
            scale: 1.1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.3
          });
        });
        
        // Animate floating badges
        gsap.utils.toArray('.floating-badge').forEach((badge, i) => {
          gsap.to(badge, {
            y: -20,
            x: i % 2 === 0 ? 10 : -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.2
          });
        });
      };
      
      loadGSAP();
    }
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#F0F4FF' }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/[0.02] to-teal/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Simple Image with GSAP Animation */}
          <div ref={imageContainerRef} className="relative opacity-0">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-teal/30 z-10" />
              
              {/* Main Image */}
              <div ref={imageRef} className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                  alt="HR Team collaborating"
                  className="w-full h-auto object-cover rounded-3xl"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
              
              {/* Animated Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-teal/30 pointer-events-none deco-circle" />
              
              {/* Floating Badge 1 - Top Right */}
              <div className="floating-badge absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl z-20" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Trust Score</div>
                    <div className="text-xl font-bold text-primary">4.9/5</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge 2 - Bottom Left */}
              <div className="floating-badge absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl z-20" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-primary flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Active Users</div>
                    <div className="text-xl font-bold text-teal">10,000+</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge 3 - Middle Right */}
              <div className="floating-badge absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl z-20" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)', animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-blue to-primary flex items-center justify-center">
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Security</div>
                    <div className="text-xl font-bold text-secondary-blue">ISO 27001</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Circles */}
            <div className="deco-circle absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="deco-circle absolute -bottom-6 -right-6 w-32 h-32 bg-teal/10 rounded-full blur-xl" style={{ animationDelay: '0.5s' }} />
            
            {/* Stats Overlay (Mobile) */}
            <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} visible={visible} />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-6 transition-all duration-700 transform ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ backgroundColor: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#14B8A6' }}>
                About Skilled Workers Cloud
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: 'Sora, sans-serif', color: '#111827' }}>
              About Skilled Workers Cloud{" "}
              <span className=" from-primary to-teal bg-clip-text text-transparent "
              style={{ backgroundImage: "var(--gradient-brand)" }}
              >
               HR-Tech Excellence
              </span>{" "}
              
            </h2>

            {/* Description */}
            <div className="space-y-4 leading-relaxed" style={{ color: '#6B7280' }}>
              <p>
                <strong style={{ color: '#1E3A8A' }}>Skilled Workers Cloud</strong>{" "}
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
                <div
                  key={idx}
                  className="flex items-start gap-2.5 group cursor-pointer"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <CheckCircle2
                    size={18}
                    className="text-teal flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors" style={{ color: '#111827' }}>{check}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button className="btn btn-slide-bg inline-flex items-center gap-2 group">
                Learn More About Our HRMS Software 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

           
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .deco-circle {
          animation: pulse 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;