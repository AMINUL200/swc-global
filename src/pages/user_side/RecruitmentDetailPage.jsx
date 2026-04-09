import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Briefcase, DollarSign,
  Users, Building, Calendar, CheckCircle, Star,
  Share2, Bookmark, ArrowRight, Upload, X,
  Globe, Award, TrendingUp, Zap, Send, User,
  Mail, Phone, FileText, ChevronDown, AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Brand tokens as Tailwind config equivalent (kept for gradients) ── */
const C = {
  primaryBlue:   "#1E3A8A",
  secondaryBlue: "#3B82F6",
  tealAccent:    "#14B8A6",
  tealHover:     "#0d9488",
  bgMain:        "#F0F4FF",
  bgSection:     "#F8FAFC",
  bgCard:        "#FFFFFF",
  border:        "rgba(30,58,138,0.12)",
  textPrimary:   "#111827",
  textSecondary: "#6B7280",
  gradientBrand: "linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%)",
  gradientText:  "linear-gradient(135deg,#1E3A8A,#14B8A6)",
};

/* ── Helpers ──────────────────────────── */
const GText = ({ children }) => (
  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
    {children}
  </span>
);

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const fwV = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
});

/* ── Dummy job data ───────────────────── */
const JOB = {
  id: 1,
  title: "Senior HR Business Partner",
  company: "TechScale Ltd",
  logo: "T",
  logoColor: "#1E3A8A",
  location: "London, UK (Hybrid — 3 days office)",
  type: "Full-time",
  salary: "£65,000 – £80,000 per annum",
  category: "HR",
  posted: "April 2, 2025",
  deadline: "April 30, 2025",
  applicants: 47,
  views: "1,284",
  urgent: true,
  experience: "5–8 years",
  education: "CIPD Level 5+ or equivalent",
  industry: "Technology",
  companySize: "200–500 employees",
  companyAbout: "TechScale Ltd is a fast-growing UK-based SaaS company helping mid-market businesses automate their operations. Backed by Series B funding, we're scaling from 300 to 500 employees in 2025 and need a strategic HR Business Partner to help us grow the right way.",
  about: "We are looking for an experienced Senior HR Business Partner to join our People team at a pivotal moment in our growth journey. Reporting directly to the Chief People Officer, you will act as a trusted advisor to senior leaders across Engineering, Product, and Go-to-Market, partnering on everything from organisational design and workforce planning to performance management and employee relations.",
  responsibilities: [
    "Partner with C-suite and senior leaders to develop and execute people strategies aligned to business objectives",
    "Lead complex employee relations cases including disciplinary, grievance, and performance management",
    "Drive organisational design initiatives including restructures, workforce planning, and change management",
    "Analyse people data and metrics to identify trends and deliver actionable insights to leadership",
    "Collaborate with Talent Acquisition on workforce planning, succession planning, and talent pipeline development",
    "Champion Diversity, Equity & Inclusion initiatives across your client groups",
    "Lead annual processes including performance reviews, pay reviews, and engagement surveys",
    "Coach and develop line managers to build a high-performance, inclusive culture",
  ],
  requirements: [
    "5–8 years of progressive HR Business Partner experience, ideally in technology or high-growth environments",
    "CIPD Level 5 qualification or equivalent HR degree; Level 7 preferred",
    "Proven track record of influencing senior stakeholders and managing complex ER cases",
    "Strong analytical skills with experience using HRIS platforms (Workday, BambooHR, or similar)",
    "Excellent knowledge of UK employment law and best practice HR frameworks",
    "Experience leading organisational change and supporting business transformation",
    "Strong commercial acumen with the ability to translate business needs into people solutions",
  ],
  niceToHave: [
    "Experience in a Series A–C funded technology company",
    "Exposure to international expansion and multi-jurisdiction HR",
    "Coaching qualification (ILM, ICF, or similar)",
  ],
  benefits: [
    "£65,000–£80,000 base salary DOE",
    "25 days annual leave + bank holidays",
    "Hybrid working (3 days London office)",
    "Private medical & dental insurance",
    "£2,000 annual L&D budget",
    "EMI share options scheme",
    "Enhanced maternity & paternity leave",
    "Flexible start time (8am–10am)",
  ],
  skills: ["HRBP", "Employment Law", "Workday", "OD", "Change Management", "DEI", "Coaching", "Analytics"],
};

const SIMILAR = [
  { id: 2, title: "HR Director",           company: "GrowthCo",       salary: "£90,000–£110,000", location: "London", type: "Full-time", logo: "G", logoColor: "#14B8A6", posted: "1 day ago" },
  { id: 3, title: "People Partner",         company: "CloudBase",      salary: "£55,000–£65,000",  location: "Remote",  type: "Remote",    logo: "C", logoColor: "#7C3AED", posted: "3 days ago" },
  { id: 4, title: "HR Business Partner",    company: "ScaleUp Inc",    salary: "£50,000–£62,000",  location: "Manchester", type: "Hybrid", logo: "S", logoColor: "#F59E0B", posted: "5 days ago" },
];

/* ── Type badge style ─────────────────── */
const typeBg = {
  "Full-time": "bg-blue-50 text-[#1E3A8A] border-blue-200",
  "Hybrid":    "bg-teal-50 text-teal-700 border-teal-200",
  "Remote":    "bg-purple-50 text-purple-700 border-purple-200",
};

/* ══════════════════════════════════════
   RECRUITMENT DETAIL PAGE
══════════════════════════════════════ */
const RecruitmentDetailPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName:       "",
    email:          "",
    phone:          "",
    coverLetter:    "",
    currentSalary:  "",
    expectedSalary: "",
    noticePeriod:   "immediate",
  });

  const [focused,    setFocused]    = useState(null);
  const [cvFile,     setCvFile]     = useState(null);
  const [sending,    setSending]    = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [toast,      setToast]      = useState(null);
  const [saved,      setSaved]      = useState(false);
  const [activeTab,  setActiveTab]  = useState("overview");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setCvFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setCvFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cvFile) { setToast({ type: "error", msg: "Please upload your CV to continue." }); setTimeout(() => setToast(null), 4000); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1800);
  };

  const tb  = typeBg[JOB.type] ?? typeBg["Full-time"];
  const tabs = ["overview", "requirements", "benefits"];

  const getInputClasses = (fieldName) => {
    const base = "w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 bg-[#F0F4FF] font-inherit";
    const border = focused === fieldName 
      ? "border-[#14B8A6] ring-2 ring-[#14B8A6]/20" 
      : "border border-[rgba(30,58,138,0.12)]";
    return `${base} ${border}`;
  };

  return (
    <div className="font-sans bg-[#F0F4FF] text-gray-900 overflow-x-hidden">
      <style>{`
        @keyframes spin    { to{ transform:rotate(360deg); } }
        @keyframes shimmer { 0%,100%{opacity:0.28} 50%{opacity:0.55} }
        @keyframes confetti { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(-80px) rotate(180deg);opacity:0} }
      `}</style>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18 }}
            className={`fixed top-6 right-6 z-[999] flex items-center gap-2.5 rounded-xl shadow-xl min-w-[300px] ${
              toast.type === "error" ? "bg-gradient-to-r from-[#4a1010] to-[#2d1010] border border-red-500/35" : "bg-gradient-to-r from-[#0B1437] to-[#111D4A] border border-teal-500/35"
            } p-3.5`}
          >
            {toast.type === "error" ? <AlertCircle size={17} className="text-red-500" /> : <CheckCircle size={17} className="text-[#14B8A6]" />}
            <p className="m-0 text-sm text-white font-medium">{toast.msg}</p>
            <button onClick={() => setToast(null)} className="bg-none border-none cursor-pointer text-white/45 ml-auto p-0">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040d26] via-[#0c1a4a] to-[#083030] pt-20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="absolute -top-20 -right-16 w-[400px] h-[400px] rounded-full bg-gradient-radial from-blue-500/20 to-transparent blur-[55px] animate-[shimmer_8s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#14B8A6]" />

        <div className="max-w-7xl mx-auto px-11 relative z-10">
          {/* Back */}
          <motion.button {...fw(0)} whileHover={{ x: -3 }}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-semibold text-white/60 mb-8 p-0 font-inherit"
            onClick={()=> navigate(-1)}
          >
            <ArrowLeft size={15} /> Back to jobs
          </motion.button>

          {/* Job header card — overlaps into content area */}
          <motion.div {...fw(0.08)} className="bg-white/5 border border-white/10 rounded-t-2xl p-9 pb-10 backdrop-blur-md">
            <div className="flex items-start justify-between gap-5 flex-wrap">

              {/* Left: identity */}
              <div className="flex gap-5 items-start">
                <div className="w-[72px] h-[72px] rounded-xl flex-shrink-0 flex items-center justify-center text-3xl font-extrabold text-white font-serif shadow-lg"
                  style={{ background: `${JOB.logoColor}22`, border: `2px solid ${JOB.logoColor}40`, boxShadow: `0 0 24px ${JOB.logoColor}30` }}
                >
                  {JOB.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <span className={`text-[11px] font-bold tracking-wide uppercase px-3 py-0.5 rounded-full border ${tb}`}>{JOB.type}</span>
                    {JOB.urgent && (
                      <span className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wide uppercase text-amber-300 bg-amber-300/15 border border-amber-300/30 px-2.5 py-0.5 rounded-full">
                        <Zap size={9} className="text-amber-300" /> Urgent
                      </span>
                    )}
                    <span className="text-xs text-white/40 flex items-center gap-1.5">
                      <Users size={11} className="text-white/40" /> {JOB.applicants} applicants
                    </span>
                  </div>
                  <h1 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight tracking-tight text-white m-0 mb-2">
                    {JOB.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-white/60 text-[15px]">
                    <Building size={14} className="text-[#14B8A6]" /> {JOB.company}
                    <span className="text-white/25 mx-1">·</span>
                    <MapPin size={14} className="text-[#14B8A6]" /> {JOB.location}
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex gap-2.5 items-center">
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={() => setSaved(!saved)}
                  className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center cursor-pointer border ${
                    saved ? "bg-teal-500/15 border-teal-500/30" : "bg-white/10 border-white/15"
                  }`}
                >
                  <Bookmark size={17} className={saved ? "text-[#14B8A6]" : "text-white/60"} fill={saved ? "#14B8A6" : "none"} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                  className="w-[42px] h-[42px] rounded-xl bg-white/10 border border-white/15 flex items-center justify-center cursor-pointer"
                >
                  <Share2 size={17} className="text-white/60" />
                </motion.button>
              </div>
            </div>

            {/* Meta strip */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-white/10 flex-wrap">
              {[
                { icon: DollarSign, label: "Salary",        val: JOB.salary        },
                { icon: Briefcase,  label: "Experience",    val: JOB.experience    },
                { icon: Award,      label: "Education",     val: JOB.education     },
                { icon: Calendar,   label: "Deadline",      val: JOB.deadline      },
                { icon: Globe,      label: "Industry",      val: JOB.industry      },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold tracking-wider uppercase text-white/35 flex items-center gap-1">
                    <Icon size={10} className="text-white/35" /> {label}
                  </span>
                  <span className="text-sm font-semibold text-white/85">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MAIN: JOB DETAILS + APPLICATION FORM
      ══════════════════════════════════ */}
      <section className="bg-[#F0F4FF] pb-20">
        <div className="max-w-7xl mx-auto px-11">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-9 items-start">

            {/* ── LEFT: Job details ── */}
            <div>
              {/* White content card */}
              <div className="bg-white border border-[rgba(30,58,138,0.12)] rounded-b-2xl shadow-md overflow-hidden">
                {/* Tab navigation */}
                <div className="flex border-b border-[rgba(30,58,138,0.12)] px-8">
                  {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`py-4.5 px-5 bg-transparent border-none cursor-pointer font-inherit text-sm font-medium capitalize transition-all duration-150 ${
                        activeTab === tab ? "text-[#1E3A8A] font-bold border-b-2 border-[#1E3A8A]" : "text-gray-500 border-b-2 border-transparent"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-9">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        {/* About company */}
                        <div className="mb-9">
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-3.5 tracking-tight">
                            About <GText>{JOB.company}</GText>
                          </h3>
                          <div className="flex gap-4 mb-4 flex-wrap">
                            {[
                              { icon: Building, label: JOB.companySize + " employees" },
                              { icon: Globe,    label: JOB.industry                  },
                              { icon: TrendingUp, label: "Series B"                  },
                            ].map(({ icon: Icon, label }) => (
                              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500 bg-[#F0F4FF] border border-[rgba(30,58,138,0.12)] rounded-full px-3 py-1">
                                <Icon size={12} className="text-[#14B8A6]" /> {label}
                              </div>
                            ))}
                          </div>
                          <p className="text-[15px] text-gray-500 leading-relaxed m-0">{JOB.companyAbout}</p>
                        </div>

                        {/* About role */}
                        <div className="mb-9">
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-3.5 tracking-tight">
                            About the Role
                          </h3>
                          <p className="text-[15px] text-gray-500 leading-relaxed m-0">{JOB.about}</p>
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-9">
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-4 tracking-tight">
                            Key Responsibilities
                          </h3>
                          <div className="flex flex-col gap-2.5">
                            {JOB.responsibilities.map((r, i) => (
                              <motion.div key={i} {...fwV(i * 0.04)} className="flex gap-3 items-start">
                                <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-teal-500/15 to-blue-900/10 border border-teal-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle size={11} className="text-[#14B8A6]" />
                                </div>
                                <p className="text-[14.5px] text-gray-500 m-0 leading-relaxed">{r}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-3.5 tracking-tight">
                            Key Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {JOB.skills.map(s => (
                              <span key={s} className="text-xs font-semibold text-[#1E3A8A] bg-blue-900/10 border border-blue-900/20 px-3.5 py-1.5 rounded-full">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "requirements" && (
                      <motion.div key="requirements" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        <div className="mb-9">
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-4">
                            Essential Requirements
                          </h3>
                          <div className="flex flex-col gap-3">
                            {JOB.requirements.map((r, i) => (
                              <div key={i} className="flex gap-3.5 items-start p-3.5 bg-[#F8FAFC] border border-[rgba(30,58,138,0.12)] rounded-xl">
                                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-extrabold text-white font-serif" style={{ background: C.gradientBrand }}>
                                  {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="text-[14.5px] text-gray-500 m-0 leading-relaxed">{r}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-4">
                            Nice to Have
                          </h3>
                          <div className="flex flex-col gap-2.5">
                            {JOB.niceToHave.map((r, i) => (
                              <div key={i} className="flex gap-3 items-start">
                                <Star size={14} className="text-[#14B8A6] flex-shrink-0 mt-0.5" />
                                <p className="text-[14.5px] text-gray-500 m-0 leading-relaxed">{r}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "benefits" && (
                      <motion.div key="benefits" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        <h3 className="font-serif text-xl font-bold text-gray-900 m-0 mb-5">
                          What We Offer
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {JOB.benefits.map((b, i) => (
                            <div key={i} className="flex gap-3 items-start p-4 bg-[#F8FAFC] border border-[rgba(30,58,138,0.12)] rounded-xl">
                              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border border-teal-500/20" style={{ background: "linear-gradient(135deg,rgba(20,184,166,0.12),rgba(30,58,138,0.08))" }}>
                                <CheckCircle size={14} className="text-[#14B8A6]" />
                              </div>
                              <p className="text-sm text-gray-900 font-medium m-0 leading-relaxed">{b}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Similar jobs */}
              <motion.div {...fwV(0)} className="mt-9">
                <h3 className="font-serif text-[22px] font-bold text-gray-900 m-0 mb-5 tracking-tight">
                  Similar <GText>Roles</GText>
                </h3>
                <div className="flex flex-col gap-3.5">
                  {SIMILAR.map((job, i) => (
                    <motion.div key={job.id} {...fwV(i * 0.08)}
                      className="bg-white border border-[rgba(30,58,138,0.12)] rounded-xl p-4.5 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="w-[46px] h-[46px] rounded-xl flex-shrink-0 flex items-center justify-center text-lg font-extrabold font-serif"
                        style={{ background: `${job.logoColor}18`, border: `1px solid ${job.logoColor}28`, color: job.logoColor }}
                      >
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14.5px] font-bold text-gray-900 m-0 mb-0.5">{job.title}</p>
                        <p className="text-xs text-gray-500 m-0">{job.company} · {job.location}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[13px] font-semibold text-[#1E3A8A] m-0 mb-0.5">{job.salary}</p>
                        <p className="text-[11.5px] text-gray-500 m-0">{job.posted}</p>
                      </div>
                      <ArrowRight size={15} className="text-gray-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Application form (sticky) ── */}
            <div className="sticky top-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="bg-white border border-teal-500/25 rounded-2xl p-12 text-center shadow-lg"
                  >
                    <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0d9488] mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <CheckCircle size={36} className="text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 m-0 mb-3">Application Submitted!</h3>
                    <p className="text-[14.5px] text-gray-500 leading-relaxed m-0 mb-7">
                      Your application for <strong className="text-gray-900">{JOB.title}</strong> at {JOB.company} has been received. We'll be in touch within 2 business days.
                    </p>
                    <div className="bg-[#F0F4FF] border border-[rgba(30,58,138,0.12)] rounded-xl p-3.5 mb-6 text-left">
                      <p className="text-xs font-bold text-[#14B8A6] m-0 mb-2 tracking-wide uppercase">What happens next?</p>
                      {["CV review within 24 hours", "Screening call if shortlisted", "Interview within 5 business days"].map((s, i) => (
                        <div key={i} className="flex gap-2 items-center mb-1.5 last:mb-0">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.gradientBrand }}>
                            <span className="text-[9px] font-extrabold text-white">{i + 1}</span>
                          </div>
                          <span className="text-[13px] text-gray-500">{s}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setSubmitted(false)}
                      className="w-full py-3 rounded-lg border border-[rgba(30,58,138,0.12)] bg-[#F0F4FF] text-gray-500 text-sm font-semibold cursor-pointer font-inherit"
                    >
                      Apply for another role
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.20 }}>
                    <div className="bg-white border border-[rgba(30,58,138,0.12)] rounded-2xl overflow-hidden shadow-md">

                      {/* Card header */}
                      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#14B8A6] p-6 flex items-center justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-white m-0 mb-1">Apply Now</h3>
                          <p className="text-[13px] text-white/70 m-0">Takes less than 5 minutes</p>
                        </div>
                        <div className="w-[42px] h-[42px] rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                          <Send size={17} className="text-white" />
                        </div>
                      </div>

                      {/* Deadline strip */}
                      <div className="bg-amber-50/10 border-b border-[rgba(30,58,138,0.12)] p-2.5 flex items-center gap-2">
                        <Calendar size={13} className="text-amber-600" />
                        <span className="text-xs text-amber-600 font-semibold">
                          Application deadline: {JOB.deadline}
                        </span>
                      </div>

                      <form onSubmit={handleSubmit} className="p-7">

                        {/* Full name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                          <div>
                            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                              <User size={11} className="text-[#3B82F6]" /> Full Name *
                            </label>
                            <input name="fullName" type="text" required placeholder="Jane Smith" value={formData.fullName} onChange={handleChange} onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)} className={getInputClasses("fullName")} />
                          </div>
                          <div>
                            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                              <Mail size={11} className="text-[#3B82F6]" /> Email *
                            </label>
                            <input name="email" type="email" required placeholder="jane@email.com" value={formData.email} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} className={getInputClasses("email")} />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="mb-3.5">
                          <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                            <Phone size={11} className="text-[#3B82F6]" /> Phone Number
                          </label>
                          <input name="phone" type="tel" placeholder="+44 20 1234 5678" value={formData.phone} onChange={handleChange} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} className={getInputClasses("phone")} />
                        </div>

                        {/* Salary row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                          <div>
                            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                              <DollarSign size={11} className="text-[#3B82F6]" /> Current Salary
                            </label>
                            <input name="currentSalary" type="text" placeholder="£55,000" value={formData.currentSalary} onChange={handleChange} onFocus={() => setFocused("currentSalary")} onBlur={() => setFocused(null)} className={getInputClasses("currentSalary")} />
                          </div>
                          <div>
                            <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                              <DollarSign size={11} className="text-[#3B82F6]" /> Expected Salary *
                            </label>
                            <input name="expectedSalary" type="text" required placeholder="£70,000" value={formData.expectedSalary} onChange={handleChange} onFocus={() => setFocused("expectedSalary")} onBlur={() => setFocused(null)} className={getInputClasses("expectedSalary")} />
                          </div>
                        </div>

                        {/* Notice period */}
                        <div className="mb-3.5">
                          <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                            <Clock size={11} className="text-[#3B82F6]" /> Notice Period *
                          </label>
                          <div className="relative">
                            <select
                              name="noticePeriod" value={formData.noticePeriod} onChange={handleChange}
                              onFocus={() => setFocused("noticePeriod")} onBlur={() => setFocused(null)}
                              className={`${getInputClasses("noticePeriod")} pr-9 cursor-pointer appearance-none`}
                            >
                              <option value="immediate">Immediate</option>
                              <option value="1week">1 week</option>
                              <option value="2weeks">2 weeks</option>
                              <option value="1month">1 month</option>
                              <option value="2months">2 months</option>
                              <option value="3months">3 months</option>
                              <option value="other">Other</option>
                            </select>
                            <ChevronDown size={14} className="text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* CV Upload */}
                        <div className="mb-3.5">
                          <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                            <FileText size={11} className="text-[#3B82F6]" /> Upload CV *
                          </label>
                          <div
                            onDrop={handleDrop}
                            onDragOver={e => e.preventDefault()}
                            onClick={() => document.getElementById("cv-input").click()}
                            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
                              cvFile ? "bg-teal-500/5 border-[#14B8A6]" : "bg-[#F0F4FF] border-[rgba(30,58,138,0.25)]"
                            }`}
                          >
                            {cvFile ? (
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                                  <FileText size={16} className="text-[#14B8A6]" />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="text-sm font-semibold text-gray-900 m-0">{cvFile.name}</p>
                                  <p className="text-[11.5px] text-gray-500 m-0">{(cvFile.size / 1024).toFixed(1)} KB</p>
                                </div>
                                <button type="button" onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                                  className="bg-transparent border-none cursor-pointer p-1"
                                >
                                  <X size={14} className="text-gray-500" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <Upload size={20} className="text-blue-900/40 mb-2" />
                                <p className="text-[13px] text-gray-500 m-0 mb-0.5">
                                  <strong className="text-[#1E3A8A]">Click to upload</strong> or drag & drop
                                </p>
                                <p className="text-[11.5px] text-gray-500 m-0">PDF, DOC, DOCX (max 10MB)</p>
                              </>
                            )}
                          </div>
                          <input id="cv-input" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                        </div>

                        {/* Cover letter */}
                        <div className="mb-5">
                          <label className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#1E3A8A] mb-2">
                            <FileText size={11} className="text-[#3B82F6]" /> Cover Letter
                          </label>
                          <textarea
                            name="coverLetter" rows={4}
                            placeholder="Tell us why you're the perfect fit for this role…"
                            value={formData.coverLetter} onChange={handleChange}
                            onFocus={() => setFocused("coverLetter")} onBlur={() => setFocused(null)}
                            className={getInputClasses("coverLetter")}
                          />
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit" disabled={sending}
                          whileHover={!sending ? { scale: 1.014, y: -2 } : {}}
                          whileTap={!sending ? { scale: 0.985 } : {}}
                          className={`w-full py-3.5 px-6 rounded-xl border-none text-white text-[15px] font-bold flex items-center justify-center gap-2.5 font-inherit ${
                            sending ? "bg-gray-400 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#14B8A6] cursor-pointer shadow-md"
                          }`}
                        >
                          {sending ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                              Submitting application…
                            </>
                          ) : (
                            <> Submit Application <ArrowRight size={16} /> </>
                          )}
                        </motion.button>

                        <p className="text-center text-xs text-gray-500 mt-3 mb-0">
                          By applying you agree to our{" "}
                          <a href="#" className="text-[#14B8A6] font-semibold no-underline">Privacy Policy</a>
                        </p>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruitmentDetailPage;