import React, { useState, useEffect } from "react";
import logo from "../assets/nexarion.png";
import { Link } from "react-router-dom";  

const NavLinks = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About Us", link: "/about" },
  { id: 3, title: "Our Programs", link: "/programs" },
  { id: 4, title: "Our Services", link: "/service" },
  { id: 5, title: "Contact Us", link: "/about" },
  { id: 6, title: "Our Story", link: "/ourstory" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-white shadow-sm"
            : "bg-black"
          }`}
      >
        {/* ✅ Responsive padding: smaller on mobile, larger on desktop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300
                ${scrolled ? "bg-black" : "bg-white"}`}
            >
              <img src={logo} alt="Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            </div>
            {/* ✅ Responsive font size: smaller on mobile */}
            <span
              className={`font-bold tracking-wide transition-colors duration-300 text-xl sm:text-2xl lg:text-3xl
                ${scrolled ? "text-black" : "text-white"}`}
            >
              THE NEXARION
              <span
                className={`font-light italic ml-1 sm:ml-2 transition-colors duration-300 text-xl sm:text-2xl lg:text-3xl
                  ${scrolled ? "text-black" : "text-white"}`}
              >
                GROUP
              </span>
            </span>
          </div>

          {/* HAMBURGER BUTTON — all devices */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-all duration-200
              ${scrolled
                ? "bg-gray-100 border border-gray-200 hover:bg-gray-200"
                : "bg-white/10 border border-white/20 hover:bg-white/20"
              }`}
          >
            <span
              className={`block h-px rounded-full transition-all duration-300 origin-center
                ${scrolled ? "bg-black" : "bg-white"}
                ${menuOpen ? "w-4 translate-y-[6px] rotate-45" : "w-3"}`}
            />
            <span
              className={`block h-px rounded-full transition-all duration-300
                ${scrolled ? "bg-black" : "bg-white"}
                ${menuOpen ? "opacity-0 w-4" : "w-4"}`}
            />
            {!menuOpen && (
              <span
                className={`block h-px rounded-full transition-all duration-300
                  ${scrolled ? "bg-black" : "bg-white"} w-2`}
              />
            )}
            {menuOpen && (
              <span
                className={`block w-4 h-px rounded-full transition-all duration-300 origin-center
                  ${scrolled ? "bg-black" : "bg-white"} -translate-y-[6px] -rotate-45`}
              />
            )}
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 top-14 sm:top-16 z-40 flex flex-col px-4 sm:px-8 py-6 sm:py-10 transition-transform duration-300 ease-in-out overflow-y-auto bg-black
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ✅ Single column on mobile, two columns on tablet and up */}
        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-16 w-full mt-2 sm:mt-4">
          {NavLinks.map((item) => {
            const isActive = activeId === item.id;
            const isFirst = item.id === 1;
            return (
              <li key={item.id} className="">
                <Link
                  to={item.link}
                  onClick={() => {
                    setActiveId(item.id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-4 sm:py-6 group no-underline"

                 > 

                  <div className="flex items-baseline gap-2">
                    {/* Number badge */}
                    <span className={`text-xs font-medium tracking-widest ${isActive ? "text-yellow-400" : "text-white/40"}`}>
                      ({String(item.id).padStart(2, "0")})
                    </span>
                    {/* ✅ Responsive title size: smaller on mobile, larger on desktop */}
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-200
                        ${isActive ? "text-yellow-400" : "text-white group-hover:text-yellow-400"}`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Arrow */}
                  <span
                    className={`text-xl sm:text-2xl transition-colors duration-200
                      ${isActive ? "text-yellow-400" : "text-white group-hover:text-yellow-400"}`}
                  >
                    {isFirst && isActive ? "↗" : "→"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;