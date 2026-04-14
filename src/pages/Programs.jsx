import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    id: "immersion",
    name: "THE IMMERSION MASTERCLASS",
    amount: "₦10,000",
    description:
      "An intensive hands-on learning experience designed to fast-track your growth.",
  },
  {
    id: "roadmap",
    name: "ROADMAP",
    amount: "₦5,000",
    description:
      "A structured plan to guide you from where you are to where you want to be.",
  },
  {
    id: "fow",
    name: "THE FUTURE OF WORK CONFERENCE",
    amount: "₦10,000",
    description:
      "Join industry leaders in a forward-thinking conversation on the evolving world of work.",
  },
  {
    id: "clarity",
    name: "CLARITY SESSION WITH AYOBAMI OMOMEJI / CEO",
    amount: "$10",
    description:
      "A one-on-one session with the CEO for focused, personalized clarity and direction.",
  },
  {
    id: "cv",
    name: "CV / LINKEDIN OPTIMIZATION",
    amount: "₦10,000",
    description:
      "Professional review and upgrade of your CV and LinkedIn for maximum visibility.",
  },
];

export default function Programs() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!selected) newErrors.service = "Please select a service to continue.";
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // All valid — save to sessionStorage so Registrationpage can read it
    const service = SERVICES.find((s) => s.id === selected);
    sessionStorage.setItem(
      "registrationData",
      JSON.stringify({ service, formData: form })
    );

    setErrors({});
    navigate("/Registrationpage");
  };

  const selectedService = SERVICES.find((s) => s.id === selected);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .reg-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          color: #fdfdfd;
          font-size: 15px;
          padding: 12px 0;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.3s ease;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.3); }
        .reg-input.active { border-bottom-color: #f9d300; }
        .reg-input.error { border-bottom-color: #ff4d4d; }

        .service-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 18px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.03);
        }
        .service-card:hover {
          border-color: rgba(249,211,0,0.4);
          background: rgba(249,211,0,0.04);
        }
        .service-card.selected {
          border-color: #f9d300;
          background: rgba(249,211,0,0.07);
        }
        .service-card.service-error {
          border-color: #ff4d4d;
        }

        .error-msg {
          color: #ff4d4d;
          font-size: 11px;
          margin-top: 6px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: block;
          text-align: center;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(249,211,0,0.25);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.35s; opacity: 0; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>

      <div
        className="min-h-screen w-full"
        style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />

        <div className="w-full max-w-6xl mx-auto px-5 md:px-10 lg:px-16 py-12 md:py-16">

          <div className="mb-12 pt-6 md:mb-16 fade-up fade-up-1">
            <span
              className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1 mb-6"
              style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}
            >
              Registration
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "#fdfdfd",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Register for a <br />
              <em style={{ color: "#f9d300" }}>Nexarion</em> Program
            </h1>
            <p className="mt-4" style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.8, maxWidth: 420 }}>
              Select a service below, fill in your details, and secure your spot.
              You'll create an account to proceed to payment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* LEFT: Service selection */}
            <div className="fade-up fade-up-2">
              <p className="mb-5 font-bold tracking-[0.15em] uppercase text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                01 — Select a Service
              </p>

              <div className="flex flex-col gap-3">
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className={`service-card ${selected === service.id ? "selected" : ""} ${errors.service && !selected ? "service-error" : ""}`}
                    onClick={() => {
                      setSelected(service.id);
                      setErrors((prev) => ({ ...prev, service: "" }));
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className="mt-1 flex-shrink-0 rounded-full"
                          style={{
                            width: 18, height: 18,
                            border: `2px solid ${selected === service.id ? "#f9d300" : "rgba(255,255,255,0.25)"}`,
                            backgroundColor: selected === service.id ? "#f9d300" : "transparent",
                            transition: "all 0.3s ease",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          {selected === service.id && (
                            <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#0a0a0a" }} />
                          )}
                        </div>

                        <div>
                          <p
                            className="font-bold text-sm leading-tight mb-1"
                            style={{
                              color: selected === service.id ? "#f9d300" : "#fdfdfd",
                              fontFamily: "'DM Sans', sans-serif",
                              letterSpacing: "0.04em",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {service.name}
                          </p>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6 }}>
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className="flex-shrink-0 font-bold text-sm px-3 py-1 rounded"
                        style={{
                          backgroundColor: selected === service.id ? "#f9d300" : "#5a0b00",
                          color: selected === service.id ? "#0a0a0a" : "#f9d300",
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "all 0.3s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {service.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {errors.service && (
                <p className="error-msg mt-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {errors.service}
                </p>
              )}
            </div>

            {/* RIGHT: Form */}
            <div className="fade-up fade-up-3">
              <p className="mb-8 font-bold tracking-[0.15em] uppercase text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                02 — Your Details
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                <div>
                  <label style={{ color: errors.name ? "#ff4d4d" : "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Adeyemi"
                    className={`reg-input ${focused === "name" ? "active" : ""} ${errors.name ? "error" : ""}`}
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: "" })); }}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                  />
                  {errors.name && (
                    <p className="error-msg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ color: errors.email ? "#ff4d4d" : "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@email.com"
                    className={`reg-input ${focused === "email" ? "active" : ""} ${errors.email ? "error" : ""}`}
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: "" })); }}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                  />
                  {errors.email && (
                    <p className="error-msg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ color: errors.phone ? "#ff4d4d" : "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    className={`reg-input ${focused === "phone" ? "active" : ""} ${errors.phone ? "error" : ""}`}
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors((prev) => ({ ...prev, phone: "" })); }}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused("")}
                  />
                  {errors.phone && (
                    <p className="error-msg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {selected && (
                  <div
                    className="p-4 rounded"
                    style={{ backgroundColor: "rgba(90,11,0,0.3)", border: "1px solid rgba(249,211,0,0.2)" }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                      Selected
                    </p>
                    <div className="flex items-center justify-between">
                      <p style={{ color: "#fdfdfd", fontSize: 13, fontWeight: 600 }}>{selectedService?.name}</p>
                      <span style={{ color: "#f9d300", fontWeight: 700, fontSize: 15 }}>{selectedService?.amount}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  style={{ backgroundColor: "#f9d300", color: "#0a0a0a" }}
                >
                  Continue to Create Account →
                </button>

                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, textAlign: "center", lineHeight: 1.7 }}>
                  You'll create a secure account in the next step before payment.
                </p>
              </form>
            </div>
          </div>
        </div>

        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />
      </div>
    </>
  );
}