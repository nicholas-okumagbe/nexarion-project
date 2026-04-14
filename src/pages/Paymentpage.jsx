import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const BANK_DETAILS = {
  bankName: "First Bank Nigeria",
  accountName: "Nexarion Global Ltd",
  accountNumber: "3012345678",
};

// ── Convert ₦10,000 → 1000000 kobo (Paystack uses kobo) ──
const toKobo = (amountStr) => {
  if (!amountStr) return 0;
  const num = parseInt(amountStr.replace(/[₦$,\s]/g, ""));
  return isNaN(num) ? 0 : num * 100;
};

// ── Paystack Pay Button (separate component so hook rules are satisfied) ──
function PaystackButton({ config, onSuccess, onClose, service, loading }) {
  const initializePayment = usePaystackPayment(config);

  return (
    <button
      className="pay-btn"
      disabled={loading}
      onClick={() => initializePayment({ onSuccess, onClose })}
    >
      {loading ? <span className="spinner" /> : null}
      {loading ? "Processing…" : `Pay ${service?.amount} with Paystack →`}
    </button>
  );
}

export default function PaymentPage({ user, registeredService, onLogout }) {
  const [method, setMethod] = useState("paystack"); // "paystack" | "transfer"
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const service = registeredService?.service;
  const formData = registeredService?.formData;

  // ── Paystack config ──────────────────────────────────────────
  const paystackConfig = {
    reference: `nexarion_${new Date().getTime()}`,
    email: user?.email,
    amount: toKobo(service?.amount),
    publicKey: "pk_test_YOUR_PUBLIC_KEY_HERE", // 🔑 Replace with your key
    metadata: {
      custom_fields: [
        {
          display_name: "Program",
          variable_name: "program",
          value: service?.name,
        },
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: user?.name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: formData?.phone || "",
        },
      ],
    },
  };

  // ── Called by Paystack on successful payment ─────────────────
  const onPaystackSuccess = (reference) => {
    console.log("Payment reference:", reference);
    // ✅ Ideally send `reference.reference` to your backend to verify
    // For now we trust Paystack's callback and show success
    setPaid(true);
  };

  const onPaystackClose = () => {
    console.log("Payment dialog closed by user");
  };

  // ── Bank transfer confirm ────────────────────────────────────
  const handleTransferConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setPaid(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Success screen ───────────────────────────────────────────
  if (paid) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.7); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .pop { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .fu1 { animation: fadeUp 0.5s ease 0.3s forwards; opacity: 0; }
          .fu2 { animation: fadeUp 0.5s ease 0.45s forwards; opacity: 0; }
          .fu3 { animation: fadeUp 0.5s ease 0.6s forwards; opacity: 0; }
        `}</style>
        <div
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
        >
          <div style={{ height: 4, position: "fixed", top: 0, left: 0, right: 0, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />

          <div
            className="pop flex items-center justify-center rounded-full mb-8"
            style={{ width: 88, height: 88, backgroundColor: "#f9d300" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2
            className="fu1"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#fdfdfd",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {method === "transfer" ? "Transfer Submitted!" : "Payment Successful!"}
          </h2>

          <p className="fu2" style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.8, maxWidth: 420, marginBottom: 32 }}>
            Thank you, <span style={{ color: "#f9d300" }}>{user?.name}</span>.{" "}
            {method === "transfer"
              ? "Your transfer has been submitted. We'll verify and confirm your spot within 24 hours."
              : <>Your payment for <span style={{ color: "#f9d300" }}>{service?.name}</span> has been received. Check your email for confirmation.</>
            }
          </p>

          {/* Receipt */}
          <div
            className="fu3 w-full max-w-sm p-6 rounded-xl text-left mb-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(249,211,0,0.2)" }}
          >
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Receipt
            </p>
            {[
              { label: "Program", value: service?.name },
              { label: "Amount", value: service?.amount, gold: true },
              { label: "Email", value: user?.email },
              { label: "Status", value: method === "transfer" ? "Pending Verification" : "✓ Confirmed", gold: method !== "transfer" },
            ].map(({ label, value, gold }) => (
              <div key={label} className="flex justify-between items-center mb-3">
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{label}</span>
                <span style={{ color: gold ? "#f9d300" : "#fdfdfd", fontSize: gold ? 16 : 13, fontWeight: gold ? 700 : 500, textAlign: "right", maxWidth: "60%" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onLogout}
            style={{
              padding: "12px 32px",
              backgroundColor: "#5a0b00",
              color: "#f9d300",
              border: "none",
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </>
    );
  }

  // ── Main page ────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .method-tab {
          flex: 1; padding: 12px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 13px;
          color: rgba(255,255,255,0.5); transition: all 0.3s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .method-tab.active {
          background: rgba(249,211,0,0.1); border-color: #f9d300; color: #f9d300;
        }
        .method-tab:hover:not(.active) {
          border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.75);
        }

        .pay-btn {
          width: 100%; padding: 15px;
          font-family: 'DM Sans', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
          border: none; cursor: pointer; border-radius: 8px;
          background: #f9d300; color: #0a0a0a; transition: all 0.3s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pay-btn:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 8px 32px rgba(249,211,0,0.3);
        }
        .pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .copy-btn {
          padding: 6px 14px; background: rgba(249,211,0,0.12);
          border: 1px solid rgba(249,211,0,0.3); border-radius: 6px;
          color: #f9d300; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; white-space: nowrap;
        }
        .copy-btn:hover { background: rgba(249,211,0,0.2); }

        .bank-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); gap: 12px;
        }
        .bank-row:last-child { border-bottom: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .d1 { animation-delay: 0.05s; opacity: 0; }
        .d2 { animation-delay: 0.15s; opacity: 0; }
        .d3 { animation-delay: 0.25s; opacity: 0; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3); border-top-color: #0a0a0a;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }

        .paystack-badge {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 12px;
          color: rgba(255,255,255,0.2); font-size: 11px;
        }
      `}</style>

      <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />

        {/* Nav */}
        <div className="flex items-center justify-between px-6 md:px-10 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1" style={{ backgroundColor: "#5a0b00", color: "#f9d300", borderRadius: 3 }}>
            Nexarion
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full text-sm font-bold" style={{ width: 34, height: 34, backgroundColor: "#5a0b00", color: "#f9d300" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <p style={{ color: "#fdfdfd", fontSize: 13, fontWeight: 600 }}>{user?.name}</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{user?.email}</p>
            </div>
            <button
              onClick={onLogout}
              style={{ marginLeft: 8, padding: "6px 14px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">

          {/* Header */}
          <div className="mb-10 fade-up d1">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1 mb-5" style={{ backgroundColor: "rgba(90,11,0,0.5)", color: "#f9d300", borderRadius: 3, border: "1px solid rgba(249,211,0,0.2)" }}>
              🔒 Secure Payment
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fdfdfd", fontWeight: 700, lineHeight: 1.1 }}>
              Complete Your <br />
              <em style={{ color: "#f9d300" }}>Registration</em>
            </h1>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7 }}>
              You're one step away. Choose how you'd like to pay below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* LEFT: Payment */}
            <div className="lg:col-span-3 fade-up d2">

              {/* Method tabs */}
              <div className="flex gap-3 mb-8">
                <button className={`method-tab ${method === "paystack" ? "active" : ""}`} onClick={() => setMethod("paystack")}>
                  {/* Paystack icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 8h20v2H2zm0 4h14v2H2zm0 4h8v2H2z" opacity=".4"/>
                    <rect x="2" y="4" width="20" height="2" rx="1"/>
                  </svg>
                  Pay with Paystack
                </button>
                <button className={`method-tab ${method === "transfer" ? "active" : ""}`} onClick={() => setMethod("transfer")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                  Bank Transfer
                </button>
              </div>

              {/* ── Paystack ── */}
              {method === "paystack" && (
                <div>
                  {/* What Paystack supports */}
                  <div
                    className="p-5 rounded-xl mb-6"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
                      Accepted Payment Methods
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: "💳", label: "Debit / Credit Card", sub: "Visa, Mastercard, Verve" },
                        { icon: "🏦", label: "Bank Transfer", sub: "Instant bank payment" },
                        { icon: "📱", label: "USSD", sub: "*737#, *919# & more" },
                        { icon: "👛", label: "Bank Account", sub: "Direct debit" },
                      ].map(({ icon, label, sub }) => (
                        <div
                          key={label}
                          className="p-3 rounded-lg flex items-start gap-3"
                          style={{ background: "rgba(249,211,0,0.04)", border: "1px solid rgba(249,211,0,0.1)" }}
                        >
                          <span style={{ fontSize: 20 }}>{icon}</span>
                          <div>
                            <p style={{ color: "#fdfdfd", fontSize: 12, fontWeight: 600 }}>{label}</p>
                            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amount preview */}
                  <div
                    className="flex items-center justify-between p-4 rounded-lg mb-6"
                    style={{ background: "rgba(90,11,0,0.3)", border: "1px solid rgba(249,211,0,0.2)" }}
                  >
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
                        You're paying
                      </p>
                      <p style={{ color: "#fdfdfd", fontSize: 13 }}>{service?.name}</p>
                    </div>
                    <p style={{ color: "#f9d300", fontSize: 24, fontWeight: 700 }}>{service?.amount}</p>
                  </div>

                  {/* Paystack button */}
                  <PaystackButton
                    config={paystackConfig}
                    onSuccess={onPaystackSuccess}
                    onClose={onPaystackClose}
                    service={service}
                    loading={loading}
                  />

                  {/* Powered by Paystack badge */}
                  <div className="paystack-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Secured &amp; powered by <strong style={{ color: "rgba(255,255,255,0.35)" }}>Paystack</strong>
                  </div>
                </div>
              )}

              {/* ── Bank Transfer ── */}
              {method === "transfer" && (
                <div>
                  <div className="p-6 rounded-xl mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
                      Bank Details
                    </p>
                    {[
                      { label: "Bank Name", value: BANK_DETAILS.bankName },
                      { label: "Account Name", value: BANK_DETAILS.accountName },
                      { label: "Account Number", value: BANK_DETAILS.accountNumber, copy: true },
                      { label: "Amount", value: service?.amount, highlight: true },
                    ].map(({ label, value, copy, highlight }) => (
                      <div className="bank-row" key={label}>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 2 }}>{label}</p>
                          <p style={{ color: highlight ? "#f9d300" : "#fdfdfd", fontSize: highlight ? 20 : 14, fontWeight: highlight ? 700 : 500 }}>
                            {value}
                          </p>
                        </div>
                        {copy && (
                          <button className="copy-btn" onClick={() => copyToClipboard(value)}>
                            {copied ? "✓ Copied" : "Copy"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-lg mb-6 flex gap-3" style={{ background: "rgba(249,211,0,0.06)", border: "1px solid rgba(249,211,0,0.15)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f9d300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7 }}>
                      Transfer the exact amount, then click <strong style={{ color: "#fdfdfd" }}>"I've Made the Transfer"</strong>. Our team will verify and confirm your spot within 24 hours.
                    </p>
                  </div>

                  <button className="pay-btn" onClick={handleTransferConfirm} disabled={loading}>
                    {loading ? <span className="spinner" /> : null}
                    {loading ? "Confirming…" : "I've Made the Transfer ✓"}
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: Order summary — unchanged from your original */}
            <div className="lg:col-span-2 fade-up d3">
              <div className="rounded-xl p-6 sticky top-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                  Order Summary
                </p>
                <div className="p-4 rounded-lg mb-5" style={{ background: "rgba(90,11,0,0.3)", border: "1px solid rgba(249,211,0,0.15)" }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Program</p>
                  <p style={{ color: "#fdfdfd", fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>{service?.name || "—"}</p>
                  <p style={{ color: "#f9d300", fontSize: 22, fontWeight: 700 }}>{service?.amount}</p>
                </div>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { label: "Name", value: formData?.name || user?.name },
                    { label: "Email", value: formData?.email || user?.email },
                    { label: "Phone", value: formData?.phone || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-2">
                      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{label}</span>
                      <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, textAlign: "right", maxWidth: "65%" }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Progress</p>
                  {["Register", "Create Account", "Login", "Pay"].map((label, i) => (
                    <div key={i} className="flex items-center gap-3 mb-2">
                      <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, backgroundColor: i < 3 ? "#5a0b00" : "#f9d300", color: i < 3 ? "#f9d300" : "#0a0a0a", flexShrink: 0 }}>
                        {i < 3 ? "✓" : "4"}
                      </div>
                      <span style={{ color: i === 3 ? "#fdfdfd" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: i === 3 ? 600 : 400 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{ height: 4, background: "linear-gradient(90deg, #5a0b00, #f9d300, #5a0b00)" }} />
      </div>
    </>
  );
}