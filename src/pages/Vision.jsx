import { useEffect, useRef, useState } from "react";
import React from "react";
import elab from "../assets/elab.png";  
import launchs from "../assets/launchs.png";


function Vision() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Fade in on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white w-full px-5 pt-0 pb-8 -mt-10 md:mt-0 md:px-10 md:py-20 lg:px-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── OUR CONVICTION label ── */}
        <div
          className="inline-block px-3 py-1 mb-3 md:mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="bg-white text-black text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] uppercase px-3 py-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            OUR VISION
          </span>
        </div>

        {/* ── Big headline ── */}
        <h2
          className="font-black text-white leading-[1.0] mb-6 md:mb-14"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 1.5rem)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          To be Africa's leading partner for streamlined personal and professional development, 
          providing innovative solutions that empower 
          individuals and organisations to achieve corporate success and individual fulfilment. 
          We envision a future where Africa's potential is unleashed, 
          and its people thrive in a world of limitless possibilities.
        </h2>

        {/* ── Bottom: image left + text+image right ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >

          {/* Left: large community image */}
          <div className="w-full overflow-hidden">
            <img
              src={launchs}
              alt="Community gathering"
              className="w-full h-[280px] md:h-[340px] lg:h-[400px] object-cover"
            />
          </div>

          {/* Right: paragraph + second image stacked */}
          <div className="flex flex-col gap-6">

            {/* Paragraph text */}
            <p
              className="text-white text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
               Our mision is fostering a new wave of game-changers who are relentless in driving progress,
              shattering limits, and shaping a better future through cutting-edge
              development and unwavering dedication. We are committed to empowering 
             individuals and organisations to achieve their goals, drive innovation, 
             and create lasting impact.
            </p>

            {/* Second smaller image */}
            <div className="w-full overflow-hidden">
              <img
                src={elab}
                alt="community launch"
                className="w-full h-[220px] md:h-[240px] lg:h-[300px] object-cover"
              />
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}

export default Vision;