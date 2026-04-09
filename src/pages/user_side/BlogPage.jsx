import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Tag, ChevronLeft, ChevronRight, Search, TrendingUp, BookOpen, Users } from "lucide-react";

/* ── Brand tokens ─────────────────────────── */
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

/* ── Helpers ──────────────────────────────── */
const GText = ({ children }) => (
  <span className="bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
    {children}
  </span>
);

const Badge = ({ children, dark }) => (
  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.10em] uppercase px-3.5 py-1 rounded-full border ${
    dark ? "bg-teal-500/15 border-teal-500/28" : "bg-teal-500/10 border-teal-500/28"
  } text-teal-600`}>
    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
    {children}
  </span>
);

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
});

/* ── Dummy blog data ──────────────────────── */
const CATEGORIES = ["All", "HR Strategy", "Recruitment", "Compliance", "Payroll", "Analytics", "Culture"];

const BLOGS = [
  {
    id: 1,
    title: "How AI is Revolutionising Recruitment in 2025",
    excerpt: "Discover how leading HR teams are using AI-powered screening tools to cut time-to-hire by 60% while improving candidate quality across every department.",
    category: "Recruitment",
    author: "Sarah Mitchell",
    authorRole: "Head of Talent",
    date: "April 02, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
    featured: true,
    tags: ["AI", "Recruitment", "Automation"],
  },
  {
    id: 2,
    title: "UK GDPR Compliance: What Every HR Team Must Know",
    excerpt: "A comprehensive breakdown of the latest regulatory changes affecting HR data processing in the UK — and practical steps to stay ahead of enforcement.",
    category: "Compliance",
    author: "James Patel",
    authorRole: "Compliance Lead",
    date: "March 28, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    featured: false,
    tags: ["GDPR", "Compliance", "Legal"],
  },
  {
    id: 3,
    title: "Building a High-Performance Culture That Lasts",
    excerpt: "The organisations thriving in 2025 aren't just hiring well — they're creating environments where people genuinely want to do their best work. Here's their playbook.",
    category: "Culture",
    author: "Priya Sharma",
    authorRole: "People Ops Director",
    date: "March 21, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: false,
    tags: ["Culture", "Leadership", "Retention"],
  },
  {
    id: 4,
    title: "Payroll Automation: Eliminating Costly Errors at Scale",
    excerpt: "Manual payroll is a relic. Modern cloud-integrated payroll systems reduce reconciliation errors to zero while saving finance teams dozens of hours each month.",
    category: "Payroll",
    author: "David Chen",
    authorRole: "Payroll Specialist",
    date: "March 14, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    featured: false,
    tags: ["Payroll", "Automation", "Finance"],
  },
  {
    id: 5,
    title: "People Analytics: From Data to Decision in 3 Steps",
    excerpt: "HR leaders who leverage real-time workforce analytics make faster, more confident decisions. We break down a practical three-step framework any team can adopt.",
    category: "Analytics",
    author: "Rachel O'Brien",
    authorRole: "Analytics Lead",
    date: "March 07, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
    tags: ["Analytics", "Data", "Strategy"],
  },
  {
    id: 6,
    title: "The 2025 HR Strategy Blueprint for Mid-Market Firms",
    excerpt: "Mid-market organisations face unique HR challenges. This blueprint covers talent acquisition, retention, compliance, and technology adoption for teams of 100–500.",
    category: "HR Strategy",
    author: "Tom Bradley",
    authorRole: "HR Consultant",
    date: "Feb 28, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: false,
    tags: ["Strategy", "Growth", "Planning"],
  },
  {
    id: 7,
    title: "Remote Onboarding: First 90 Days That Actually Work",
    excerpt: "Onboarding remote employees is hard — but it doesn't have to be. We reveal what the best-performing distributed teams do in the critical first 90 days.",
    category: "HR Strategy",
    author: "Anika Roy",
    authorRole: "L&D Manager",
    date: "Feb 21, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80",
    featured: false,
    tags: ["Onboarding", "Remote", "Culture"],
  },
  {
    id: 8,
    title: "Right-to-Work Checks: Avoiding Common Pitfalls",
    excerpt: "Home Office fines for non-compliant right-to-work checks have tripled since 2023. Here's exactly how to conduct watertight checks — manually and digitally.",
    category: "Compliance",
    author: "James Patel",
    authorRole: "Compliance Lead",
    date: "Feb 14, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    featured: false,
    tags: ["Compliance", "RTW", "Legal"],
  },
  {
    id: 9,
    title: "Benefits That Actually Retain Talent in 2025",
    excerpt: "Salary alone no longer wins the talent war. The companies keeping their best people are offering a blend of flexibility, growth, and wellbeing support that money can't match.",
    category: "Culture",
    author: "Priya Sharma",
    authorRole: "People Ops Director",
    date: "Feb 07, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    featured: false,
    tags: ["Retention", "Benefits", "Wellbeing"],
  },
];

const POSTS_PER_PAGE = 6;

/* ── Category pill ────────────────────────── */
const CategoryTag = ({ label }) => {
  const palette = {
    "Recruitment": { bg: "rgba(59,130,246,0.10)",  text: "#1d4ed8", border: "rgba(59,130,246,0.22)" },
    "Compliance":  { bg: "rgba(239,68,68,0.09)",   text: "#b91c1c", border: "rgba(239,68,68,0.20)"  },
    "Culture":     { bg: "rgba(20,184,166,0.10)",  text: "#0d9488", border: "rgba(20,184,166,0.22)" },
    "Payroll":     { bg: "rgba(245,158,11,0.10)",  text: "#b45309", border: "rgba(245,158,11,0.22)" },
    "Analytics":   { bg: "rgba(139,92,246,0.10)",  text: "#7c3aed", border: "rgba(139,92,246,0.22)" },
    "HR Strategy": { bg: "rgba(30,58,138,0.10)",   text: "#1e3a8a", border: "rgba(30,58,138,0.20)"  },
  };
  const s = palette[label] ?? { bg: "rgba(107,114,128,0.10)", text: "#4b5563", border: "rgba(107,114,128,0.20)" };
  return (
    <span className="text-[10.5px] font-bold tracking-[0.07em] uppercase px-2.5 py-0.5 rounded-full border"
      style={{ color: s.text, background: s.bg, borderColor: s.border }}
    >
      {label}
    </span>
  );
};

/* ── Blog card ────────────────────────────── */
const BlogCard = ({ blog, delay, featured }) => {
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
        viewport={{ once: true }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="col-span-1 lg:col-span-3 bg-white border rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 cursor-pointer transition-all duration-300"
        style={{
          borderColor: hovered ? "rgba(30,58,138,0.22)" : C.border,
          boxShadow: hovered ? "0 8px 40px rgba(30,58,138,0.14)" : "0 2px 8px rgba(30,58,138,0.06)",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden min-h-[360px]">
          <img
            src={blog.image} alt={blog.title}
            className="w-full h-full object-cover block transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(11,20,55,0.18)]" />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.gradientBrand }} />
          {/* Featured badge */}
          <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-teal-500/92 backdrop-blur-md border border-teal-500/40 rounded-full px-3 py-1">
            <TrendingUp size={11} color="#fff" />
            <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-white">Featured</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-11 px-10 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-5">
            <CategoryTag label={blog.category} />
            <span className="text-xs flex items-center gap-1" style={{ color: C.textSecondary }}>
              <Clock size={11} color={C.textSecondary} /> {blog.readTime}
            </span>
          </div>

          <h2 className="font-serif text-[30px] font-bold leading-tight tracking-tighter m-0 mb-4" style={{ color: C.textPrimary }}>
            {blog.title}
          </h2>

          <p className="text-[15.5px] leading-relaxed m-0 mb-7" style={{ color: C.textSecondary, lineHeight: 1.75 }}>
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between pt-5 border-t" style={{ borderTopColor: C.border }}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0" style={{ background: C.gradientBrand }}>
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-semibold m-0" style={{ color: C.textPrimary }}>{blog.author}</p>
                <p className="text-[11.5px] m-0" style={{ color: C.textSecondary }}>{blog.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[13.5px] font-bold transition-all duration-200" style={{ color: C.tealAccent }}>
              Read article <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="bg-white border rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-280"
      style={{
        borderColor: hovered ? "rgba(30,58,138,0.20)" : C.border,
        boxShadow: hovered ? "0 6px 32px rgba(30,58,138,0.12)" : "0 1px 4px rgba(30,58,138,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[200px]">
        <img
          src={blog.image} alt={blog.title}
          className="w-full h-full object-cover block transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,20,55,0.30)] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-250" style={{ background: C.gradientBrand, opacity: hovered ? 1 : 0 }} />
        <div className="absolute top-3.5 left-3.5">
          <CategoryTag label={blog.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pb-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs flex items-center gap-1" style={{ color: C.textSecondary }}>
            <Calendar size={11} color={C.textSecondary} /> {blog.date}
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: C.textSecondary }}>
            <Clock size={11} color={C.textSecondary} /> {blog.readTime}
          </span>
        </div>

        <h3 className="font-serif text-[18.5px] font-bold leading-tight tracking-tighter m-0 mb-2.5" style={{ color: C.textPrimary }}>
          {blog.title}
        </h3>

        <p className="text-[13.5px] leading-relaxed m-0 pb-4 flex-1" style={{ color: C.textSecondary, lineHeight: 1.7 }}>
          {blog.excerpt.length > 110 ? blog.excerpt.slice(0, 110) + "…" : blog.excerpt}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t flex items-center justify-between" style={{ borderTopColor: C.border }}>
          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: C.gradientBrand }}>
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold m-0" style={{ color: C.textPrimary }}>{blog.author}</p>
              <p className="text-[11px] m-0" style={{ color: C.textSecondary }}>{blog.authorRole}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[12.5px] font-bold transition-colors duration-200" style={{ color: hovered ? C.tealAccent : C.secondaryBlue }}>
            Read more <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

/* ── Pagination ───────────────────────────── */
const Pagination = ({ current, total, onPage }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <motion.button
        whileHover={current > 1 ? { scale: 1.05 } : {}} whileTap={current > 1 ? { scale: 0.95 } : {}}
        onClick={() => current > 1 && onPage(current - 1)}
        className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all"
        style={{
          borderColor: C.border,
          background: C.bgCard,
          cursor: current > 1 ? "pointer" : "not-allowed",
          opacity: current > 1 ? 1 : 0.4,
        }}
      >
        <ChevronLeft size={16} color={C.textSecondary} />
      </motion.button>

      {pages.map(p => (
        <motion.button
          key={p}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          onClick={() => onPage(p)}
          className="w-10 h-10 rounded-xl text-sm font-medium transition-all"
          style={{
            background: p === current ? C.gradientBrand : C.bgCard,
            border: p === current ? "none" : `1px solid ${C.border}`,
            color: p === current ? "#fff" : C.textSecondary,
            fontWeight: p === current ? 700 : 500,
            boxShadow: p === current ? "0 4px 14px rgba(30,58,138,0.28)" : "none",
          }}
        >
          {p}
        </motion.button>
      ))}

      <motion.button
        whileHover={current < total ? { scale: 1.05 } : {}} whileTap={current < total ? { scale: 0.95 } : {}}
        onClick={() => current < total && onPage(current + 1)}
        className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all"
        style={{
          borderColor: C.border,
          background: C.bgCard,
          cursor: current < total ? "pointer" : "not-allowed",
          opacity: current < total ? 1 : 0.4,
        }}
      >
        <ChevronRight size={16} color={C.textSecondary} />
      </motion.button>
    </div>
  );
};

/* ═══════════════════════════════════════════
   BLOG PAGE
═══════════════════════════════════════════ */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = BLOGS;
    if (activeCategory !== "All") list = list.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const featured      = BLOGS.find(b => b.featured);
  const showFeatured  = activeCategory === "All" && !search.trim() && safePage === 1;

  const handlePage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleCat  = (cat) => { setActiveCategory(cat); setPage(1); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="font-dm-sans overflow-x-hidden" style={{ background: C.bgMain, color: C.textPrimary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes shimmer { 0%,100%{opacity:0.28} 50%{opacity:0.55} }
        input:focus { outline: none; }
      `}</style>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10 pb-22.5 bg-gradient-to-br from-[#040d26] via-[#0c1a4a] to-[#083030]">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Blobs */}
        <div className="absolute -top-[120px] -right-20 w-[500px] h-[500px] rounded-full bg-radial from-blue-500/18 to-transparent blur-[60px] animate-[shimmer_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-25 -left-20 w-[420px] h-[420px] rounded-full bg-radial from-teal-500/14 to-transparent blur-[55px] animate-[shimmer_10s_ease-in-out_infinite_2s]" />
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.gradientBrand }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-11 relative z-10">
          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex gap-7 mb-9 flex-wrap"
          >
            {[
              { icon: BookOpen, label: `${BLOGS.length} Articles` },
              { icon: Users,    label: "Expert Authors"          },
              { icon: TrendingUp, label: "Weekly Updates"        },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/50 text-[13px] font-medium">
                <Icon size={13} color={C.tealAccent} /> {label}
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}>
            <Badge dark>HR Insights & Resources</Badge>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2.8rem,5vw,4rem)] font-bold leading-[1.08] tracking-tighter text-white mt-5 mb-4"
          >
            The <GText>HR Knowledge</GText> Hub
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="text-[17px] text-white/55 leading-relaxed max-w-[500px] mb-10"
          >
            Expert insights on recruitment, compliance, payroll, and people strategy — written by HR professionals for HR professionals.
          </motion.p>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.30 }}
            className="relative max-w-[520px]"
          >
            <Search size={17} color="rgba(255,255,255,0.40)" className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text" value={search} onChange={handleSearch}
              placeholder="Search articles, topics, or authors…"
              className="w-full py-3.5 px-4 pl-12 rounded-xl text-[15px] bg-white/9 border border-white/16 text-white backdrop-blur-md font-inherit"
              style={{ fontFamily: "inherit" }}
            />
            <style>{`input::placeholder { color: rgba(255,255,255,0.38); }`}</style>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CATEGORY FILTERS
      ═══════════════════════════════════ */}
      <section className="sticky top-0 z-40 backdrop-blur-md px-4 md:px-8 lg:px-11" style={{ background: C.bgSection, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-[1160px] mx-auto">
          <div className="flex gap-1.5 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => handleCat(cat)}
                className="px-[18px] py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-180"
                style={{
                  background: activeCategory === cat ? C.primaryBlue : "transparent",
                  color: activeCategory === cat ? "#fff" : C.textSecondary,
                  boxShadow: activeCategory === cat ? "0 3px 12px rgba(30,58,138,0.28)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BLOG GRID
      ═══════════════════════════════════ */}
      <section className="py-18 pb-10 px-4 md:px-8 lg:px-11" style={{ background: C.bgMain }}>
        <div className="max-w-[1160px] mx-auto">
          {/* Results count */}
          <div className="flex items-center justify-between mb-9">
            <p className="text-sm" style={{ color: C.textSecondary }}>
              Showing <strong className="font-semibold" style={{ color: C.textPrimary }}>{filtered.length}</strong> article{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}
              {search ? ` for "${search}"` : ""}
            </p>
            <p className="text-[13px]" style={{ color: C.textSecondary }}>
              Page {safePage} of {totalPages}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${search}-${safePage}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(30,58,138,0.08)", border: `1px solid ${C.border}` }}>
                    <Search size={26} color={C.textSecondary} />
                  </div>
                  <h3 className="font-serif text-[22px] font-bold m-0 mb-2.5" style={{ color: C.textPrimary }}>No articles found</h3>
                  <p className="text-[15px]" style={{ color: C.textSecondary }}>Try a different search term or category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {showFeatured && featured && <BlogCard blog={featured} delay={0} featured />}
                  {paginated
                    .filter(b => !(showFeatured && b.id === featured?.id))
                    .map((blog, i) => (
                      <BlogCard key={blog.id} blog={blog} delay={i * 0.07} featured={false} />
                    ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination current={safePage} total={totalPages} onPage={handlePage} />
          )}

          {/* Pagination info */}
          {totalPages > 1 && (
            <p className="text-center mt-4 text-[13px]" style={{ color: C.textSecondary }}>
              Showing {Math.min((safePage - 1) * POSTS_PER_PAGE + 1, filtered.length)}–{Math.min(safePage * POSTS_PER_PAGE, filtered.length)} of {filtered.length} articles
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;