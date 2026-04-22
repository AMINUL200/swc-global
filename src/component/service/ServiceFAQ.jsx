import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react'

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "What types of software development services do you offer?",
      answer: "We offer comprehensive software development services including custom business software, enterprise solutions, CRM & ERP systems, API development & integration, and cloud-based applications. Our team specializes in building scalable, secure, and high-performance solutions tailored to your specific business needs."
    },
    {
      id: 2,
      question: "How long does it typically take to develop a custom software solution?",
      answer: "The timeline varies depending on the complexity and scope of the project. A simple MVP can take 2-3 months, while enterprise-level solutions may take 6-12 months. We work with you to establish realistic milestones and provide regular updates throughout the development process."
    },
    {
      id: 3,
      question: "Do you provide ongoing maintenance and support after launch?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your software runs smoothly. This includes bug fixes, security updates, performance monitoring, feature enhancements, and 24/7 technical support based on your chosen service level agreement."
    },
    {
      id: 4,
      question: "What technologies and frameworks do you specialize in?",
      answer: "We work with modern tech stacks including React, Angular, Vue.js for frontend; Node.js, Python, Java, .NET for backend; and cloud platforms like AWS, Azure, and Google Cloud. We also specialize in mobile development using React Native and Flutter."
    },
    {
      id: 5,
      question: "How do you ensure the security of our software?",
      answer: "Security is our top priority. We implement industry best practices including encryption, secure authentication, regular security audits, penetration testing, and compliance with GDPR and other regulations. Our team follows OWASP guidelines and conducts thorough code reviews."
    },
    {
      id: 6,
      question: "Can you integrate with our existing systems and third-party tools?",
      answer: "Absolutely! We specialize in API development and system integration. Whether you need to connect with CRMs, ERPs, payment gateways, or legacy systems, we ensure seamless data flow and interoperability between all your business applications."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#F0F4FF]/50 via-white to-[#F0F4FF]/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-blue-900/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-teal-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-900/15 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-900 font-sora">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-4 font-sora">
            <span className="text-gray-900">Frequently Asked</span>
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-teal-500 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-dm-sans max-w-2xl mx-auto">
            Everything you need to know about our software development services
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="group bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: "rgba(30,58,138,0.1)" }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 pr-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-900/10 to-teal-500/10 flex items-center justify-center">
                    <HelpCircle size={14} className="text-blue-900" />
                  </div>
                  <span className="text-base md:text-lg font-semibold text-gray-900 font-sora">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  style={{ color: "#1E3A8A" }}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="pl-9">
                    <p className="text-gray-500 font-dm-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  )
}

export default ServiceFAQ