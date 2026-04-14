import React, { useState } from "react";
import CEO from "../assets/CEO.jpeg";
import {Link} from "react-router-dom"


// Brand Colors:
// Deep Maroon : #5a0b00
// Gold Yellow : #f9d300
// Off White   : #fdfdfd (background)

const SERVICES = [
  { id: "01", title: "CAREER DEVELOPMENT CONSULTATIONS" },
  { id: "02", title: "⁠PERSONAL DEVELOPMENT MASTERCLASS" },
  { id: "03", title: "PROFESSIONAL TRAINING MASTERCLASS WITH ORGANIZATIONS" },
  { id: "04", title: "⁠COACHING SESSIONS WITH THEAYOBAMIOMOMEJI" },
];

export default function Services() {
  const [activeId, setActiveId] = useState("02");

  return (
    <section className="w-full min-h-screen bg-[#fdfdfd] flex flex-col py-12 px-6 md:px-12 lg:px-20">

      {/* ── "Our Services" tag — top left ── */}
      <div className="w-full max-w-6xl mx-auto mb-10 pt-12">
        <span className="inline-block border border-[#5a0b00] text-[#5a0b00] text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 font-sans">
          Our Services
        </span>
      </div>

      {/* ── Main content row ── */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── LEFT: CEO Photo ── */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-72 md:w-80">

              {/* Gold corner brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-[3px] border-l-[3px] border-[#f9d300]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-[3px] border-r-[3px] border-[#f9d300]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[3px] border-l-[3px] border-[#f9d300]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-[3px] border-r-[3px] border-[#f9d300]" />

              {/* Photo box */}
              <div className="w-full aspect-[3/4] bg-[#5a0b00] overflow-hidden relative">

                {/* CEO image — replace src with real path */}
                <img
                  src={CEO}
                  alt="CEO"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />

             

                {/* Bottom name strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#5a0b00] to-transparent p-4 pt-10">
                  <p className="text-[#fdfdfd] font-serif font-bold text-lg leading-tight"> OMOMEJI AYOBAMI E.</p>
                  <p className="text-[#f9d300] text-[10px] tracking-[0.22em] uppercase font-sans mt-1">
                    FOUNDER & CEO
                  </p>
                </div>
              </div>

             

              {/* Maroon side accent bar */}
              <div className="absolute top-0 -left-5 w-1 h-full bg-[#5a0b00]" />

            </div>
          </div>

          {/* ── RIGHT: Services ── */}
          <div className="w-full lg:w-7/12">

            {/* Service rows */}
            <div className="flex flex-col">
              {SERVICES.map((svc) => {
                const isActive = activeId === svc.id;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveId(svc.id)}
                    className={`group w-full text-left relative border-t border-[#5a0b00]/15 last:border-b last:border-[#5a0b00]/15 focus:outline-none transition-colors duration-200 ${
                      isActive ? "bg-[#5a0b00]/5" : "bg-transparent hover:bg-[#f9d300]/10"
                    }`}
                  >
                    {/* Active left bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                        isActive ? "bg-[#f9d300]" : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-center gap-5 px-5 py-5">

                      {/* Number badge */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center border transition-all duration-200 ${
                          isActive
                            ? "bg-[#5a0b00] border-[#f9d300]"
                            : "bg-transparent border-[#5a0b00]/30"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold font-sans tracking-wider ${
                            isActive ? "text-[#f9d300]" : "text-[#5a0b00]"
                          }`}
                        >
                          {svc.id}
                        </span>
                      </div>

                      {/* Title — always fully visible */}
                      <h3 className="flex-1 font-serif text-base md:text-lg font-bold leading-snug text-[#5a0b00]">
                        {svc.title}
                      </h3>

                      {/* Arrow — only on active */}
                      <div className={`flex-shrink-0 ${isActive ? "opacity-100" : "opacity-0"}`}>
                        <svg
                          className="w-4 h-4 text-[#f9d300]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>

                    </div>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#5a0b00]/10 my-8" />

            {/* CTA Button */}
            <button className="inline-flex items-center gap-3 bg-[#f9d300] text-[#5a0b00] font-bold font-sans text-sm tracking-wide px-7 py-4 rounded-full border-2 border-[#f9d300] hover:bg-[#5a0b00] hover:text-[#f9d300] hover:border-[#5a0b00] transition-all duration-300 cursor-pointer shadow-md">
              Work with the Nexarion Group
              <span className="w-7 h-7 rounded-full bg-[#5a0b00]/10 flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}