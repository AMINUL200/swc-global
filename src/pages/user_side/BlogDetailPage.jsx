import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark,
  Link2, ChevronRight, ArrowRight,
  Check, TrendingUp, Users, BookOpen, Eye,
} from "lucide-react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

/* ── Brand tokens ─────────────────────── */
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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  viewport: { once: true },
});

/* ── Category colours ─────────────────── */
const catStyle = (cat) => ({
  "Recruitment": { bg: "rgba(59,130,246,0.10)",  text: "#1d4ed8", border: "rgba(59,130,246,0.22)" },
  "Compliance":  { bg: "rgba(239,68,68,0.09)",   text: "#b91c1c", border: "rgba(239,68,68,0.20)"  },
  "Culture":     { bg: "rgba(20,184,166,0.10)",  text: "#0d9488", border: "rgba(20,184,166,0.22)" },
  "Payroll":     { bg: "rgba(245,158,11,0.10)",  text: "#b45309", border: "rgba(245,158,11,0.22)" },
  "Analytics":   { bg: "rgba(139,92,246,0.10)",  text: "#7c3aed", border: "rgba(139,92,246,0.22)" },
  "HR Strategy": { bg: "rgba(30,58,138,0.10)",   text: "#1e3a8a", border: "rgba(30,58,138,0.20)"  },
}[cat] ?? { bg: "rgba(107,114,128,0.10)", text: "#4b5563", border: "rgba(107,114,128,0.20)" });

const CatTag = ({ cat }) => {
  const s = catStyle(cat);
  return (
    <span className="text-[11px] font-bold tracking-[0.07em] uppercase px-3 py-0.5 rounded-full"
      style={{ color: s.text, background: s.bg, border: `1px solid ${s.border}` }}
    >
      {cat}
    </span>
  );
};

/* ══════════════════════════════════════
   DUMMY ARTICLE DATA
══════════════════════════════════════ */
const ARTICLE = {
  id: 1,
  title: "How AI is Revolutionising Recruitment in 2025",
  subtitle: "The shift from gut-feel to data-driven hiring is no longer optional — it's the new baseline for competitive talent acquisition.",
  category: "Recruitment",
  author: "Sarah Mitchell",
  authorRole: "Head of Talent Acquisition",
  authorBio: "Sarah has 12 years of experience leading talent functions at fast-growth tech companies. She specialises in building scalable hiring processes and has helped 40+ organisations transform their recruitment operations.",
  authorAvatar: null,
  date: "April 02, 2025",
  updatedDate: "April 04, 2025",
  readTime: "7 min read",
  views: "4,821",
  image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1400&q=85",
  tags: ["AI", "Recruitment", "Automation", "HR Tech"],
  toc: [
    { id: "introduction",    label: "Introduction"                       },
    { id: "problem",         label: "The Problem with Manual Screening"  },
    { id: "ai-screening",    label: "How AI Screening Works"             },
    { id: "case-study",      label: "Real-World Case Study"              },
    { id: "implementation",  label: "Implementation Roadmap"             },
    { id: "risks",           label: "Risks & Mitigations"               },
    { id: "conclusion",      label: "Conclusion"                         },
  ],
  sections: [
    {
      id: "introduction",
      heading: "Introduction",
      body: `Recruitment has always been one of the most time-intensive functions in HR. A typical mid-market company receives between 150 and 300 applications per open role — and a significant portion of that volume needs to be screened, scored, and actioned within days to avoid losing candidates to faster-moving competitors.\n\nFor most teams, this means hours of manual CV review, inconsistent scoring, and decisions shaped more by cognitive shortcuts than genuine merit. The result: slow pipelines, biased outcomes, and frustrated hiring managers.\n\nAI-powered screening tools are changing this equation fundamentally — not by replacing human judgment, but by handling the high-volume, pattern-matching work at scale so that recruiters can focus their energy where it matters most: the human moments.`,
    },
    {
      id: "problem",
      heading: "The Problem with Manual Screening",
      body: `Before examining the solution, it's worth understanding the scale of the problem. Research consistently shows that even experienced recruiters spend an average of just 6–8 seconds reviewing a CV before making an initial judgement. In that window, the brain is not conducting a careful evaluation — it's pattern-matching against a mental template that is shaped by dozens of cognitive biases.\n\nRecency bias, affinity bias, and attribution bias are the most commonly cited. But there's also the simple problem of fatigue: after screening 40 CVs in sequence, the quality of human attention declines sharply. The 38th candidate receives a fundamentally different level of scrutiny than the third.\n\nThe downstream consequences are significant. Rejected strong candidates. Weak candidates advancing. Inconsistent evaluation criteria between reviewers. And in regulated industries, potential exposure to discrimination claims when screening decisions cannot be adequately documented.`,
      pullQuote: "After screening 40 CVs in sequence, the quality of human attention declines sharply. The 38th candidate receives a fundamentally different level of scrutiny than the third.",
    },
    {
      id: "ai-screening",
      heading: "How AI Screening Works",
      body: `Modern AI screening tools operate on one of two architectures: rule-based systems and machine learning models. Rule-based systems are simpler — you define criteria (years of experience, specific qualifications, location) and the system filters accordingly. These are deterministic and auditable, but they capture only what you explicitly tell them to look for.\n\nML-based systems are more powerful but more complex. Trained on historical hiring data, they learn to identify patterns associated with successful hires — then apply that model to new candidates. The quality of the output depends entirely on the quality and representativeness of the training data. When trained on biased historical data, ML systems can amplify rather than reduce bias.\n\nThe most sophisticated platforms combine both approaches: rule-based filtering for hard requirements, ML scoring for relative quality signals, and explainability layers that allow recruiters to understand exactly why a candidate received a particular score.`,
      callout: {
        type: "insight",
        text: "Platforms that combine rule-based filtering with ML scoring and explainability layers reduce time-to-shortlist by up to 72% while improving diversity metrics.",
      },
    },
    {
      id: "case-study",
      heading: "Real-World Case Study",
      body: `A UK-based professional services firm with 800 employees implemented an AI screening module in Q3 2024 to manage their graduate intake process. They typically received 2,200+ applications for 45 graduate roles annually — a 49:1 ratio that made manual screening impractical.\n\nPrior to implementation, the HR team spent approximately 180 hours annually on initial CV screening for this programme alone. Time-to-shortlist averaged 22 business days. After implementation, screening time dropped to under 20 minutes (automated) with a 3-day human review layer, reducing total time-to-shortlist to 8 days.\n\nCandidate quality metrics — measured by manager-rated performance at 6 months — improved by 18 percentage points compared to the previous cohort. Diversity representation in the shortlist increased from 31% to 47%.`,
      stats: [
        { value: "72%",  label: "Reduction in screening time" },
        { value: "18pt", label: "Improvement in hire quality"  },
        { value: "47%",  label: "Diversity in shortlist"       },
      ],
    },
    {
      id: "implementation",
      heading: "Implementation Roadmap",
      body: `Rolling out AI screening successfully is less about the technology and more about the change management. Most failures occur not because the tool underperforms, but because the team wasn't prepared to integrate it into their existing workflow.\n\nWe recommend a phased approach: begin with a single high-volume role type, run the AI alongside your existing process in parallel for 4–6 weeks, compare outcomes, and use the discrepancy analysis to tune your scoring criteria before expanding.\n\nKey success factors include clear ownership (someone needs to be accountable for monitoring model performance), regular bias audits (at minimum quarterly), feedback loops from hiring managers back into the scoring model, and transparent communication with candidates about how their applications are being evaluated.`,
      steps: [
        { num: "01", title: "Pilot on one role type",     desc: "Choose a high-volume role. Run AI alongside existing process for 4–6 weeks."       },
        { num: "02", title: "Compare and calibrate",      desc: "Analyse discrepancies between AI scores and human decisions. Tune criteria."         },
        { num: "03", title: "Expand with governance",     desc: "Roll out to additional roles. Establish bias audit schedule and feedback loops."     },
        { num: "04", title: "Continuous improvement",     desc: "Quarterly model reviews. Incorporate hire quality data back into scoring signals."  },
      ],
    },
    {
      id: "risks",
      heading: "Risks & Mitigations",
      body: `No technology is without risk, and AI recruitment tools are no exception. The most frequently cited risks fall into three categories: bias amplification, over-reliance, and regulatory exposure.\n\nBias amplification is perhaps the most serious. If your historical hiring data reflects past patterns of underrepresentation, training an ML model on that data will encode those patterns into the scoring system. The mitigation is rigorous data auditing before training, ongoing demographic parity checks in shortlist outputs, and maintaining human review for all final decisions.\n\nOver-reliance is subtler but equally damaging. Teams that trust the AI score uncritically begin to atrophy their own screening skills. Mitigate this by treating AI scores as one input among several, and by regularly challenging the model's outputs.`,
    },
    {
      id: "conclusion",
      heading: "Conclusion",
      body: `AI screening is not a silver bullet. Poorly implemented, it can entrench bias, create legal exposure, and erode candidate trust. But implemented thoughtfully — with clear governance, regular audits, and a human layer that never disappears — it is one of the highest-leverage investments an HR team can make.\n\nThe organisations seeing the greatest returns aren't using AI to replace their recruiters. They're using it to free their recruiters to do the parts of the job that genuinely require human intelligence: building relationships, exercising judgment in ambiguous situations, and representing the organisation's culture to candidates who are simultaneously evaluating a dozen competitors.\n\nThat's a trade worth making.`,
    },
  ],
};

const RELATED = [
  {
    id: 2,
    title: "Structured Interviewing: Why Most Hiring Managers Get It Wrong",
    category: "Recruitment",
    date: "March 18, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=600&q=80",
    excerpt: "Unstructured interviews predict job performance at barely above chance level. Here's how to fix your interview process in a single afternoon.",
  },
  {
    id: 3,
    title: "The Candidate Experience Audit: 12 Checkpoints",
    category: "Recruitment",
    date: "March 05, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    excerpt: "Every interaction a candidate has with your organisation shapes their perception of your brand. Most companies fail at more than half of these 12 checkpoints.",
  },
  {
    id: 4,
    title: "Building a High-Performance Culture That Lasts",
    category: "Culture",
    date: "March 21, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    excerpt: "The organisations thriving in 2025 aren't just hiring well — they're creating environments where people genuinely want to do their best work.",
  },
];

/* ══════════════════════════════════════
   READING PROGRESS BAR
══════════════════════════════════════ */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[999] origin-left"
      style={{ background: C.gradientBrand, scaleX }}
    />
  );
};

/* ══════════════════════════════════════
   TABLE OF CONTENTS
══════════════════════════════════════ */
const TableOfContents = ({ toc, activeId }) => (
  <div className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: C.border }}>
    <p className="text-[11px] font-bold tracking-[0.10em] uppercase m-0 mb-4" style={{ color: C.tealAccent }}>
      In this article
    </p>
    <nav>
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] no-underline transition-all duration-180 mb-0.5"
          style={{
            fontWeight: activeId === item.id ? 600 : 400,
            color: activeId === item.id ? C.primaryBlue : C.textSecondary,
            background: activeId === item.id ? "rgba(30,58,138,0.07)" : "transparent",
            borderLeft: `2px solid ${activeId === item.id ? C.primaryBlue : "transparent"}`,
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  </div>
);

/* ══════════════════════════════════════
   SHARE BAR
══════════════════════════════════════ */
const ShareBar = () => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved]   = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2.5 items-center">
      <p className="text-[10px] font-bold tracking-[0.10em] uppercase m-0 [writing-mode:vertical-lr] [transform:rotate(180deg)]" style={{ color: C.textSecondary }}>Share</p>

      {[
        { Icon: FaXTwitter,  color: "#1DA1F2", label: "Twitter",  action: () => {} },
        { Icon: FaLinkedin, color: "#0077B5", label: "LinkedIn", action: () => {} },
        { Icon: copied ? Check : Link2, color: copied ? C.tealAccent : C.textSecondary, label: "Copy link", action: copy },
      ].map(({ Icon, color, label, action }) => (
        <motion.button key={label} onClick={action} whileHover={{ scale: 1.10 }} whileTap={{ scale: 0.93 }}
          title={label}
          className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center cursor-pointer transition-colors duration-180"
          style={{ borderColor: C.border }}
        >
          <Icon size={16} color={color} />
        </motion.button>
      ))}

      <div className="w-px h-4 my-1" style={{ background: C.border }} />

      <motion.button onClick={() => setSaved(!saved)} whileHover={{ scale: 1.10 }} whileTap={{ scale: 0.93 }}
        title="Save article"
        className="w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-colors duration-180"
        style={{
          background: saved ? "rgba(20,184,166,0.10)" : C.bgCard,
          borderColor: saved ? "rgba(20,184,166,0.30)" : C.border,
        }}
      >
        <Bookmark size={16} color={saved ? C.tealAccent : C.textSecondary} fill={saved ? C.tealAccent : "none"} />
      </motion.button>
    </div>
  );
};

/* ══════════════════════════════════════
   ARTICLE SECTION RENDERER
══════════════════════════════════════ */
const ArticleSection = ({ section }) => (
  <section id={section.id} className="mb-13">
    <h2 className="font-serif text-[26px] font-bold mb-5 tracking-tighter leading-tight" style={{ color: C.textPrimary }}>
      {section.heading}
    </h2>

    {section.body.split("\n\n").map((para, i) => (
      <p key={i} className="text-[16.5px] leading-relaxed mb-5 font-normal" style={{ color: "#374151", lineHeight: 1.85 }}>
        {para}
      </p>
    ))}

    {/* Pull quote */}
    {section.pullQuote && (
      <blockquote className="my-8 py-6 pl-7 border-l-4 rounded-r-xl" style={{ borderLeftColor: C.tealAccent, background: "linear-gradient(135deg,rgba(20,184,166,0.05),rgba(30,58,138,0.04))" }}>
        <p className="text-[19px] font-serif italic leading-relaxed m-0 tracking-tighter" style={{ color: C.primaryBlue }}>
          "{section.pullQuote}"
        </p>
      </blockquote>
    )}

    {/* Callout box */}
    {section.callout && (
      <div className="my-7 p-5 pl-6 rounded-xl flex gap-3.5 items-start" style={{ background: "linear-gradient(135deg,rgba(30,58,138,0.06),rgba(20,184,166,0.04))", border: `1px solid rgba(30,58,138,0.14)` }}>
        <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: C.gradientBrand }}>
          <TrendingUp size={15} color="#fff" />
        </div>
        <p className="text-[14.5px] font-medium leading-relaxed m-0" style={{ color: C.primaryBlue }}>
          {section.callout.text}
        </p>
      </div>
    )}

    {/* Stats row */}
    {section.stats && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-7">
        {section.stats.map(s => (
          <div key={s.label} className="bg-white border rounded-xl p-5 text-center shadow-sm" style={{ borderColor: C.border }}>
            <p className="text-[32px] font-bold m-0 mb-1 font-serif bg-gradient-to-r from-[#1E3A8A] to-[#14B8A6] bg-clip-text text-transparent">
              {s.value}
            </p>
            <p className="text-xs font-medium m-0" style={{ color: C.textSecondary }}>{s.label}</p>
          </div>
        ))}
      </div>
    )}

    {/* Steps */}
    {section.steps && (
      <div className="flex flex-col gap-3.5 my-6">
        {section.steps.map((step, i) => (
          <div key={step.num} className="flex gap-4 items-start bg-white border rounded-xl p-5 relative overflow-hidden" style={{ borderColor: C.border }}>
            <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: C.gradientBrand }} />
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border" style={{ background: "linear-gradient(135deg,rgba(30,58,138,0.10),rgba(20,184,166,0.08))", borderColor: C.border }}>
              <span className="font-serif text-sm font-bold" style={{ color: C.primaryBlue }}>{step.num}</span>
            </div>
            <div>
              <p className="text-[14.5px] font-semibold m-0 mb-1" style={{ color: C.textPrimary }}>{step.title}</p>
              <p className="text-[13.5px] leading-relaxed m-0" style={{ color: C.textSecondary }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

/* ══════════════════════════════════════
   RELATED CARD
══════════════════════════════════════ */
const RelatedCard = ({ post, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.article
      {...fw(delay)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-260"
      style={{
        borderColor: hov ? "rgba(30,58,138,0.20)" : C.border,
        boxShadow: hov ? "0 6px 28px rgba(30,58,138,0.12)" : "0 1px 4px rgba(30,58,138,0.05)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div className="relative overflow-hidden h-[180px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover block transition-transform duration-500" style={{ transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,20,55,0.28)] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-220" style={{ background: C.gradientBrand, opacity: hov ? 1 : 0 }} />
        <div className="absolute top-3 left-3">
          <CatTag cat={post.category} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex gap-3 mb-2.5">
          <span className="flex items-center gap-1 text-[11.5px]" style={{ color: C.textSecondary }}>
            <Calendar size={10} color={C.textSecondary} /> {post.date}
          </span>
          <span className="flex items-center gap-1 text-[11.5px]" style={{ color: C.textSecondary }}>
            <Clock size={10} color={C.textSecondary} /> {post.readTime}
          </span>
        </div>
        <h4 className="font-serif text-[17px] font-bold leading-tight tracking-tighter m-0 mb-2.5" style={{ color: C.textPrimary }}>
          {post.title}
        </h4>
        <p className="text-[13px] leading-relaxed m-0 mb-4" style={{ color: C.textSecondary }}>
          {post.excerpt.length > 90 ? post.excerpt.slice(0, 90) + "…" : post.excerpt}
        </p>
        <div className="flex items-center gap-1 text-[12.5px] font-bold transition-colors duration-200" style={{ color: hov ? C.tealAccent : C.secondaryBlue }}>
          Read article <ArrowRight size={12} />
        </div>
      </div>
    </motion.article>
  );
};

/* ══════════════════════════════════════
   BLOG DETAIL PAGE
══════════════════════════════════════ */
const BlogDetailPage = () => {
  const [activeId, setActiveId] = useState("introduction");
  const observerRef = useRef(null);

  /* Intersection observer for active TOC item */
  useEffect(() => {
    const headings = ARTICLE.toc.map(t => document.getElementById(t.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach(h => observerRef.current.observe(h));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="font-dm-sans overflow-x-hidden" style={{ background: C.bgMain, color: C.textPrimary }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes shimmer { 0%,100%{opacity:0.28} 50%{opacity:0.55} }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Reading progress bar */}
      <ReadingProgress />

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="relative h-[62vh] min-h-[420px] max-h-[580px]">
          <img src={ARTICLE.image} alt={ARTICLE.title} className="w-full h-full object-cover block" />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,13,38,0.30)] to-[rgba(4,13,38,0.75)]" />
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: C.gradientBrand }} />
        </div>

        {/* Overlapping hero content card */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-11">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border rounded-2xl p-11 md:p-12 -mt-20 relative z-10 shadow-xl"
            style={{ borderColor: C.border }}
          >
            {/* Back + meta row */}
            <div className="flex items-center justify-between mb-6">
              <motion.button whileHover={{ x: -3 }} className="flex items-center gap-2 bg-none border-none cursor-pointer text-[13.5px] font-semibold p-0 font-inherit" style={{ color: C.primaryBlue }}>
                <ArrowLeft size={16} /> Back to blog
              </motion.button>
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.textSecondary }}>
                  <Eye size={13} color={C.textSecondary} /> {ARTICLE.views} views
                </span>
                <span className="flex items-center gap-1 text-[12.5px]" style={{ color: C.textSecondary }}>
                  <Clock size={13} color={C.textSecondary} /> {ARTICLE.readTime}
                </span>
              </div>
            </div>

            {/* Category + tags */}
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <CatTag cat={ARTICLE.category} />
              {ARTICLE.tags.map(tag => (
                <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ color: C.textSecondary, background: C.bgMain, border: `1px solid ${C.border}` }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(2rem,4vw,2.85rem)] font-bold leading-[1.13] tracking-tighter m-0 mb-4" style={{ color: C.textPrimary }}>
              {ARTICLE.title}
            </h1>

            {/* Subtitle */}
            <p className="text-[18px] leading-relaxed m-0 mb-7 font-normal" style={{ color: C.textSecondary }}>
              {ARTICLE.subtitle}
            </p>

            {/* Author row */}
            <div className="flex items-center justify-between pt-6 border-t flex-wrap gap-3.5" style={{ borderTopColor: C.border }}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold text-white flex-shrink-0" style={{ background: C.gradientBrand }}>
                  {ARTICLE.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[15px] font-bold m-0" style={{ color: C.textPrimary }}>{ARTICLE.author}</p>
                  <p className="text-[13px] m-0" style={{ color: C.textSecondary }}>{ARTICLE.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-[13px]" style={{ color: C.textSecondary }}>
                  <Calendar size={13} color={C.textSecondary} />
                  Published {ARTICLE.date}
                </div>
                <div className="w-px h-4" style={{ background: C.border }} />
                <div className="text-[13px]" style={{ color: C.textSecondary }}>
                  Updated {ARTICLE.updatedDate}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ARTICLE BODY + SIDEBAR
      ══════════════════════════════════ */}
      <section className="py-15 pb-20" style={{ background: C.bgMain }}>
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 lg:px-11">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* ── LEFT: Article content + share ── */}
            <div className="grid grid-cols-[48px_1fr] gap-6 items-start">
              {/* Share bar — sticky */}
              <div className="sticky top-[100px]">
                <ShareBar />
              </div>

              {/* Article body */}
              <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                {ARTICLE.sections.map(section => (
                  <ArticleSection key={section.id} section={section} />
                ))}

                {/* End of article divider */}
                <div className="border-t pt-9 mt-2" style={{ borderTopColor: C.border }}>
                  <p className="text-[13px] mb-5" style={{ color: C.textSecondary }}>
                    Tags:
                    {ARTICLE.tags.map(tag => (
                      <span key={tag} className="ml-2 text-xs px-2.5 py-0.5 rounded-full cursor-pointer" style={{ color: C.primaryBlue, background: "rgba(30,58,138,0.07)", border: `1px solid ${C.border}` }}>
                        #{tag}
                      </span>
                    ))}
                  </p>

                  {/* Author bio card */}
                  <div className="bg-white border rounded-xl p-7 flex gap-5 items-start" style={{ borderColor: C.border }}>
                    <div className="w-15 h-15 rounded-full flex items-center justify-center text-[22px] font-bold text-white flex-shrink-0" style={{ background: C.gradientBrand }}>
                      {ARTICLE.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold m-0 mb-0.5" style={{ color: C.textPrimary }}>{ARTICLE.author}</p>
                      <p className="text-[12.5px] m-0 mb-3 font-semibold" style={{ color: C.tealAccent }}>{ARTICLE.authorRole}</p>
                      <p className="text-sm leading-relaxed m-0" style={{ color: C.textSecondary }}>{ARTICLE.authorBio}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>

            {/* ── RIGHT: Sticky sidebar ── */}
            <div className="sticky top-[100px] flex flex-col gap-5">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
                <TableOfContents toc={ARTICLE.toc} activeId={activeId} />
              </motion.div>

              {/* Article stats card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
                className="bg-white border rounded-xl p-5 px-5.5 shadow-sm" style={{ borderColor: C.border }}
              >
                <p className="text-[11px] font-bold tracking-[0.10em] uppercase m-0 mb-4" style={{ color: C.tealAccent }}>
                  Article stats
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { Icon: Eye,      label: "Total views", value: ARTICLE.views      },
                    { Icon: Clock,    label: "Read time",   value: ARTICLE.readTime   },
                    { Icon: Calendar, label: "Published",   value: ARTICLE.date       },
                    { Icon: BookOpen, label: "Category",    value: ARTICLE.category   },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={13} color={C.textSecondary} />
                        <span className="text-[12.5px]" style={{ color: C.textSecondary }}>{label}</span>
                      </div>
                      <span className="text-[12.5px] font-semibold" style={{ color: C.textPrimary }}>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          RELATED ARTICLES
      ══════════════════════════════════ */}
      <section className="py-20 pb-25 border-t" style={{ background: C.bgSection, borderTopColor: C.border }}>
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 lg:px-11">
          <motion.div {...fw(0)} className="flex items-end justify-between mb-11 flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.10em] uppercase" style={{ color: C.tealAccent }}>
                Keep reading
              </span>
              <h2 className="font-serif text-[34px] font-bold mt-3 m-0 tracking-tighter leading-tight" style={{ color: C.textPrimary }}>
                Related <GText>articles</GText>
              </h2>
            </div>
            <motion.button whileHover={{ x: 3 }}
              className="flex items-center gap-2 bg-none border-none cursor-pointer text-sm font-semibold p-0 font-inherit" style={{ color: C.primaryBlue }}
            >
              View all articles <ArrowRight size={15} />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED.map((post, i) => (
              <RelatedCard key={post.id} post={post} delay={i * 0.09} />
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default BlogDetailPage;