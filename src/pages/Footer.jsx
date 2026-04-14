import React, { useState } from "react";
import { Link } from "react-router-dom";

// Colors from screenshot:
// Background : #0a0a0a (near black)
// Text       : #ffffff (white)
// Accent     : #f9d300 (gold yellow — "Subscribe" button & "Qeola" text)
// Input bg   : transparent with white border

// Icons — inline SVGs matching the screenshot social row
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A5 5 0 0 1 22 14v7zM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.5l5.797-1.522A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.368l-.358-.214-3.717.976.993-3.617-.233-.371A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
    </svg>
  );
}


function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="13 6 19 12 13 18"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: <LinkedInIcon />,  href: "https://www.linkedin.com/company/thenexariongroup/" },
  { icon: <FacebookIcon />,  href: "#" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==" },
  { icon: <WhatsappIcon />,  href: "#" },
 
];

const REACH_US = [
  { title: "About Us",   link: "/about" },
  { title: "Contact Us", link: "/about" },
  { title: "Visit Us",   link: "/about" },
];


const OUR_WORK = [
  { title: "Home",            link: "/" },
  { title: "Our Services",    link: "/service" },
  { title: "Our Story",       link: "/story" },
  { title: "Our Programs",    link: "/programs" },
  { title: "Signature Events",link: "/about" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .footer-link {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          transition: color 0.2s ease;
          cursor: pointer;
          text-decoration: none;
          display: block;
          line-height: 1;
        }
        .footer-link:hover { color: #f9d300; }
        .social-btn {
          width: 40px; height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .social-btn:hover {
          border-color: #f9d300;
          color: #f9d300;
          background: rgba(249,211,0,0.08);
        }
      `}</style>

      <footer
        className="w-full"
        style={{ backgroundColor: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Main footer content ── */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">

            {/* ── LEFT: Newsletter + Social ── */}
            <div className="w-full lg:w-5/12 flex flex-col gap-8">

              {/* Headline */}
              <h2
                className="text-white font-bold leading-tight"
                style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
              >
                Be the first to get exciting<br />news from nexariongroup
              </h2>

              {/* ONE single bordered pill — input + button both inside */}
              <div
                className="flex items-center w-full max-w-md"
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 50,
                  padding: "4px 4px 4px 20px",
                  height: 56,
                  backgroundColor: "transparent",
                }}
              >
                {/* Input — no border, just fills the space */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-sm"
                  style={{ fontFamily: "'Inter', sans-serif", minWidth: 0 }}
                />

                {/* Subscribe button — inside the border on the right */}
                <button
                  className="flex items-center gap-2 font-bold text-sm flex-shrink-0"
                  style={{
                    backgroundColor: "#f9d300",
                    color: "#0a0a0a",
                    height: "100%",
                    padding: "0 18px",
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "background-color 0.25s ease, box-shadow 0.25s ease",
                    whiteSpace: "nowrap",
                    boxShadow: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#c9a800";
                    e.currentTarget.style.boxShadow = "0 0 0 6px rgba(249,211,0,0.18), 0 0 24px rgba(249,211,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9d300";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Subscribe
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 8,
                      flexShrink: 0,
                    }}
                  >
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>

              {/* Social icons row */}
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Three link columns ── */}
            <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-4">

              {/* Reach Us */}
              <div className="flex flex-col gap-4">
                <h4
                  className="text-white font-bold text-base mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Reach Us
                </h4>
               {REACH_US.map((item) => (
  <Link key={item.title} to={item.link} className="footer-link">
    {item.title}
  </Link>
))}
              </div>


              {/* Our Work */}
              <div className="flex flex-col gap-4">
                <h4
                  className="text-white font-bold text-base mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our Work
                </h4>
               {OUR_WORK.map((item) => (
  <Link key={item.title} to={item.link} className="footer-link">
    {item.title}
  </Link>
))}
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="w-full border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          </div>
        </div>
      </footer>
    </>
  );
}