import React, { useEffect, useRef, useState } from "react";
import {
  Cloud,
  Shield,
  Gavel,
  Smile,
  Headphones,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      title: "Cloud-based",
      description: "Access your HR platform anytime, anywhere with our secure cloud infrastructure. Scale effortlessly as your business grows.",
      icon: Cloud,
      color: "#1E3A8A",
      lightColor: "#E0E7FF",
      gradient: "from-blue-600 to-indigo-600",
      tags: ["99.9% Uptime", "Auto-scaling", "Global Access", "Real-time Sync"],
      cta: "Learn More",
    },
    {
      id: 2,
      title: "UK-compliant",
      description: "Fully compliant with UK employment laws, GDPR, and industry regulations. Stay audit-ready with automated compliance tracking.",
      icon: Gavel,
      color: "#14B8A6",
      lightColor: "#CCFBF1",
      gradient: "from-teal-500 to-emerald-500",
      tags: ["GDPR Ready", "RTW Checks", "Legal Updates", "Audit Trails"],
      cta: "Start Reading Now",
    },
    {
      id: 3,
      title: "Secure",
      description: "Enterprise-grade security with end-to-end encryption, multi-factor authentication, and regular security audits.",
      icon: Shield,
      color: "#8B5CF6",
      lightColor: "#EDE9FE",
      gradient: "from-purple-500 to-pink-500",
      tags: ["256-bit Encryption", "MFA", "ISO Certified", "Data Backup"],
      cta: "Learn More",
    },
    {
      id: 4,
      title: "Easy to use",
      description: "Intuitive interface designed for everyone. Get started in minutes with our user-friendly platform and guided onboarding.",
      icon: Smile,
      color: "#F59E0B",
      lightColor: "#FEF3C7",
      gradient: "from-amber-500 to-orange-500",
      tags: ["No Training Needed", "Quick Setup", "Drag & Drop", "User Friendly"],
      cta: "Learn More",
    },
    {
      id: 5,
      title: "Dedicated support",
      description: "Expert support team available 24/7 to help you succeed. Get personalized assistance whenever you need it.",
      icon: Headphones,
      color: "#EC4899",
      lightColor: "#FCE7F3",
      gradient: "from-pink-500 to-rose-500",
      tags: ["24/7 Available", "UK-based Team", "SLA Guarantee", "Priority Support"],
      cta: "Learn More",
    },
  ];

  // Split features into two rows
  const firstRowFeatures = features.slice(0, 3);
  const secondRowFeatures = features.slice(3, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  // Helper component for rendering cards
  const FeatureCard = ({ feature, isHovered, onHover, onLeave }) => (
    <div 
      className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Top Gradient Bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${
        isHovered ? "opacity-100" : "opacity-70"
      }`} />

      <div className="p-6">
        {/* Icon Section */}
        <div className="relative mb-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-xl opacity-20 transition-opacity duration-500 ${
            isHovered ? "opacity-40" : "opacity-20"
          }`} />
          <div
            className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: feature.lightColor }}
          >
            <feature.icon size={26} color={feature.color} strokeWidth={1.8} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {feature.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: feature.lightColor, color: feature.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Link */}
        <div className="pt-3 border-t border-gray-100">
          <button
            className="group/btn inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: feature.color }}
          >
            <span>{feature.cta}</span>
            <ArrowRight
              size={14}
              className="transition-all duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Hover Corner Accent */}
      <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 transition-all duration-500 ${
        isHovered ? "opacity-10 scale-100" : "scale-50"
      }`} />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
      // style={{ backgroundColor: '#F8FAFC' }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/[0.02] to-teal/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6" 
               style={{ backgroundColor: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal">Why Choose Us</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Sora, sans-serif', color: '#111827' }}>
            Why Choose{" "}
            <span className=" bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}>
              Our Platform?
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Experience the perfect combination of power, security, and simplicity. 
            Built for modern businesses that demand excellence.
          </p>
        </motion.div>

        {/* First Row - 3 Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10"
        >
          {firstRowFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group relative transition-all duration-500"
            >
              <FeatureCard
                feature={feature}
                isHovered={hoveredCard === feature.id}
                onHover={() => setHoveredCard(feature.id)}
                onLeave={() => setHoveredCard(null)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - 2 Cards with Wider Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center"
        >
          {secondRowFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group relative transition-all duration-500 w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)]"
            >
              <FeatureCard
                feature={feature}
                isHovered={hoveredCard === feature.id}
                onHover={() => setHoveredCard(feature.id)}
                onLeave={() => setHoveredCard(null)}
              />
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
};

export default WhyChooseUs;