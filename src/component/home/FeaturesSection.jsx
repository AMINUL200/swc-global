import React, { useEffect, useRef, useState } from "react";
import {
  Zap,
  TrendingUp,
  ArrowRight,
  Briefcase,
  FolderOpen,
  Shield,
  MapPin,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const featuresData = [
  {
    id: 1,
    title: "Intelligent Recruitment",
    description:
      "Comprehensive Human Resource Management System with employee lifecycle management, performance tracking and automated workflows.",
    stats: "60% faster hiring",
    icon: Zap,
    color: "#1E3A8A",
    lightColor: "#E0E7FF",
    gradient: "from-blue-600 to-indigo-600",
    tags: ["AI Screening", "Smart Matching", "Interview Scheduling", "Offer Management"],
  },
  {
    id: 2,
    title: "HRMS Features",
    description:
      "Comprehensive Human Resource Management System with employee lifecycle management, performance tracking, and automated workflow.",
    stats: "98% efficiency gain",
    icon: Briefcase,
    color: "#14B8A6",
    lightColor: "#CCFBF1",
    gradient: "from-teal-500 to-emerald-500",
    tags: ["Employee Database", "Payroll Integration", "Performance Reviews", "Training Management"],
  },
  {
    id: 3,
    title: "Smart Document Hub",
    description:
      "AI-driven document management with automatic categorization, smart search, and secure cloud storage.",
    stats: "98% efficiency gain",
    icon: FolderOpen,
    color: "#3B82F6",
    lightColor: "#DBEAFE",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["AI Categorization", "Smart Search", "Version Control", "Secure Cloud"],
  },
  {
    id: 4,
    title: "Compliance Guardian",
    description:
      "Automated compliance monitoring with real-time regulatory updates and AI-powered risk detection.",
    stats: "98% efficiency gain",
    icon: Shield,
    color: "#8B5CF6",
    lightColor: "#EDE9FE",
    gradient: "from-purple-500 to-pink-500",
    tags: ["RTW Checks", "Compliance Audits", "Legal Updates", "Risk Detection"],
  },
  {
    id: 5,
    title: "Attendance Pro",
    description:
      "Real-time tracking with geofencing, biometric integration, and predictive absence management.",
    stats: "98% efficiency gain",
    icon: MapPin,
    color: "#F59E0B",
    lightColor: "#FEF3C7",
    gradient: "from-amber-500 to-orange-500",
    tags: ["Geofencing", "Biometric Integration", "Predictive Analytics", "Overtime AI"],
  },
  {
    id: 6,
    title: "Insights Dashboard",
    description:
      "Interactive analytics with predictive insights, custom KPI tracking, and automated reporting.",
    stats: "98% efficiency gain",
    icon: BarChart3,
    color: "#EC4899",
    lightColor: "#FCE7F3",
    gradient: "from-pink-500 to-rose-500",
    tags: ["Predictive Analytics", "Custom KPIs", "Real-time Insights", "Automated Reports"],
  },
];

const FeaturesSection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-white" >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/[0.02] to-teal/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 transform ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4" style={{ backgroundColor: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal">Platform Features</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif', color: '#111827' }}>
            Everything you need in{" "}
            <span className="bg-clip-text text-transparent block"
            style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              One Complete Platform
            </span>
          </h2>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Comprehensive HR solutions designed for modern UK businesses.
            Streamline operations, ensure compliance, and drive growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature, idx) => (
            <div
              key={feature.id}
              className={`group transition-all duration-500 transform ${
                visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Premium Card */}
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                
                {/* Top Gradient Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${
                  hoveredId === feature.id ? "opacity-100" : "opacity-70"
                }`} />
                
                <div className="p-6">
                  {/* Icon with Premium Circle Background */}
                  <div className="relative mb-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-20 transition-opacity duration-500 ${
                      hoveredId === feature.id ? "opacity-40" : "opacity-20"
                    }`} />
                    <div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: feature.lightColor }}
                    >
                      <feature.icon size={26} color={feature.color} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Title & Stats Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold leading-tight" style={{ color: '#111827' }}>
                      {feature.title}
                    </h3>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-primary/5 to-teal/5 flex-shrink-0">
                      <Sparkles size={10} className="text-teal" />
                      <span className="text-[11px] font-bold text-primary whitespace-nowrap">{feature.stats}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {feature.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {feature.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-1 rounded-md transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: feature.lightColor, color: feature.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Explore Link */}
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      className="group/btn inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                      style={{ color: feature.color }}
                    >
                      <span>Explore Feature</span>
                      <ArrowRight
                        size={14}
                        className="transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </div>

                {/* Hover Corner Accent */}
                <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 transition-all duration-500 ${
                  hoveredId === feature.id ? "opacity-10 scale-100" : "scale-50"
                }`} />
              </div>
            </div>
          ))}
        </div>

       
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;