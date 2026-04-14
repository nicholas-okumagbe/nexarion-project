import { useState } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  Props
//    onLogin({ email, password })  — throws on invalid credentials
//    onGoSignup()                  — navigate to signup
// ─────────────────────────────────────────────────────────────
export default function LoginPage({ onLogin, onGoSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    try {
      onLogin(form);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ln-input-wrap { position: relative; margin-top: 8px; }

        .ln-input {
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
        .ln-input::placeholder { color: rgba(255,255,255,0.25); }
        .ln-input:focus {
          border-color: #f9d300;
          background: rgba(249,211,0,0.04);
        }
        .ln-input.has-icon { padding-right: 48px; }

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

        .ln-btn {
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
        .ln-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(249,211,0,0.3);
        }
        .ln-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .alt-btn {
          width: 100%;
          padding: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          transition: all 0.3s ease;
        }
        .alt-btn:hover {
          border-color: rgba(249,211,0,0.4);
          color: #f9d300;
          background: rgba(249,211,0,0.04);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .d1 { animation-delay: 0.05s; opacity: 0; }
        .d2 { animation-delay: 0.15s; opacity: 0; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-6px); }
          40%,80%  { transform: translateX(6px); }
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>

      <div
        className="min-h-screen w-full flex flex-col"
        style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* ── LEFT PANEL ── */}
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
            <div style={{
              position: "absolute", top: "-80px", left: "-80px",
              width: 320, height: 320, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(90,11,0,0.6) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "10%", right: "-60px",
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,211,0,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Logo */}
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1"
                style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}
              >
                Nexarion
              </span>
            </div>

            {/* Quote / headline */}
            <div>
              <div style={{ color: "#f9d300", fontSize: 48, lineHeight: 1, marginBottom: 24, opacity: 0.4 }}>"</div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: "#fdfdfd",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  fontStyle: "italic",
                  maxWidth: 340,
                }}
              >
                Every great achievement begins with a single, decisive step.
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 16, letterSpacing: "0.1em" }}>
                — Ayobami Omomeji, CEO
              </p>
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
                      style={{
                        width: 28, height: 28,
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700,
                        backgroundColor: i <= 1 ? "rgba(90,11,0,0.6)" : i === 2 ? "#f9d300" : "rgba(255,255,255,0.06)",
                        color: i <= 1 ? "#f9d300" : i === 2 ? "#0a0a0a" : "rgba(255,255,255,0.3)",
                        border: i === 2 ? "none" : i <= 1 ? "1px solid rgba(249,211,0,0.3)" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {i < 2 ? "✓" : i + 1}
                    </div>
                    <span style={{ color: i === 2 ? "#fdfdfd" : i < 2 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)", fontSize: 13 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL (form) ── */}
          <div
            className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 xl:px-20"
            style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}
          >
            {/* Mobile logo */}
            <span
              className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1 mb-8 lg:hidden"
              style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}
            >
              Nexarion
            </span>

            <div className="fade-up d1 mb-10">
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#fdfdfd",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 10,
                }}
              >
                Welcome back
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>
                Sign in to access your registered program and complete payment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={`flex flex-col gap-6 fade-up d2 ${error ? "shake" : ""}`}>

              {/* Email */}
              <div>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Email Address
                </label>
                <div className="ln-input-wrap">
                  <input
                    type="email"
                    required
                    placeholder="john@email.com"
                    className="ln-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-0">
                  <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Password
                  </label>
                </div>
                <div className="ln-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Your password"
                    className="ln-input has-icon"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    <EyeIcon open={showPass} />
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="px-4 py-3 rounded-lg text-sm flex items-center gap-3"
                  style={{ backgroundColor: "rgba(229,57,53,0.12)", border: "1px solid rgba(229,57,53,0.3)", color: "#ef9a9a" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="ln-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : null}
                {loading ? "Signing In…" : "Sign In & Go to Payment →"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4" style={{ margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>OR</span>
                <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Go to Signup */}
              <button type="button" className="alt-btn" onClick={onGoSignup}>
                Create a New Account
              </button>

              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textAlign: "center", lineHeight: 1.7 }}>
                Only registered and verified users can access the payment page.
              </p>
            </form>
          </div>
        </div>

        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />
      </div>
    </>
  );
}

function EyeIcon({ open }) {
  return (
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
}