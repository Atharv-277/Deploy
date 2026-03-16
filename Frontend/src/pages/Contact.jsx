import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  email: "",
  productOfInterest: "",
  projectRequirements: "",
  portfolioUrl: "",
  coverLetter: "",
};

export default function Contact() {
  const [activeTab, setActiveTab] = useState("business");
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setSubmitError("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = form.fullName.trim();
    const trimmedPhone = form.phone.trim();

    if (!trimmedName) {
      setSubmitError("Full Name is mandatory.");
      return;
    }

    if (!trimmedPhone) {
      setSubmitError("Contact Number is mandatory.");
      return;
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(trimmedPhone)) {
      setSubmitError("Please enter a valid Contact Number.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const type = activeTab === "product" ? "consultation" : activeTab;
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          ...form,
          fullName: trimmedName,
          phone: trimmedPhone,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Submission failed. Please try again.");
      }
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamic content based on the selected tab
  const tabData = {
    business: {
      heading: "Let's talk business.",
      subheading: "Ready to upgrade your space? Drop your details below and our sales team will reach out within 24 hours.",
      buttonText: "Submit Business Enquiry",
    },
    product: {
      heading: "Need technical advice?",
      subheading: "Not sure which display fits your needs? Our engineers are here to consult and guide you.",
      buttonText: "Request Consultation",
    },
    recruitment: {
      heading: "Join our team.",
      subheading: "We are always looking for bright minds. Send us your details and let's build the future of digital displays together.",
      buttonText: "Submit Application",
    },
  };

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 min-h-screen font-sans text-slate-900 selection:bg-sky-200 selection:text-sky-900 pb-24">
      
      {/* ================= AMBIENT GLOWS ================= */}
      <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-sky-300/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 pt-24 px-6 max-w-4xl mx-auto text-center">
        
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 backdrop-blur border border-sky-300 text-sky-700 text-xs tracking-wide uppercase shadow-md mb-6">
          Contact Us
        </span>

        <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium leading-tight tracking-tight text-slate-900 mb-6">
          Let's Start a{" "}
          <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 bg-clip-text text-transparent pb-2">
            Conversation
          </span>
        </h1>

        <p className="text-slate-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Whether you're looking to transform your space with digital signage or join our growing team, you're in the right place.
        </p>

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white/60 backdrop-blur-md border border-slate-300 p-1.5 rounded-full inline-flex gap-1 md:gap-2 shadow-sm overflow-x-auto max-w-full hide-scrollbar">
            {[
              { id: "business", label: "Business Enquiry" },
              { id: "product", label: "Consultation" },
              { id: "recruitment", label: "Careers" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap transform
                  ${
                    activeTab === id
                      ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg scale-105"
                      : "text-slate-700 hover:text-sky-600 hover:bg-white/50"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTENT & FORM ================= */}
      <section className="relative z-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* LEFT: Contact Info (Takes up 2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-8 bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl border border-slate-300 p-8 md:p-10 rounded-3xl shadow-xl">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">
                Expert Signage Solutions.
              </h2>
              <p className="text-slate-700 leading-relaxed">
                A2K Screens is India's leading provider of premium digital display solutions. From interactive kiosks to massive outdoor LED walls, we bring your vision to life.
              </p>
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-6">
              {/* Info Item 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Office</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">33/6/2, Lane 9 , Chandrabhaga Nagar, Dhankawadi, Pune, Maharashtra 411046</p>
                </div>
              </div>

              {/* Info Item 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Phone Support</h4>
                  <p className="text-slate-600 text-sm mt-1">+91 8668223495</p>
                  <p className="text-slate-500 text-xs mt-0.5">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              {/* Info Item 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Email Us</h4>
                  <p className="text-slate-600 text-sm mt-1">contact@a2kscreens.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Form (Takes up 3 cols on large screens) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl border border-slate-300 p-8 md:p-12 rounded-3xl shadow-xl">
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                {tabData[activeTab].heading}
              </h3>
              <p className="text-slate-600">
                {tabData[activeTab].subheading}
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                ✓ Your submission was received! We'll get back to you within 24 hours.
                <button type="button" onClick={() => setSubmitted(false)} className="ml-3 underline text-emerald-600 hover:text-emerald-800">Submit another</button>
              </div>
            )}
            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                {submitError}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Standard Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">
                    Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="^\\+?[0-9\\s-]{10,15}$"
                    title="Enter a valid contact number (10 to 15 digits, spaces or hyphens allowed)."
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm"
                />
              </div>

              {/* Dynamic Fields */}
              {activeTab !== "recruitment" && (
                <div className="space-y-2 transition-all duration-300">
                  <label className="text-sm font-medium text-slate-700 ml-1">Product of Interest</label>
                  <select
                    name="productOfInterest"
                    value={form.productOfInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm appearance-none cursor-pointer text-slate-700"
                  >
                    <option value="">Select an option...</option>
                    <option>Digital Kiosk</option>
                    <option>Standee Display</option>
                    <option>Video Wall</option>
                    <option>Interactive Screen</option>
                    <option>Outdoor Display</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              {activeTab === "recruitment" && (
                <div className="space-y-2 transition-all duration-300">
                  <label className="text-sm font-medium text-slate-700 ml-1">Portfolio / LinkedIn URL</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={form.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">
                  {activeTab === "recruitment" ? "Cover Letter / Notes" : "Project Requirements"}
                </label>
                <textarea
                  name={activeTab === "recruitment" ? "coverLetter" : "projectRequirements"}
                  value={activeTab === "recruitment" ? form.coverLetter : form.projectRequirements}
                  onChange={handleChange}
                  rows="4"
                  placeholder={activeTab === "recruitment" ? "Tell us why you'd be a great fit..." : "Tell us about your space and what you want to achieve..."}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all shadow-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.99] text-white py-4 rounded-xl font-medium text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all transform flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitting ? "Submitting..." : tabData[activeTab].buttonText}
                {!submitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
}