import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrationpage() {
  const navigate = useNavigate();

  // Read data saved by Programs.jsx
  const saved = JSON.parse(sessionStorage.getItem("registrationData") || "{}");
  const registeredService = saved?.service ? saved : null;

  const [form, setForm] = useState({
    name: saved?.formData?.name || "",
    email: saved?.formData?.email || "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#e53935", "#fb8c00", "#43a047", "#00acc1"][strength];

  const EyeIcon = ({ open }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    navigate("/Loginpage");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .au-input-wrap { position: relative; margin-top: 8px; }

        .au-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          color: #fdfdfd;
          font-size: 15px;
          padding: 14px 16px;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .au-input::placeholder { color: rgba(255,255,255,0.25); }
        .au-input:focus {
          border-color: #f9d300;
          background: rgba(249,211,0,0.04);
        }
        .au-input.has-icon { padding-right: 48px; }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          padding: 4px;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #f9d300; }

        .strength-bar-track {
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
        }
        .strength-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .au-btn {
          width: 100%;
          padding: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          background: #f9d300;
          color: #0a0a0a;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .au-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(249,211,0,0.3);
        }
        .au-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .step-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          transition: all 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .d1 { animation-delay: 0.05s; opacity: 0; }
        .d2 { animation-delay: 0.15s; opacity: 0; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div
        className="min-h-screen w-full flex flex-col pt-6"
        style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* LEFT PANEL */}
          <div
            className="hidden lg:flex flex-col justify-between p-12 xl:p-16"
            style={{
              width: "42%",
              minHeight: "100vh",
              background: "linear-gradient(160deg, #1a0200 0%, #0a0a0a 60%)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-80px", left: "-80px", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,11,0,0.6) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", right: "-60px", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,211,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div>
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1" style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}>
                Nexarion
              </span>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)", color: "#fdfdfd", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
                One account. <br />
                <em style={{ color: "#f9d300" }}>All access.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.9, maxWidth: 320 }}>
                Create your Nexarion account to securely pay for your selected
                program and manage your registrations in one place.
              </p>

              {registeredService && (
                <div className="mt-8 p-5 rounded-lg" style={{ background: "rgba(249,211,0,0.06)", border: "1px solid rgba(249,211,0,0.2)" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
                    Registering For
                  </p>
                  <p style={{ color: "#fdfdfd", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                    {registeredService.service.name}
                  </p>
                  <p style={{ color: "#f9d300", fontWeight: 700, fontSize: 18 }}>
                    {registeredService.service.amount}
                  </p>
                </div>
              )}
            </div>

            {/* Step progress */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
                Your journey
              </p>
              <div className="flex flex-col gap-3">
                {["Register", "Create Account", "Login", "Pay"].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="step-dot"
                      style={{
                        backgroundColor: i === 1 ? "#f9d300" : i === 0 ? "rgba(90,11,0,0.6)" : "rgba(255,255,255,0.06)",
                        color: i === 1 ? "#0a0a0a" : i === 0 ? "#f9d300" : "rgba(255,255,255,0.3)",
                        border: i === 1 ? "none" : i === 0 ? "1px solid rgba(249,211,0,0.3)" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {i === 0 ? "✓" : i + 1}
                    </div>
                    <span style={{ color: i === 1 ? "#fdfdfd" : i === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)", fontSize: 13 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — form */}
          <div
            className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 xl:px-20"
            style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}
          >
            <div className="fade-up d1 mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1 mb-6 lg:hidden" style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}>
                Nexarion
              </span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fdfdfd", fontWeight: 700, lineHeight: 1.15, marginBottom: 10 }}>
                Create your account
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/Loginpage")}
                  style={{ color: "#f9d300", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  Sign in instead
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 fade-up d2">

              {/* Full Name */}
              <div>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Full Name</label>
                <div className="au-input-wrap">
                  <input
                    type="text"
                    required
                    placeholder="John Adeyemi"
                    className="au-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Email Address</label>
                <div className="au-input-wrap">
                  <input
                    type="email"
                    required
                    placeholder="john@email.com"
                    className="au-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Password</label>
                <div className="au-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Min. 6 characters"
                    className="au-input has-icon"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    <EyeIcon open={showPass} />
                  </button>
                </div>
                {form.password && (
                  <div>
                    <div className="strength-bar-track">
                      <div className="strength-bar-fill" style={{ width: `${(strength / 4) * 100}%`, backgroundColor: strengthColor }} />
                    </div>
                    <p style={{ color: strengthColor, fontSize: 11, marginTop: 5, fontWeight: 600 }}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Confirm Password</label>
                <div className="au-input-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="Re-enter password"
                    className="au-input has-icon"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                {form.confirm && form.password !== form.confirm && (
                  <p style={{ color: "#e53935", fontSize: 11, marginTop: 5 }}>Passwords do not match</p>
                )}
                {form.confirm && form.password === form.confirm && form.confirm.length > 0 && (
                  <p style={{ color: "#43a047", fontSize: 11, marginTop: 5 }}>✓ Passwords match</p>
                )}
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(229,57,53,0.12)", border: "1px solid rgba(229,57,53,0.3)", color: "#ef9a9a" }}>
                  {error}
                </div>
              )}

              <button type="submit" className="au-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : null}
                {loading ? "Creating Account…" : "Create Account & Proceed →"}
              </button>

              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textAlign: "center", lineHeight: 1.7 }}>
                By creating an account, you agree to our terms and consent to be contacted regarding your registration.
              </p>
            </form>
          </div>
        </div>

        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />
      </div>
    </>
  );
}