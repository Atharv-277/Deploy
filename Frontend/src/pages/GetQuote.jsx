import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaBuilding, FaUser, FaEnvelope, FaPhone, FaIndustry, FaTv, FaRupeeSign, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

const industries = [
  "Retail & Shopping",
  "Corporate & IT",
  "Healthcare & Hospitals",
  "Education & Coaching",
  "Restaurants & Cafes",
  "Hotels & Hospitality",
  "Banking & Finance",
  "Manufacturing",
  "Transportation & Logistics",
  "Real Estate",
  "Entertainment & Events",
  "Government & Public Sector",
  "Other",
];

const budgetRanges = [
  "Under ₹50,000 / month",
  "₹50,000 – ₹1,00,000 / month",
  "₹1,00,000 – ₹3,00,000 / month",
  "₹3,00,000 – ₹5,00,000 / month",
  "₹5,00,000+ / month",
  "Not sure – need guidance",
];

const durations = [
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
  "Custom Duration",
];

const screenTypes = [
  "Indoor Digital Displays",
  "Outdoor LED Screens",
  "Interactive Kiosks",
  "Digital Menu Boards",
  "Video Walls",
  "All / Not Sure",
];

export default function GetQuote() {
  const { stateName } = useParams();
  const [searchParams] = useSearchParams();
  const decodedState = decodeURIComponent(stateName || "");
  const decodedCity = decodeURIComponent(searchParams.get("city") || "");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    designation: "",
    industry: "",
    screenType: "",
    budget: "",
    duration: "",
    locations: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, stateName: decodedState, cityName: decodedCity }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-sky-50 min-h-screen">
        <section className="py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto px-6 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-xl shadow-sky-300/30">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-lg text-slate-600 mb-3">
              Thank you, <span className="font-semibold text-slate-800">{form.contactPerson || "there"}</span>.
              We've received your advertising inquiry{decodedCity ? ` for ${decodedCity}` : decodedState ? ` for ${decodedState}` : ""}.
            </p>
            <p className="text-slate-500 mb-10">
              Our advertising team will review your requirements and get back to you within 24 hours with a custom media plan.
            </p>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 mb-10 text-left max-w-md mx-auto">
              <h3 className="font-bold text-slate-900 mb-4">Your Details</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-medium text-slate-800">Company:</span> {form.companyName}</p>
                <p><span className="font-medium text-slate-800">Contact:</span> {form.contactPerson}</p>
                <p><span className="font-medium text-slate-800">Email:</span> {form.email}</p>
                <p><span className="font-medium text-slate-800">Phone:</span> {form.phone}</p>
                {decodedCity && <p><span className="font-medium text-slate-800">City:</span> {decodedCity}</p>}
                {decodedState && <p><span className="font-medium text-slate-800">State:</span> {decodedState}</p>}
                {form.industry && <p><span className="font-medium text-slate-800">Industry:</span> {form.industry}</p>}
                {form.budget && <p><span className="font-medium text-slate-800">Budget:</span> {form.budget}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/start-advertising">
                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Back to Advertising
                </button>
              </Link>
              <Link to="/">
                <button className="px-8 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Go to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-sky-50 min-h-screen">

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-sky-200/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-blue-200/15 rounded-full blur-[140px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/start-advertising"
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium mb-6 transition-colors"
            >
              ← Back to Advertising Network
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Get a Quote
              {(decodedCity || decodedState) && (
                <span className="block mt-2 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  for {decodedCity || decodedState}
                </span>
              )}
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Fill in your business details below and our advertising team will prepare a custom media plan for you.
            </p>

            {(decodedCity || decodedState) && (
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-sm font-medium">
                <FaMapMarkerAlt className="text-sky-500" />
                {decodedCity
                  ? `Advertising City: ${decodedCity}, ${decodedState}`
                  : `Advertising Region: ${decodedState}`}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12"
          >

            {/* Company Information */}
            <div className="mb-10">
              <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white text-sm shadow-lg shadow-sky-400/20">
                  <FaBuilding />
                </span>
                Company Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Pvt Ltd"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Industry <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FaIndustry className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <select
                      name="industry"
                      required
                      value={form.industry}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">Select your industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="mb-10">
              <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white text-sm shadow-lg shadow-sky-400/20">
                  <FaUser />
                </span>
                Contact Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Person <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      value={form.contactPerson}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="e.g. Marketing Manager"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advertising Requirements */}
            <div className="mb-10">
              <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white text-sm shadow-lg shadow-sky-400/20">
                  <FaTv />
                </span>
                Advertising Requirements
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Screen Type
                  </label>
                  <div className="relative">
                    <FaTv className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <select
                      name="screenType"
                      value={form.screenType}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">Select screen type</option>
                      {screenTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Campaign Duration
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <select
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">Select duration</option>
                      {durations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Budget
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Preferred Locations
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      name="locations"
                      value={form.locations}
                      onChange={handleChange}
                      placeholder="e.g. Malls, Airports, IT Parks"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Details or Requirements
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your advertising goals, target audience, or any specific requirements..."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:bg-white transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                Fields marked with <span className="text-blue-500">*</span> are required
              </p>
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-sm text-rose-600">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold shadow-xl shadow-sky-500/25 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">{submitting ? "Submitting..." : "Submit Quote Request"}</span>
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
