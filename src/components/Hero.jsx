import React, { useEffect, useRef, useState } from "react";

function Hero() {
  const canvasRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation shortly after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const generateDomePoints = () => {
      const points = [];
      const rows = 8;
      const cols = 16;
      const isMobile = canvas.width < 640;
      const isTablet = canvas.width >= 640 && canvas.width < 1024;

      const cx = isMobile ? canvas.width * 0.62
               : isTablet  ? canvas.width * 0.68
               : canvas.width * 0.60;

      const cy = isMobile ? canvas.height * 0.65
               : isTablet  ? canvas.height * 0.78
               : canvas.height * 0.72;

      const r = isMobile ? canvas.width * 0.35
              : isTablet  ? canvas.width * 0.30
              : Math.min(canvas.width, canvas.height) * 0.51;

      for (let i = 0; i <= rows; i++) {
        const phi = (Math.PI / 2) * (i / rows);
        for (let j = 0; j < cols; j++) {
          const theta = (2 * Math.PI * j) / cols;
          const x = cx + r * Math.cos(phi) * Math.cos(theta);
          const y = cy - r * Math.sin(phi);
          const z = Math.cos(phi) * Math.sin(theta);
          points.push({ x, y, z, row: i, col: j });
        }
      }
      points.push({ x: cx, y: cy - r, z: 1, row: -1, col: -1 });
      return points;
    };

    const movingDots = [
      { row: 7, speed: 0.012, offset: 0,    size: 4.5, glow: 14 },
      { row: 6, speed: 0.008, offset: 4,    size: 4.0, glow: 12 },
      { row: 5, speed: 0.015, offset: 8,    size: 3.5, glow: 10 },
      { row: 4, speed: 0.006, offset: 2,    size: 3.5, glow: 10 },
      { row: 3, speed: 0.010, offset: 12,   size: 3.0, glow: 9  },
      { row: 2, speed: 0.018, offset: 6,    size: 3.0, glow: 8  },
      { row: 1, speed: 0.007, offset: 10,   size: 2.5, glow: 7  },
      { row: 0, speed: 0.013, offset: 3,    size: 2.5, glow: 6  },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const points = generateDomePoints();
      const apex = points[points.length - 1];
      const rows = 8;
      const cols = 16;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const curr = points[i * cols + j];
          const nextCol = points[i * cols + ((j + 1) % cols)];
          const nextRow = i < rows - 1 ? points[(i + 1) * cols + j] : null;
          const diag = i < rows - 1 ? points[(i + 1) * cols + ((j + 1) % cols)] : null;

          const isYellow = (i + j) % 5 === 0;
          const alpha = 0.25 + curr.z * 0.35;

          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          ctx.lineTo(nextCol.x, nextCol.y);
          ctx.strokeStyle = isYellow
            ? `rgba(212,175,55,${alpha + 0.2})`
            : `rgba(180,180,180,${alpha})`;
          ctx.lineWidth = isYellow ? 1.2 : 0.6;
          ctx.stroke();

          if (nextRow) {
            ctx.beginPath();
            ctx.moveTo(curr.x, curr.y);
            ctx.lineTo(nextRow.x, nextRow.y);
            ctx.strokeStyle = isYellow
              ? `rgba(212,175,55,${alpha + 0.2})`
              : `rgba(180,180,180,${alpha})`;
            ctx.lineWidth = isYellow ? 1.2 : 0.6;
            ctx.stroke();
          }

          if (diag) {
            ctx.beginPath();
            ctx.moveTo(curr.x, curr.y);
            ctx.lineTo(diag.x, diag.y);
            ctx.strokeStyle = `rgba(140,140,140,${alpha * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (let j = 0; j < cols; j++) {
        const top = points[(rows - 1) * cols + j];
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(apex.x, apex.y);
        ctx.strokeStyle = `rgba(180,180,180,0.3)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j < cols; j++) {
          const p = i === rows ? apex : points[i * cols + j];
          if ((i + j) % 5 === 0) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
            glow.addColorStop(0, "rgba(212,175,55,0.9)");
            glow.addColorStop(1, "rgba(212,175,55,0)");
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#D4AF37";
            ctx.fill();
          }
        }
      }

      ctx.beginPath();
      ctx.arc(apex.x, apex.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      movingDots.forEach(({ row, speed, offset, size, glow }) => {
        const travel = (time * speed + offset) % cols;
        const colFloor = Math.floor(travel);
        const colNext = (colFloor + 1) % cols;
        const lerpT = travel - colFloor;

        const pA = points[row * cols + colFloor];
        const pB = points[row * cols + colNext];

        const travX = pA.x + (pB.x - pA.x) * lerpT;
        const travY = pA.y + (pB.y - pA.y) * lerpT;

        const movingGlow = ctx.createRadialGradient(travX, travY, 0, travX, travY, glow);
        movingGlow.addColorStop(0, "rgba(212,175,55,1)");
        movingGlow.addColorStop(0.4, "rgba(212,175,55,0.5)");
        movingGlow.addColorStop(1, "rgba(212,175,55,0)");
        ctx.beginPath();
        ctx.arc(travX, travY, glow, 0, Math.PI * 2);
        ctx.fillStyle = movingGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(travX, travY, size, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD700";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center">

    {/* ── MOBILE ONLY (below 768px): horizontal at top ── */}
<div className="absolute z-10 flex md:hidden flex-row items-center gap-3 top-20 left-1/2 -translate-x-1/2 whitespace-nowrap">
  <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
    PROFESSIONAL TRAINING
  </span>
  <div className="w-6 h-px bg-yellow-400" />
  <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
    MASTERCLASS
  </span>
</div>

{/* ── TABLET ONLY (768px - 1023px): vertical on left side ── */}
<div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex lg:hidden flex-col items-center gap-2 z-10 ml-6">
  <span
    className="text-white/40 text-xs tracking-[0.3em] uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
  >
    MASTERCLASS
  </span>
  <div className="w-px h-6 bg-yellow-400" />
  <span
    className="text-white/40 text-xs tracking-[0.3em] uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
  >
    PROFESSIONAL TRAINING
  </span>
</div>

{/* ── DESKTOP ONLY (1024px and above): vertical on left side ── */}
<div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-10 ml-24">
  <span
    className="text-white/40 text-xs tracking-[0.3em] uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
  >
    MASTERCLASS
  </span>
  <div className="w-px h-6 bg-yellow-400" />
  <span
    className="text-white/40 text-xs tracking-[0.3em] uppercase"
    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.25em" }}
  >
    PROFESSIONAL TRAINING
  </span>
</div>

      {/* Animated canvas - geodesic dome */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Top right label */}
      <div className="absolute top-20 right-1/3 z-10 pt-10 sm:pt-20 lg:pt-0">
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase leading-6">
          WE  BUID<br />INDIVIDUALS
        </p>
      </div>

      {/* Bottom right label */}
      <div className="relative z-10 px-4 max-w-full sm:px-8 sm:max-w-xl md:pl-14 md:pr-8 md:max-w-2xl lg:pl-20 lg:pr-8 lg:max-w-3xl">
  <h1
    className=" text-white font-black uppercase leading-none tracking-tight pl-0 mt-8 sm:pl-6 sm:mt-10 md:pl-14 md:mt-12 lg:pl-24 lg:mt-16"
    style={{
      fontSize: "clamp(2rem, 6vw, 7.5rem)",
      fontFamily: " 'inter', sans-serif",
      lineHeight: 0.92,
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0px)" : "translateY(60px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}
  >
    WE<br />
    EMPOWER<br />
    INDIVIDUALS AND<br />
    ORGANIZATIONS
  </h1>

  <p
    className=" text-white/80 leading-relaxed mt-4 text-sm ml-0 sm:mt-5 sm:text-base sm:ml-6 md:mt-6 md:text-lg md:ml-14 lg:mt-6 lg:text-lg lg:ml-24 lg:max-w-sm"
    style={{
      fontFamily: "'Barlow', Arial, sans-serif",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0px)" : "translateY(60px)",
      transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
    }}
  >
    Through Practical training, deliver structured <br />
    for real-world growth with clarity and direction.
  </p>
</div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}

export default Hero;