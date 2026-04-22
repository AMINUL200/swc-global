import React from 'react'
import { ArrowRight, Play, ShieldCheck, Users, Briefcase } from 'lucide-react'

const ServiceHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F4FF] via-white to-[#F0F4FF] pt-20 py-8 md:py-10">
      {/* Background decorative elements */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-gradient-radial from-blue-900/5 to-transparent blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-[600px] h-[600px] rounded-full bg-gradient-radial from-teal-500/6 to-transparent blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-900/15 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-blue-900 font-sora">
                Trusted HR Partner
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter mb-6 font-sora">
              <span className="text-gray-900">Smart HR for</span>
              <br />
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-teal-500 bg-clip-text text-transparent">
                Modern Workplaces
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-dm-sans">
              Transform your HR operations with our all-in-one platform. From compliance tracking to employee management, we help UK businesses stay ahead.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mb-10">
              {[
                { value: "500+", label: "Happy Clients", icon: Users },
                { value: "50K+", label: "Employees Managed", icon: Briefcase },
                { value: "99.9%", label: "Compliance Rate", icon: ShieldCheck },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/10 to-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={20} className="text-blue-900" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900 font-sora">{stat.value}</div>
                    <div className="text-xs text-gray-400 font-dm-sans">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-600 text-white font-sora text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105">
                Get Started Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 text-blue-900 font-sora text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" style={{ borderColor: "rgba(30,58,138,0.15)" }}>
                <Play size={14} fill="currentColor" />
                Watch Demo
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400 font-dm-sans">Trusted by 500+ UK businesses</span>
            </div>
          </div>

          {/* Right Side - Simple Static Image */}
          <div className="flex-1">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Simple image container - Replace src with your actual image */}
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="HR Team collaborating"
                className="w-full h-auto object-cover"
              />
              
              {/* Simple overlay badge at bottom */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-900 to-teal-500 border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 font-sora">Trusted by industry leaders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero