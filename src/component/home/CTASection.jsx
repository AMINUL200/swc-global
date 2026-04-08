import React, { useState } from "react";
import {
  Phone, Mail, MapPin, Clock, Calendar, User, Building,
  MessageSquare, CheckCircle, Shield, ArrowRight, X, AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
/* ─── Design tokens ─────────────────────────────────────────── */
const T = {
  navy:    "#0B1437",
  navyMid: "#111D4A",
  blue:    "#1E3A8A",
  accent:  "#3B82F6",
  teal:    "#14B8A6",
  white:   "#FFFFFF",
  offWhite:"#F8FAFF",
  muted:   "#94A3B8",
  border:  "rgba(255,255,255,0.08)",
  cardBg:  "rgba(255,255,255,0.04)",
};

/* ─── Tiny helpers ───────────────────────────────────────────── */
const GradientText = ({ children, from = T.accent, to = T.teal }) => (
  <span style={{
    background: `linear-gradient(135deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}>{children}</span>
);

const Tag = ({ children }) => (
  <span style={{
    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: T.teal,
    background: "rgba(20,184,166,0.12)",
    border: "1px solid rgba(20,184,166,0.25)",
    padding: "4px 12px", borderRadius: 999,
  }}>{children}</span>
);

/* ─── Contact pill ───────────────────────────────────────────── */
const ContactPill = ({ icon: Icon, label, value, href }) => (
  <motion.a
    href={href ?? undefined}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    style={{
      display: "flex", alignItems: "center", gap: 14,
      background: T.cardBg,
      border: `1px solid ${T.border}`,
      borderRadius: 14, padding: "16px 20px",
      textDecoration: "none", cursor: href ? "pointer" : "default",
      backdropFilter: "blur(10px)",
    }}
  >
    <div style={{
      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
      background: "linear-gradient(135deg, rgba(30,58,138,0.6), rgba(20,184,166,0.4))",
      border: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon size={16} color={T.teal} />
    </div>
    <div style={{ minWidth: 0 }}>
      <p style={{ fontSize: 11, color: T.muted, margin: 0, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontSize: 13.5, color: T.white, margin: 0, fontWeight: 500, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</p>
    </div>
  </motion.a>
);

/* ─── Benefit row ────────────────────────────────────────────── */
const Benefit = ({ text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true }}
    style={{ display: "flex", alignItems: "center", gap: 12 }}
  >
    <div style={{
      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg, rgba(20,184,166,0.3), rgba(59,130,246,0.3))",
      border: "1px solid rgba(20,184,166,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <CheckCircle size={11} color={T.teal} />
    </div>
    <span style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.5 }}>{text}</span>
  </motion.div>
);

/* ─── Form field ─────────────────────────────────────────────── */
const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 12, fontWeight: 600, color: "#475569",
      letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8,
    }}>
      <Icon size={12} color={T.accent} />{label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%", padding: "11px 16px",
  borderRadius: 10, fontSize: 14, color: "#1E293B",
  background: "#F8FAFF",
  border: "1px solid #E2E8F0",
  outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border-color 0.2s",
};

/* ─── Main component ─────────────────────────────────────────── */
const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", date: "", time: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Demo booked! We'll reach out within 24 hours.");
      setFormData({ name: "", company: "", email: "", phone: "", date: "", time: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contacts = [
    { icon: Phone, label: "Call us",   value: "+44 20 7123 4567",                      href: "tel:+442071234567" },
    { icon: Mail,  label: "Email us",  value: "hello@skilledworkerscloud.co.uk",         href: "mailto:hello@skilledworkerscloud.co.uk" },
    { icon: MapPin,label: "Office",    value: "123 Business St, London EC1A 1BB",       href: "https://maps.google.com" },
    { icon: Clock, label: "Support",   value: "24/7 Technical Support",                 href: null },
  ];

  const benefits = [
    "30-minute personalised demo",
    "No-obligation consultation",
    "Free HR process audit",
    "Custom implementation plan",
    "Post-demo support session",
  ];

  const focusStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? T.accent : "#E2E8F0",
    boxShadow: focused === name ? `0 0 0 3px rgba(59,130,246,0.12)` : "none",
  });

  return (
    <section style={{ fontFamily: "'DM Sans', system-ui, sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
      `}</style>

      {/* Toast */}
      

      {/* ── Layout: dark left | white right ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>

        {/* ── LEFT PANEL – dark navy ─────────────────────── */}
        <div style={{
          background: `linear-gradient(160deg, ${T.navy} 0%, ${T.navyMid} 60%, #0D1B52 100%)`,
          padding: "80px 56px",
          position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Ambient blobs */}
          <div style={{
            position: "absolute", top: -120, right: -120, width: 400, height: 400,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            animation: "shimmer 6s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: -80, left: -80, width: 300, height: 300,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)",
            animation: "shimmer 8s ease-in-out infinite 2s",
          }} />

          {/* Fine grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Tag>Get started today</Tag>

              <h2 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 48, fontWeight: 400, lineHeight: 1.1,
                color: T.white, margin: "28px 0 20px", letterSpacing: "-0.02em",
              }}>
                Transform your<br />
                <GradientText>HR operations</GradientText><br />
                from day one.
              </h2>

              <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.75, maxWidth: 400, margin: "0 0 48px" }}>
                Book a personalised demo with our HR experts and see how the platform streamlines every workflow — from recruitment to compliance.
              </p>
            </motion.div>

            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 52 }}>
              {benefits.map((b, i) => (
                <Benefit key={b} text={b} delay={0.1 + i * 0.08} />
              ))}
            </div>

            {/* Contact pills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 16 }}>
                Or reach us directly
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {contacts.map(c => (
                  <ContactPill key={c.label} {...c} />
                ))}
              </div>
            </motion.div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 24, marginTop: 44, paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
              {[
                { icon: Shield, text: "UK GDPR Compliant" },
                { icon: CheckCircle, text: "ISO 27001 Certified" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={14} color={T.teal} />
                  <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL – white form ───────────────────── */}
        <div style={{
          background: "#F8FAFF",
          padding: "80px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Subtle top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, #1E3A8A, #3B82F6, #14B8A6)",
          }} />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Form card */}
            <div style={{
              background: T.white,
              borderRadius: 24, border: "1px solid #E8EEF8",
              boxShadow: "0 4px 6px rgba(30,58,138,0.04), 0 24px 64px rgba(30,58,138,0.08)",
              overflow: "hidden",
            }}>
              {/* Card header */}
              <div style={{
                background: "linear-gradient(135deg, #1E3A8A 0%, #1d4ed8 60%, #0f766e 100%)",
                padding: "32px 36px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: T.white, margin: 0, fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    Book your demo
                  </h3>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Calendar size={16} color="white" />
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", margin: 0 }}>
                  We'll respond within 24 hours to confirm your session.
                </p>

                {/* Progress dots */}
                <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
                  {[1, 2, 3].map(n => (
                    <div key={n} style={{
                      height: 4, borderRadius: 99,
                      flex: n === 1 ? 2 : 1,
                      background: n === 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                    }} />
                  ))}
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} style={{ padding: "32px 36px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 20px", marginBottom: 20 }}>
                  <Field label="Full name" icon={User}>
                    <input name="name" type="text" required value={formData.name} onChange={handleChange}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="Jane Smith" style={focusStyle("name")} />
                  </Field>

                  <Field label="Company" icon={Building}>
                    <input name="company" type="text" required value={formData.company} onChange={handleChange}
                      onFocus={() => setFocused("company")} onBlur={() => setFocused(null)}
                      placeholder="Acme Ltd" style={focusStyle("company")} />
                  </Field>

                  <Field label="Email" icon={Mail}>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="jane@company.co.uk" style={focusStyle("email")} />
                  </Field>

                  <Field label="Phone" icon={Phone}>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      placeholder="+44 20 7123 4567" style={focusStyle("phone")} />
                  </Field>

                  <Field label="Preferred date" icon={Calendar}>
                    <input name="date" type="date" required value={formData.date} onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      onFocus={() => setFocused("date")} onBlur={() => setFocused(null)}
                      style={focusStyle("date")} />
                  </Field>

                  <Field label="Preferred time" icon={Clock}>
                    <select name="time" required value={formData.time} onChange={handleChange}
                      onFocus={() => setFocused("time")} onBlur={() => setFocused(null)}
                      style={{ ...focusStyle("time"), appearance: "none", cursor: "pointer" }}>
                      <option value="">Select a slot</option>
                      {["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Notes" icon={MessageSquare}>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    placeholder="Tell us about your HR challenges or any specific requirements…"
                    style={{ ...focusStyle("message"), resize: "none", lineHeight: 1.6 }} />
                </Field>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                  style={{
                    width: "100%", marginTop: 24, padding: "14px 24px",
                    borderRadius: 12, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
                    background: isSubmitting
                      ? "#94A3B8"
                      : "linear-gradient(135deg, #1E3A8A 0%, #1d4ed8 50%, #0f766e 100%)",
                    color: "white", fontSize: 15, fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: isSubmitting ? "none" : "0 4px 24px rgba(30,58,138,0.35)",
                    transition: "box-shadow 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "white",
                        animation: "spin 0.7s linear infinite",
                      }} />
                      Processing…
                    </>
                  ) : (
                    <>
                      Book my demo
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>

                <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", marginTop: 16, margin: "16px 0 0" }}>
                  By submitting you agree to our{" "}
                  <a href="#" style={{ color: T.accent, textDecoration: "none", fontWeight: 500 }}>Privacy Policy</a>.
                  No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
          section > div > div { padding: 56px 28px !important; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;