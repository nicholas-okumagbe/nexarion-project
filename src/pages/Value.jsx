import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    category: "GROWTH & GUMPTION",
    title: "We believe in continuous learning, growth, and self-improvement.",
    defaultVisible: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    category: "	ENGAGEMENT & INNOVATION",
    title: "We drive creativity, innovation, and out-of-the-box thinking",
    defaultVisible: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    category: "	IMPECCABILITY & SYSTEM",
    title: "We uphold the highest standards of integrity, ethics, and professionalism.",
    defaultVisible: false,
  },
];

function PillarCard({ pillar }) {
  const [hovered, setHovered] = useState(false);
  const showText = pillar.defaultVisible || hovered;

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ height: "clamp(280px, 40vw, 480px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image — natural, no overlay */}
      <img
        src={pillar.image}
        alt={pillar.category}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />

      {/* Text content — bottom left */}
      <div
        className="absolute bottom-0 left-0 p-5 md:p-7 lg:p-8"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <p
          className="text-white text-base md:text-lg font-normal mb-2 md:mb-3"
          style={{ fontFamily: "'Barlow', Arial, sans-serif" }}
        >
          {pillar.category}
        </p>
        <h3
          className="text-white font-black uppercase leading-tight"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
            fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
            fontWeight: 900,
            lineHeight: 1.05,
          }}
        >
          {pillar.title}
        </h3>
      </div>
    </div>
  );
}

export default function CorePillars() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full px-5 pt-10 pb-0 md:px-10 md:pt-16 lg:px-16 lg:pt-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── OUR CORE OPERATIONAL PILLARS label ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="inline-block bg-black text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-3 py-1 mb-8 md:mb-10"
            style={{ fontFamily: "'Barlow Condensed', Arial, sans-serif" }}
          >
            OUR CORE VALUES
          </span>
        </div>

        {/* ── 3 Column image grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}