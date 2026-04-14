import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vision from "./pages/Vision";
import Value from "./pages/Value";
import Service from "./pages/Service";
import OurStory from "./pages/OurStory";
import OurTeam from "./pages/OurTeam";
import Footer from "./pages/Footer";
import Programs from "./pages/Programs";
import AboutUs from "./pages/AboutUs";
import Loginpage from "./pages/Loginpage";
import Registrationpage from "./pages/Registrationpage";
import Paymentpage from "./pages/Paymentpage";

// ── Home ──
function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Value />
      <Service />
      <OurStory />
      <OurTeam />
    </>
  );
}

// ── App ──
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/programs"        element={<Programs />} />
        <Route path="/about"           element={<AboutUs />} />
        <Route path="/service"         element={<Service />} />
        <Route path="/ourstory"        element={<OurStory />} />
        <Route path="/Registrationpage" element={<Registrationpage />} />
        <Route path="/Loginpage"       element={<Loginpage />} />
        <Route path="/Paymentpage"     element={<Paymentpage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;