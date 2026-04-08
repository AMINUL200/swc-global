import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  Zap,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Nav Data ─── */
const navLinks = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About Us", path: "/about" },
  {
    id: "services",
    label: "Services",
    path: "/services",
    dropdown: [
      { id: "service-1", label: "Web Development", path: "#" },
      { id: "service-2", label: "UI/UX Design", path: "#" },
      { id: "service-3", label: "Cloud Solutions", path: "#" },
      { id: "service-4", label: "Digital Marketing", path: "#" },
    ],
  },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/contact" },
];

const countries = [
  { code: "US", label: "English (US)", flag: "🇺🇸" },
  { code: "BD", label: "বাংলা (BD)", flag: "🇧🇩" },
  { code: "IN", label: "Hindi (IN)", flag: "🇮🇳" },
  { code: "GB", label: "English (UK)", flag: "🇬🇧" },
  { code: "DE", label: "Deutsch (DE)", flag: "🇩🇪" },
];

/* ─── Dropdown Hook ─── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return { open, setOpen, ref };
}

/* ─── Services Mega Dropdown ─── */
const ServicesDropdown = ({ items, visible }) => (
  <div
    className={`services-dropdown ${visible ? "services-dropdown--visible" : ""}`}
  >
    <div className="services-dropdown__inner">
      <p className="services-dropdown__label">What we offer</p>
      {items.map((item) => (
        <Link key={item.id} to={item.path} className="services-dropdown__item" onClick={() =>  setActiveDropdown(null)}>
          <span className="services-dropdown__item-icon">
            <Zap size={14} />
          </span>
          <span>{item.label}</span>
          <ArrowUpRight size={14} className="services-dropdown__item-arrow" />
        </Link>
      ))}
    </div>
  </div>
);

/* ─── Country Selector ─── */
const CountrySelector = () => {
  const { open, setOpen, ref } = useDropdown();
  const [selected, setSelected] = useState(countries[0]);
  return (
    <div ref={ref} className="country-selector">
      <button
        className="country-selector__trigger"
        onClick={() => setOpen(!open)}
        aria-label="Select language/region"
      >
        <Globe size={16} className="country-selector__globe" />
        <span className="country-selector__flag">{selected.flag}</span>
        <span className="country-selector__code">{selected.code}</span>
        <ChevronDown
          size={14}
          className={`country-selector__chevron ${open ? "country-selector__chevron--open" : ""}`}
        />
      </button>
      {open && (
        <div className="country-selector__panel">
          {countries.map((c) => (
            <button
              key={c.code}
              className={`country-selector__option ${selected.code === c.code ? "country-selector__option--active" : ""}`}
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
              {selected.code === c.code && (
                <span className="country-selector__option-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Navbar ─── */
const Navbar = ({ toggleMenu }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
    if (toggleMenu) toggleMenu(!mobileOpen);
  };

  const timeoutRef = useRef(null);

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        :root {
          --nb-height: 80px;
          --nb-bg: rgba(255,255,255,0.95);
          --nb-bg-scrolled: rgba(255,255,255,0.98);
          --nb-border: rgba(30,58,138,0.12);
          --nb-shadow: 0 1px 0 rgba(30,58,138,0.08);
          --nb-shadow-scrolled: 0 4px 24px rgba(30,58,138,0.10);
          --primary: #1E3A8A;
          --primary-hover: #1d4ed8;
          --teal: #14B8A6;
          --teal-hover: #0d9488;
          --text: #111827;
          --text-muted: #6B7280;
          --gradient: linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
        }

        /* ── Wrapper ── */
        .navbar-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        /* ── Bar ── */
        .navbar {
          height: var(--nb-height);
          background: var(--nb-bg);
          border-bottom: 1px solid var(--nb-border);
          box-shadow: var(--nb-shadow);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .navbar--scrolled {
          background: var(--nb-bg-scrolled);
          box-shadow: var(--nb-shadow-scrolled);
        }

        .navbar__inner {
          max-width: 1400px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          gap: 1.5rem;
        }

        /* ── Logo (INCREASED SIZE) ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
          user-select: none;
        }
        .navbar__logo-mark {
          width: 44px; height: 44px;
          background: var(--gradient);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(30,58,138,0.3);
          flex-shrink: 0;
        }
        .navbar__logo-mark svg { 
          color: #fff; 
          width: 22px;
          height: 22px;
        }
        .navbar__logo-text {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--primary);
          line-height: 1.2;
        }
        .navbar__logo-text span {
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .navbar__logo-tagline {
          font-size: 0.7rem;
          font-family: 'DM Sans', system-ui, sans-serif;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 2px;
          display: block;
        }

        /* ── Desktop Nav Links (INCREASED SIZE) ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          flex: 1;
          justify-content: center;
        }
        @media (max-width: 1023px) { .navbar__links { display: none; } }

        .navbar__link-item { position: relative; }

        .navbar__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.625rem 1.125rem;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          letter-spacing: 0.005em;
        }
        .navbar__link:hover,
        .navbar__link--active {
          color: var(--primary);
          background: rgba(30,58,138,0.08);
        }
        .navbar__link-chevron {
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1);
          color: var(--text-muted);
        }
        .navbar__link-chevron--open { transform: rotate(180deg); }

        /* ── Services Dropdown (INCREASED SIZE) ── */
        .services-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 260px;
          background: #fff;
          border: 1px solid rgba(30,58,138,0.10);
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(30,58,138,0.15), 0 2px 8px rgba(30,58,138,0.08);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.2,0.64,1);
          z-index: 100;
          overflow: hidden;
        }
        .services-dropdown--visible {
          opacity: 1;
          pointer-events: all;
          transform: translateX(-50%) translateY(0) !important;
        }
        .services-dropdown__inner { padding: 0.75rem; }
        .services-dropdown__label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.5rem 0.75rem 0.5rem;
        }
        .services-dropdown__item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.75rem 0.875rem;
          border-radius: 10px;
          text-decoration: none;
          color: var(--text);
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease;
          position: relative;
        }
        .services-dropdown__item:hover {
          background: rgba(30,58,138,0.06);
          color: var(--primary);
        }
        .services-dropdown__item-icon {
          width: 28px; height: 28px;
          background: rgba(20,184,166,0.12);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--teal);
        }
        .services-dropdown__item-arrow {
          margin-left: auto;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.15s ease, transform 0.15s ease;
          color: var(--primary);
        }
        .services-dropdown__item:hover .services-dropdown__item-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Right Side Actions (INCREASED SIZE) ── */
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        /* ── Country Selector (INCREASED SIZE) ── */
        .country-selector { position: relative; }
        .country-selector__trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.5625rem 1rem;
          background: rgba(30,58,138,0.06);
          border: 1px solid rgba(30,58,138,0.12);
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--primary);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .country-selector__trigger:hover {
          background: rgba(30,58,138,0.1);
          border-color: rgba(30,58,138,0.25);
        }
        .country-selector__globe { color: var(--text-muted); flex-shrink: 0; }
        .country-selector__chevron {
          transition: transform 0.25s cubic-bezier(0.34,1.2,0.64,1);
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .country-selector__chevron--open { transform: rotate(180deg); }
        .country-selector__panel {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #fff;
          border: 1px solid rgba(30,58,138,0.10);
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(30,58,138,0.15);
          min-width: 210px;
          overflow: hidden;
          padding: 0.5rem;
          z-index: 200;
          animation: dropIn 0.2s cubic-bezier(0.34,1.2,0.64,1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .country-selector__option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.875rem;
          color: var(--text);
          text-align: left;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .country-selector__option:hover { background: rgba(30,58,138,0.06); color: var(--primary); }
        .country-selector__option--active { color: var(--primary); font-weight: 600; }
        .country-selector__option-check { margin-left: auto; color: var(--teal); font-weight: 700; font-size: 0.875rem; }

        /* ── CTA Button (INCREASED SIZE) ── */
        .navbar__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 1rem 1.5rem;
          background: var(--gradient);
          color: #fff;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(30,58,138,0.3);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, filter 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.005em;
        }
        .navbar__cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30,58,138,0.4);
          filter: brightness(1.05);
        }
        .navbar__cta:active { transform: scale(0.97); }
        @media (max-width: 1023px) { 
          .navbar__cta-text { display: inline; }
          .navbar__cta { padding: 0.5625rem 1.25rem; }
        }

        /* ── Hamburger (FIXED VISIBILITY) ── */
        .navbar__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(30,58,138,0.08);
          border: 1.5px solid rgba(30,58,138,0.15);
          border-radius: 12px;
          cursor: pointer;
          color: var(--primary);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .navbar__hamburger:hover { 
          background: rgba(30,58,138,0.15);
          border-color: rgba(30,58,138,0.3);
          transform: scale(1.02);
        }
        .navbar__hamburger svg {
          width: 22px;
          height: 22px;
          color: var(--primary);
        }
        @media (max-width: 1023px) { 
          .navbar__hamburger { 
            display: flex; 
          }
        }

        /* ── Mobile Drawer (INCREASED SIZE) ── */
        .mobile-drawer {
          position: fixed;
          top: var(--nb-height); 
          left: 0; 
          right: 0; 
          bottom: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding: 1.5rem 1.5rem 2rem;
          overflow-y: auto;
          z-index: 999;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease;
        }
        .mobile-drawer--open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-drawer__links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mobile-drawer__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1rem;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          transition: background 0.15s ease, color 0.15s ease;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        .mobile-drawer__link:hover {
          background: rgba(30,58,138,0.06);
          color: var(--primary);
        }
        .mobile-drawer__sub {
          padding: 0.5rem 0.5rem 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mobile-drawer__sub-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 0.875rem;
          border-radius: 10px;
          text-decoration: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.875rem;
          color: var(--text-muted);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .mobile-drawer__sub-link:hover { 
          background: rgba(20,184,166,0.08); 
          color: var(--teal); 
        }
        .mobile-drawer__sub-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          flex-shrink: 0;
        }
        .mobile-drawer__divider {
          height: 1px;
          background: rgba(30,58,138,0.08);
          margin: 1.25rem 0;
        }
        .mobile-drawer__footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .mobile-drawer__cta {
          flex: 1;
          min-width: 140px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.875rem 1.5rem;
          background: var(--gradient);
          color: #fff;
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(30,58,138,0.24);
        }

        /* ── Active Indicator Dot ── */
        .navbar__link--current::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--teal);
        }
      `}</style>

      <div className="navbar-wrapper">
        <nav
          className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
          ref={navRef}
        >
          <div className="navbar__inner">
            {/* ── Logo ── */}
            <Link href="/" className="navbar__logo">
              <img
                src="/image/swc_logo.png"
                alt="Logo"
                className="w-auto! h-18"
              />
            </Link>

            {/* ── Desktop Links ── */}
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className="navbar__link-item"
                  onMouseEnter={() => {
                    clearTimeout(timeoutRef.current); // stop closing
                    setActiveDropdown(link.id);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 200); // delay close
                  }}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        className={`navbar__link ${activeDropdown === link.id ? "navbar__link--active" : ""}`}
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.id ? null : link.id,
                          )
                        }
                        aria-expanded={activeDropdown === link.id}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`navbar__link-chevron ${activeDropdown === link.id ? "navbar__link-chevron--open" : ""}`}
                        />
                      </button>
                     
                        <ServicesDropdown
                          items={link.dropdown}
                          visible={activeDropdown === link.id}
                        />
                    </>
                  ) : (
                    <a href={link.path} className="navbar__link">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Right Actions ── */}
            <div className="navbar__actions">
              <CountrySelector />
              <a
                href="/contact"
                className="navbar__cta hidden! sm:inline-flex! btn-slide-bg py-4"
              >
                <Zap size={14} strokeWidth={2.5} />
                <span className="navbar__cta-text">Get Started</span>
              </a>
              <button
                className="navbar__hamburger"
                onClick={handleMobileToggle}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X  />
                ) : (
                  <Menu />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Drawer ── */}
        <div
          className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}
        >
          <ul className="mobile-drawer__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.dropdown ? (
                  <>
                    <button
                      className="mobile-drawer__link"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === link.id ? null : link.id,
                        )
                      }
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transition: "transform 0.25s ease",
                          transform:
                            mobileExpanded === link.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          color: "var(--text-muted)",
                        }}
                      />
                    </button>
                    {mobileExpanded === link.id && (
                      <div className="mobile-drawer__sub">
                        {link.dropdown.map((sub) => (
                          <a
                            key={sub.id}
                            href={sub.path}
                            className="mobile-drawer__sub-link"
                          >
                            <span className="mobile-drawer__sub-dot" />
                            {sub.label}
                            <ChevronRight
                              size={14}
                              style={{ marginLeft: "auto", opacity: 0.4 }}
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={link.path} className="mobile-drawer__link">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-drawer__divider" />

          <div className="mobile-drawer__footer">
            <CountrySelector />
            <a href="/contact" className="mobile-drawer__cta">
              <Zap size={16} strokeWidth={2.5} />
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Spacer so content isn't hidden under fixed nav */}
      <div style={{ height: "var(--nb-height)" }} />
    </>
  );
};

export default Navbar;
