import React from "react";
import { Link } from "react-router-dom";

// ── Brand Colors ──
// Deep Maroon : #5a0b00  → all text
// Gold Yellow : #f9d300  → card backgrounds + vertical bar
// Off White   : #fdfdfd  → page background

export default function OurStory() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@400;600;700&display=swap');
      `}</style>

      <div className="w-full bg-black">

        {/* ══════════════════════════════════════════
            SECTION 1 — "OUR STORY." + quote
        ══════════════════════════════════════════ */}
        <section className="w-full  flex flex-col items-center justify-center px-6 md:px-16 py-2">

          {/* Headline */}
          <div className="text-center w-full mt-16">
            <h1
              className="leading-[1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span
                className="block font-black text-[#5a0b00]"
                style={{ fontSize: "clamp(56px, 12vw, 148px)" }}
              >
                OUR
              </span>
              <span
                className="block italic font-black text-[#5a0b00]"
                style={{ fontSize: "clamp(56px, 12vw, 148px)" }}
              >
                STORY.
              </span>
            </h1>
          </div>

          {/* Quote with vertical bar */}
          <div className="mt-16 md:mt-24 flex items-stretch gap-5 max-w-xl w-full mx-auto px-4 md:px-0">
            <div className="flex-shrink-0 w-[3px] bg-[#f9d300] rounded-full" />
            <p
              className="text-[#5a0b00] text-base md:text-lg lg:text-xl italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "Born out of a passion to challenge the status quo and push boundaries."
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — Tagline + Mission & Vision
        ══════════════════════════════════════════ */}
        <section className="w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
          <div className="w-full max-w-5xl mx-auto">

            {/* Tagline */}
            <p
              className="text-center text-lg md:text-2xl leading-relaxed mb-16 md:mb-20 text-[#5a0b00]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="font-black italic">THE NEXARION GROUP</span>
              <span className="font-normal"> is a catalyst for growth and innovation, 
                born out of a passion to challenge the status quo and push boundaries. 
                We believe that individuals and organisations have the power to defy the ordinary and achieve greatness.
                 Our journey is built on a foundation of expertise, creativity, and a relentless pursuit of excellence. 
                 We partner with individuals and organisations to navigate complexity, 
                unlock potential, and break through limits</span>
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* Mission */}
              <div className="bg-[#f9d300] rounded-3xl p-8 md:p-10">
                <p
                  className="text-[10px] font-bold tracking-[0.28em] uppercase mb-6 text-[#5a0b00]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Mission
                </p>
                <p
                  className="text-[#5a0b00] text-lg md:text-xl italic font-semibold leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Fostering a new wave of game-changers who shape a better future.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-[#f9d300] rounded-3xl p-8 md:p-10">
                <p
                  className="text-[10px] font-bold tracking-[0.28em] uppercase mb-6 text-[#5a0b00]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Our Vision
                </p>
                <p
                  className="text-[#5a0b00] text-lg md:text-xl italic font-semibold leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  To be Africa's leading partner for streamlined personal and professional development.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}