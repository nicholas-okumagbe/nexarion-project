import React, { useState } from "react";
import CEO from "../assets/CEO.jpeg";
import Benjamin from "../assets/Benjamin.jpeg";
import Burekomi from "../assets/Burekemi.jpeg";
import Mercy from "../assets/Mercy.jpeg";
import Omolara from "../assets/Omolara.jpeg";
import nex from "../assets/nex.png"; 

// ── Brand Colors ──
// Deep Maroon : #5a0b00
// Gold Yellow : #f9d300
// Off White   : #fdfdfd

const TEAM = [
  {
    id: 1,
    name: " OMOMEJI AYOBAMI E.",
    role: "FOUNDER, HEAD OF HR",
    quote: "Championing people-first leadership that transforms organizations from within.",
    image: CEO,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
  {
    id: 2,
    name: "BUREKOMI ENIOBANKE",
    role: "COO/HEAD, LEARNING & DEVELOPMENT",
    quote: "Refining operational excellence with systemic innovation and educational grit.",
    image: Burekomi,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
  {
    id: 3,
    name: "AKINJOGBIN T. OMOLARA ",
    role: "ADMINISTRATIVE ASSISTANT",
    quote: "Driving impact through creativity, strategy, and relentless execution.",
    image: Omolara,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
  {
    id: 4,
    name: "AREMU O. BENJAMIN",
    role: "HEAD OF DESIGN",
    quote: "Crafting visual identities that speak louder than words ever could.",
    image: Benjamin,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
  {
    id: 5,
    name: "OGHENE MERCY RUTH",
    role: "SOCIAL MEDIA MANAGER",
    quote: "Building bridges between vision and reality, one step at a time.",
    image: Mercy,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
  {
    id: 6,
    name: "OKUMAGBE NICHOLAS",
    role: "HEAD OF TECHNOLOGY",
    quote: "Turning bold ideas into measurable Visual outcomes through focused action.",
    image: nex,
    linkedin: "https://www.linkedin.com/company/thenexariongroup/",
    instagram: "https://www.instagram.com/thenexariongroup?igsh=MTVlZWphZDVrdzNzMQ==",
  },
];

// ── Internal icon components ──
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Internal card component — NOT exported ──
function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          aspectRatio: "3/4",
          backgroundColor: "#1a0303",
          transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.45s ease",
          transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? "0 32px 64px rgba(90,11,0,0.35), 0 0 0 2px #f9d300"
            : "0 8px 24px rgba(90,11,0,0.15), 0 0 0 1px rgba(90,11,0,0.1)",
        }}
      >
        {/* Image — only renders when src exists and has not errored */}
        {member.image && !imgFailed && (
       <img
  src={member.image}
  alt={member.name}
  className="absolute inset-0 w-full h-full object-cover object-top"
  style={{
    transition: "transform 0.6s ease",
    transform: hovered ? "scale(1.08)" : "scale(1)",
  }}
  onError={() => setImgFailed(true)}
/>
        )}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(10,1,1,0.05) 0%, rgba(10,1,1,0.65) 100%)",
          }}
        />

        {/* Hover content */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-7"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Gold accent line */}
          <div
            className="mb-5"
            style={{
              width: hovered ? 52 : 0,
              height: 3,
              backgroundColor: "#f9d300",
              transition: "width 0.5s ease 0.1s",
              borderRadius: 2,
            }}
          />

          {/* Quote */}
          <p
            className="text-[#fdfdfd] italic leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(13px, 1.4vw, 16px)",
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              transition: "transform 0.45s ease 0.1s",
            }}
          >
            "{member.quote}"
          </p>

          {/* Social icons */}
          <div
            className="flex gap-3 mt-6"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              transition: "transform 0.45s ease 0.18s",
            }}
          >
            <a
              href={member.linkedin}
                target="_blank"
               rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl text-[#fdfdfd]"
              style={{
                width: 42, height: 42,
                backgroundColor: "rgba(253,253,253,0.12)",
                border: "1px solid rgba(253,253,253,0.2)",
                transition: "background-color 0.25s ease, color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9d300";
                e.currentTarget.style.color = "#5a0b00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(253,253,253,0.12)";
                e.currentTarget.style.color = "#fdfdfd";
              }}
            >
              <LinkedInIcon />
            </a>
            <a
              href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl text-[#fdfdfd]"
              style={{
                width: 42, height: 42,
                backgroundColor: "rgba(253,253,253,0.12)",
                border: "1px solid rgba(253,253,253,0.2)",
                transition: "background-color 0.25s ease, color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9d300";
                e.currentTarget.style.color = "#5a0b00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(253,253,253,0.12)";
                e.currentTarget.style.color = "#fdfdfd";
              }}
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Name & Role */}
      <div className="mt-5 px-1">
        <h3
          className="font-black leading-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: "#5a0b00",
            transition: "letter-spacing 0.3s ease",
            letterSpacing: hovered ? "0.04em" : "0.01em",
          }}
        >
          {member.name}
        </h3>
        <span
          className="inline-block mt-2 font-bold tracking-[0.18em] uppercase"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(8px, 0.8vw, 10px)",
            color: "#f9d300",
            backgroundColor: "#5a0b00",
            padding: "3px 10px",
            borderRadius: 4,
          }}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

// ── ONE single export default ──
export default function OurTeam() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;600;700&display=swap');
      `}</style>

      <section className="w-full bg-[#fdfdfd] px-6 md:px-12 lg:px-20 py-14">
        <div className="w-full max-w-6xl mx-auto">

          {/* "Our Team" tag — top left */}
          <div className="mb-12">
            <span
              className="inline-block border-2 border-[#5a0b00] text-[#5a0b00] text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Team
            </span>
          </div>

          {/* 6-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}