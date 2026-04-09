import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {

  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Video,
  Zap,
  Send,
  ChevronRight,
  Heart,
  Shield,
  Award,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = ({ settingData = null, serviceData = [] }) => {
  const navigate = useNavigate();

  // ========== DUMMY DATA (since no context/API available) ==========
  const siteData = {
    site_web_logo: null,
    site_logo_alt: "Skilled Workers Cloud Logo",
    site_name: "SKILLED WORKERS CLOUD",
    street_address: "Suite 602, 6th Floor",
    city: "London",
    state: "",
    zip: "E7 9HZ",
    country: "United Kingdom",
    email: "info@skilledworkerscloud.co.uk",
    phone: "+44 0208 129 1655",
    landline: "+44 0208 129 1655",
    fax: "",
    facebook: "https://facebook.com/skilledworkerscloud",
    twitter: "https://twitter.com/skilledhrcloud",
    linkedin: "https://linkedin.com/company/skilled-workers-cloud",
    instagram: "https://instagram.com/skilledworkerscloud",
  };

  // Dummy service data
  const dummyServiceData = [
    { name: "Web Development", slug: "web-development" },
    { name: "Mobile App Development", slug: "mobile-app-development" },
    { name: "Cloud Solutions", slug: "cloud-solutions" },
    { name: "IT Consulting", slug: "it-consulting" },
    { name: "Digital Marketing", slug: "digital-marketing" },
    { name: "Staff Augmentation", slug: "staff-augmentation" },
  ];

  const finalServiceData = serviceData.length > 0 ? serviceData : dummyServiceData;

  // Navigation handler for internal routes
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Social media links
  const socialLinks = [
    { icon: FaFacebook, url: siteData.facebook, label: "Facebook" },
    { icon: FaTwitter, url: siteData.twitter, label: "Twitter" },
    { icon: FaLinkedin, url: siteData.linkedin, label: "LinkedIn" },
    { icon: FaInstagram, url: siteData.instagram, label: "Instagram" },
  ];

  // Quick links with paths
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    ...finalServiceData.slice(0, 5).map((service) => ({
      name: service.name,
      path: `/service/${service.slug}`,
    })),
    { name: "Recruitment", path: "/recruitment" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // External links
  const externalLinks = [
    { name: "Google", url: "https://google.com", icon: ExternalLink },
    { name: "Facebook", url: "https://facebook.com", icon: FaFacebook },
    { name: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedin },
    { name: "Twitter", url: "https://twitter.com", icon: FaTwitter },
    { name: "Instagram", url: "https://instagram.com", icon: FaInstagram },
    { name: "Google Meet", url: "https://meet.google.com", icon: Video },
    { name: "Zoom", url: "https://zoom.us", icon: Video },
    { name: "Download Acrobat Reader", url: "https://get.adobe.com/reader/", icon: Download },
    { name: "Right to Work Check", url: "https://www.gov.uk/check-job-applicant-right-to-work", icon: ExternalLink },
    { name: "Microsoft Teams", url: "https://teams.microsoft.com", icon: Video },
    { name: "HO Media Blogs", url: "https://homeofficemedia.blog.gov.uk", icon: ExternalLink },
  ];

  // Login links
  const loginLinks = [
    { name: "HRMS Register", url: "https://skilledworkerscloud.co.uk/hrms-v2/register" },
    { name: "HRMS Organisation Login", url: "https://skilledworkerscloud.co.uk/hrms-v2/" },
    { name: "Employee Login", url: "https://skilledworkerscloud.co.uk/hrms-v2/" },
  ];

  // Policy links
  const policyLinks = [
    { name: "Privacy Policy", path: "/policy/privacy-policy" },
    { name: "My Privacy Rights", path: "/policy/my-privacy-rights" },
    { name: "Terms of Use", path: "/policy/terms-of-use" },
    { name: "Sitemap", path: "/sitemap" },
  ];

  // Stats data
  const stats = [
    { value: "12+", label: "Years Experience", icon: Award },
    { value: "500+", label: "Projects Delivered", icon: Zap },
    { value: "98%", label: "Client Satisfaction", icon: Heart },
    { value: "40+", label: "Countries Served", icon: Globe },
  ];

  // Footer links structure
  const footerLinks = {
    quick: { title: "Quick Links", links: quickLinks },
    external: { title: "Resources", links: externalLinks.map(l => ({ label: l.name, path: l.url, external: true })) },
    login: { title: "Login Links", links: loginLinks.map(l => ({ label: l.name, path: l.url, external: true })) },
    legal: { title: "Legal", links: policyLinks },
  };

  // Newsletter handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Subscribing email:", email);
    alert("Thank you for subscribing to our newsletter!");
    e.target.reset();
  };

  // ICO Certificate handler
  const handleICOCertificate = () => {
    window.open("https://ico.org.uk/ESDWebPages/Entry/ZB620846", "_blank");
  };

  // Format address
  const formatAddress = () => {
    const parts = [siteData.street_address, siteData.city, siteData.state, siteData.zip, siteData.country].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Suite 602, 6th Floor, 252–262 Romford Road, London, E7 9HZ United Kingdom.";
  };

  const primaryEmail = siteData.email;
  const primaryPhone = siteData.phone;
  const landline = siteData.landline;

  return (
    <>
      <style>{`
        :root {
          --ft-bg-deep:      #0B1120;
          --ft-bg-card:      #111827;
          --ft-bg-subtle:    #141e2e;
          --ft-border:       rgba(255,255,255,0.07);
          --ft-text:         #F9FAFB;
          --ft-muted:        #9CA3AF;
          --ft-faint:        #4B5563;
          --primary:         #1E3A8A;
          --primary-light:   #3B82F6;
          --teal:            #14B8A6;
          --swc-red:         #E60023;
          --swc-purple:      #9B3DFF;
          --gradient:        linear-gradient(135deg,#1E3A8A 0%,#2563EB 50%,#14B8A6 100%);
          --gradient-text:   linear-gradient(135deg,#60A5FA,#14B8A6);
          --gradient-red:    linear-gradient(135deg,#E60023 0%,#B8001C 100%);
        }

        .footer {
          position: relative;
          background: var(--ft-bg-deep);
          overflow: hidden;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
        }

        /* Decorative blobs */
        .footer__blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.15;
        }
        .footer__blob--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #1E3A8A 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .footer__blob--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, var(--swc-red) 0%, transparent 70%);
          bottom: 60px; right: -80px;
          opacity: 0.1;
        }
        .footer__blob--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, var(--swc-purple) 0%, transparent 70%);
          top: 40%; left: 55%;
          opacity: 0.08;
        }

        /* Grid pattern */
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .footer__inner { position: relative; z-index: 1; }

        /* CTA Banner */
        .footer__cta-band {
          border-bottom: 1px solid var(--ft-border);
          padding: 3rem 2rem;
        }
        .footer__cta-band-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .footer__cta-text h2 {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 700;
          color: var(--ft-text);
          letter-spacing: -0.03em;
        }
        .footer__cta-text h2 span {
          background: var(--gradient-text);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer__cta-text p {
          margin-top: 0.5rem;
          color: var(--ft-muted);
          font-size: 0.875rem;
        }
        .footer__cta-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .footer__btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0.7rem 1.5rem;
          background: var(--gradient-red);
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .footer__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(230,0,35,0.3);
        }
        .footer__btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0.7rem 1.4rem;
          background: transparent;
          color: var(--ft-text);
          font-weight: 500;
          font-size: 0.875rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .footer__btn-outline:hover {
          border-color: var(--swc-purple);
          background: rgba(155,61,255,0.1);
          transform: translateY(-2px);
        }

        /* Stats Row */
        .footer__stats {
          border-bottom: 1px solid var(--ft-border);
          padding: 2rem 2rem;
        }
        .footer__stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 767px) {
          .footer__stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
        .footer__stat {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 1rem 1.25rem;
          background: var(--ft-bg-card);
          border: 1px solid var(--ft-border);
          border-radius: 14px;
          transition: all 0.2s ease;
        }
        .footer__stat:hover {
          border-color: var(--swc-purple);
          transform: translateY(-3px);
        }
        .footer__stat-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, rgba(230,0,35,0.15), rgba(155,61,255,0.1));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--swc-red);
        }
        .footer__stat-val {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ft-text);
        }
        .footer__stat-label {
          font-size: 0.7rem;
          color: var(--ft-muted);
          margin-top: 2px;
        }

        /* Main Grid */
        .footer__main {
          padding: 3.5rem 2rem 2.5rem;
          border-bottom: 1px solid var(--ft-border);
        }
        .footer__main-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 1199px) {
          .footer__main-inner {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .footer__brand { grid-column: span 3; }
        }
        @media (max-width: 767px) {
          .footer__main-inner {
            grid-template-columns: 1fr 1fr;
          }
          .footer__brand { grid-column: span 2; }
        }
        @media (max-width: 479px) {
          .footer__main-inner { grid-template-columns: 1fr; }
          .footer__brand { grid-column: span 1; }
        }

        /* Brand Column */
        .footer__brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          cursor: pointer;
        }
        .footer__brand-mark {
          width: 42px; height: 42px;
          background: var(--gradient-red);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(230,0,35,0.3);
        }
        .footer__brand-name {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ft-text);
        }
        .footer__brand-name span {
          background: var(--gradient-text);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer__brand-tagline {
          font-size: 0.6rem;
          color: var(--ft-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .footer__brand-desc {
          margin-top: 1rem;
          color: var(--ft-muted);
          font-size: 0.85rem;
          line-height: 1.6;
          max-width: 280px;
        }
        .footer__contact-list {
          list-style: none;
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer__contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: var(--ft-muted);
        }
        .footer__contact-item:hover { color: var(--swc-red); }
        .footer__contact-icon {
          width: 28px; height: 28px;
          background: rgba(230,0,35,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--swc-red);
        }

        /* Newsletter */
        .footer__newsletter {
          margin-top: 1.5rem;
        }
        .footer__newsletter-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--ft-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.6rem;
        }
        .footer__newsletter-form {
          display: flex;
          background: var(--ft-bg-card);
          border: 1px solid var(--ft-border);
          border-radius: 10px;
          overflow: hidden;
          max-width: 280px;
        }
        .footer__newsletter-form:focus-within {
          border-color: var(--swc-purple);
        }
        .footer__newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 0.6rem 0.8rem;
          font-size: 0.8rem;
          color: var(--ft-text);
        }
        .footer__newsletter-input::placeholder { color: var(--ft-faint); }
        .footer__newsletter-btn {
          width: 38px;
          background: var(--gradient-red);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .footer__newsletter-btn:hover { opacity: 0.9; }

        /* Column Styles */
        .footer__col-title {
          font-family: 'Sora', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--ft-text);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
          padding-bottom: 0.6rem;
          position: relative;
        }
        .footer__col-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 28px; height: 2px;
          background: var(--gradient-red);
          border-radius: 2px;
        }
        .footer__col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .footer__col-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0.35rem 0;
          color: var(--ft-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          cursor: pointer;
          background: none;
          // border: none;
          width: 100%;
          text-align: left;
          box-shadow: none;
        }
        .footer__col-link:hover {
          color: var(--ft-text);
          gap: 10px;
        }
        .footer__col-link-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.15s ease;
          color: var(--swc-red);
        }
        .footer__col-link:hover .footer__col-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Social Icons */
        .footer__socials {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }
        .footer__social-link {
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ft-bg-card);
          border: 1px solid var(--ft-border);
          border-radius: 10px;
          color: var(--ft-muted);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .footer__social-link:hover {
          background: var(--gradient-red);
          color: #fff;
          transform: translateY(-3px);
          border-color: transparent;
        }

        /* Bottom Bar */
        .footer__bottom {
          padding: 1.5rem 2rem;
        }
        .footer__bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer__copyright {
          font-size: 0.8rem;
          color: var(--ft-faint);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer__copyright-heart {
          color: var(--swc-red);
          animation: heartbeat 1.6s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }
        .footer__bottom-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .footer__bottom-link {
          font-size: 0.8rem;
          color: var(--ft-faint);
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
        }
        .footer__bottom-link:hover { color: var(--swc-red); }
        .footer__trust {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: var(--ft-faint);
        }
        .footer__trust-icon { color: var(--swc-red); }
        .footer__gradient-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230,0,35,0.3), rgba(155,61,255,0.3), transparent);
        }
        .footer__badge {
          font-size: 0.6rem;
          padding: 2px 6px;
          background: rgba(230,0,35,0.15);
          color: var(--swc-red);
          border-radius: 20px;
          margin-left: 6px;
        }
        a, button { cursor: pointer; }
      `}</style>

      <footer className="footer">
        <div className="footer__blob footer__blob--1" />
        <div className="footer__blob footer__blob--2" />
        <div className="footer__blob footer__blob--3" />

        <div className="footer__inner">
         

       

          {/* Main Grid */}
          <div className="footer__main">
            <div className="footer__main-inner">
              {/* Brand Column */}
              <div className="footer__brand">
                <div onClick={() => handleNavigation("/")} className="footer__brand-logo">
                  <img src="/image/swc_logo.png" alt="" />
                </div>
                <p className="footer__brand-desc">
                  We craft cutting-edge digital experiences for forward-thinking businesses. 
                  From strategy to launch — we're your end-to-end technology partner.
                </p>
                <ul className="footer__contact-list">
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><Mail size={12} /></span>
                    {primaryEmail}
                  </li>
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><Phone size={12} /></span>
                    {primaryPhone}
                  </li>
                  <li className="footer__contact-item">
                    <span className="footer__contact-icon"><MapPin size={12} /></span>
                    {formatAddress()}
                  </li>
                </ul>


                {/* Socials */}
                <div className="footer__socials">
                  {socialLinks.filter(s => s.url).map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="footer__social-link">
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links Column */}
              <div>
                <h4 className="footer__col-title">Quick Links</h4>
                <ul className="footer__col-links">
                  {quickLinks.slice(0, 10).map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} onClick={() => window.scrollTo(0, 0)} className="footer__col-link">
                        <ChevronRight size={12} className="footer__col-link-arrow" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h4 className="footer__col-title">Resources</h4>
                <ul className="footer__col-links">
                  {externalLinks.slice(0, 6).map((link) => (
                    <li key={link.name}>
                      <Link to={link.url} target="_blank" rel="noopener noreferrer" className="footer__col-link">
                        <ChevronRight size={12} className="footer__col-link-arrow" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Login Links Column */}
              <div>
                <h4 className="footer__col-title">Login Links</h4>
                <ul className="footer__col-links">
                  {loginLinks.map((link) => (
                    <li key={link.name}>
                      <Link to={link.url} target="_blank" rel="noopener noreferrer" className="footer__col-link">
                        <ChevronRight size={12} className="footer__col-link-arrow" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <button onClick={handleICOCertificate} className="footer__col-link" style={{ color: 'var(--swc-red)' }}>
                    <Shield size={14} />
                    ICO Certificate
                  </button>
                </div>
              </div>

              {/* Legal Column */}
              <div>
                <h4 className="footer__col-title">Legal</h4>
                <ul className="footer__col-links">
                  {policyLinks.map((link) => (
                    <li key={link.name}>
                      <Link onClick={() => handleNavigation(link.path)} className="footer__col-link">
                        <ChevronRight size={12} className="footer__col-link-arrow" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Gradient Divider */}
          <div className="footer__gradient-line" />

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <div className="footer__bottom-inner">
              <p className="footer__copyright">
                © {new Date().getFullYear()} {siteData.site_name}. Made with
                <Heart size={12} className="footer__copyright-heart" fill="currentColor" />
                for the web.
              </p>
              <div className="footer__bottom-links">
                {policyLinks.map((link) => (
                  <button key={link.name} onClick={() => handleNavigation(link.path)} className="footer__bottom-link">
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="footer__trust">
                <Shield size={13} className="footer__trust-icon" />
                SSL Secured · GDPR Compliant
              </div>
            </div>
            <div className="text-center mt-3 text-gray-600 text-xs pt-4!">
              Registered in {siteData.country} | Company Number: 12345678 | VAT Number: GB123456789
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;