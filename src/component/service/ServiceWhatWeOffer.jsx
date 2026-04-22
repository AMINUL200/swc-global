import React from 'react'
import { 
  Briefcase, 
  Building2, 
  Users, 
  Link, 
  Cloud, 
  ArrowRight,
  Monitor,
  Smartphone,
  Workflow,
  FileText,
  BarChart3,
  Database,
  RefreshCw,
  Server,
  Zap
} from 'lucide-react'

const ServiceWhatWeOffer = () => {
  const services = [
    {
      id: 1,
      icon: Briefcase,
      title: "Custom Business Software",
      description: "Build bespoke applications that perfectly align with your business processes and goals.",
      features: ["Desktop Software", "Mobile Apps"],
      color: "#1E3A8A",
      lightBg: "rgba(30,58,138,0.10)",
      borderColor: "rgba(30,58,138,0.15)"
    },
    {
      id: 2,
      icon: Building2,
      title: "Enterprise Software Solutions",
      description: "Scalable enterprise-grade systems designed for large organizations and complex workflows.",
      features: ["Workflow Automation", "Document Management", "Business Intelligence"],
      color: "#14B8A6",
      lightBg: "rgba(20,184,166,0.10)",
      borderColor: "rgba(20,184,166,0.15)"
    },
    {
      id: 3,
      icon: Users,
      title: "CRM & ERP Systems",
      description: "Comprehensive customer relationship and enterprise resource planning solutions.",
      features: ["Customer Management", "Resource Planning", "Analytics & Reporting"],
      color: "#3B82F6",
      lightBg: "rgba(59,130,246,0.10)",
      borderColor: "rgba(59,130,246,0.15)"
    },
    {
      id: 4,
      icon: Link,
      title: "API Development & Integration",
      description: "Connect your systems seamlessly with custom API development and third-party integrations.",
      features: ["RESTful APIs", "Third-party Integration", "Microservices"],
      color: "#8B5CF6",
      lightBg: "rgba(139,92,246,0.10)",
      borderColor: "rgba(139,92,246,0.15)"
    },
    {
      id: 5,
      icon: Cloud,
      title: "Cloud-Based Applications",
      description: "Modern cloud-native applications leveraging AWS, Azure, and Google Cloud.",
      features: ["Scalable Infrastructure", "Multi-tenant SaaS", "Cloud Migration"],
      color: "#F59E0B",
      lightBg: "rgba(245,158,11,0.10)",
      borderColor: "rgba(245,158,11,0.15)"
    }
  ]

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-[#F0F4FF]/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-blue-900/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-teal-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-900/15 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-900 font-sora">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-4 font-sora">
            <span className="text-gray-900">What We</span>
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-teal-500 bg-clip-text text-transparent"> Offer</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-dm-sans max-w-2xl mx-auto">
            Comprehensive software development services tailored to your business needs
          </p>
        </div>

        {/* Cards Grid - Top row 2 cards, bottom row 3 cards */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Top Row - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.slice(0, 2).map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: service.borderColor }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: service.lightBg }}
                >
                  <service.icon size={28} color={service.color} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-sora">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 font-dm-sans leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="flex  gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ background: service.lightBg, color: service.color }}
                    >
                      {feature === "Desktop Software" && <Monitor size={12} />}
                      {feature === "Mobile Apps" && <Smartphone size={12} />}
                      {feature === "Workflow Automation" && <Workflow size={12} />}
                      {feature === "Document Management" && <FileText size={12} />}
                      {feature === "Business Intelligence" && <BarChart3 size={12} />}
                      {feature === "Customer Management" && <Users size={12} />}
                      {feature === "Resource Planning" && <Database size={12} />}
                      {feature === "Analytics & Reporting" && <BarChart3 size={12} />}
                      {feature === "RESTful APIs" && <Link size={12} />}
                      {feature === "Third-party Integration" && <RefreshCw size={12} />}
                      {feature === "Microservices" && <Zap size={12} />}
                      {feature === "Scalable Infrastructure" && <Server size={12} />}
                      {feature === "Multi-tenant SaaS" && <Cloud size={12} />}
                      {feature === "Cloud Migration" && <RefreshCw size={12} />}
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Learn More link */}
                <button className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3" style={{ color: service.color }}>
                  Learn More
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.slice(2, 5).map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: service.borderColor }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: service.lightBg }}
                >
                  <service.icon size={28} color={service.color} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-sora">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 font-dm-sans leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="flex flex-col gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ background: service.lightBg, color: service.color }}
                    >
                      {feature === "Customer Management" && <Users size={12} />}
                      {feature === "Resource Planning" && <Database size={12} />}
                      {feature === "Analytics & Reporting" && <BarChart3 size={12} />}
                      {feature === "RESTful APIs" && <Link size={12} />}
                      {feature === "Third-party Integration" && <RefreshCw size={12} />}
                      {feature === "Microservices" && <Zap size={12} />}
                      {feature === "Scalable Infrastructure" && <Server size={12} />}
                      {feature === "Multi-tenant SaaS" && <Cloud size={12} />}
                      {feature === "Cloud Migration" && <RefreshCw size={12} />}
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Learn More link */}
                <button className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3" style={{ color: service.color }}>
                  Learn More
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceWhatWeOffer