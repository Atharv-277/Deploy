import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaTv, FaChartLine, FaClock, FaBullhorn, FaUsers, FaChevronDown, FaTimes, FaBuilding, FaStore, FaHospital, FaGraduationCap, FaUtensils, FaSubway } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

import retail from "../assets/hero/retail.jpg";
import bank1 from "../assets/hero/bank1.jpg";
import r1 from "../assets/hero/r1.jpg";
import h2 from "../assets/hero/h2.jpg";
import e3 from "../assets/hero/e3.jpg";
import man from "../assets/hero/man.jpg";

const screenImages = [retail, bank1, r1, h2, e3, man];

const fallbackStates = [
  {
    name: "Maharashtra",
    screens: 320,
    areas: [
      { city: "Mumbai", screens: 120, locations: ["Malls", "Airports", "Metro Stations", "Corporate Parks"] },
      { city: "Pune", screens: 75, locations: ["IT Parks", "Retail Stores", "Hospitals"] },
      { city: "Nagpur", screens: 45, locations: ["Shopping Centres", "Offices", "Restaurants"] },
      { city: "Nashik", screens: 40, locations: ["Retail Zones", "Healthcare", "Education"] },
      { city: "Aurangabad", screens: 25, locations: ["Commercial Hubs", "Hotels"] },
      { city: "Thane", screens: 15, locations: ["Malls", "Corporate Offices"] },
    ],
  },
  {
    name: "Delhi NCR",
    screens: 280,
    areas: [
      { city: "New Delhi", screens: 100, locations: ["Connaught Place", "Airports", "Metro Stations"] },
      { city: "Gurugram", screens: 80, locations: ["Cyber Hub", "IT Corridors", "Malls"] },
      { city: "Noida", screens: 55, locations: ["Sector Malls", "Corporate Towers", "Hospitals"] },
      { city: "Faridabad", screens: 25, locations: ["Retail Zones", "Transport Hubs"] },
      { city: "Ghaziabad", screens: 20, locations: ["Shopping Centres", "Education Hubs"] },
    ],
  },
  {
    name: "Karnataka",
    screens: 210,
    areas: [
      { city: "Bengaluru", screens: 130, locations: ["Tech Parks", "Malls", "Airports", "Metro"] },
      { city: "Mysuru", screens: 35, locations: ["Heritage Zones", "Retail", "Hospitals"] },
      { city: "Mangaluru", screens: 25, locations: ["Commercial Areas", "Education"] },
      { city: "Hubli-Dharwad", screens: 20, locations: ["Markets", "Offices"] },
    ],
  },
  {
    name: "Tamil Nadu",
    screens: 190,
    areas: [
      { city: "Chennai", screens: 90, locations: ["IT Corridor", "Malls", "Airports", "Hospitals"] },
      { city: "Coimbatore", screens: 40, locations: ["Retail Hubs", "Textile Parks", "Hotels"] },
      { city: "Madurai", screens: 30, locations: ["Shopping Centres", "Temples Area", "Education"] },
      { city: "Tiruchirappalli", screens: 30, locations: ["Commercial Zones", "Transport Hubs"] },
    ],
  },
  {
    name: "Gujarat",
    screens: 175,
    areas: [
      { city: "Ahmedabad", screens: 70, locations: ["SG Highway", "Malls", "Corporate Parks"] },
      { city: "Surat", screens: 45, locations: ["Diamond Markets", "Retail Zones", "Hospitals"] },
      { city: "Vadodara", screens: 30, locations: ["Alkapuri", "Malls", "Education Hubs"] },
      { city: "Rajkot", screens: 30, locations: ["Commercial Areas", "Restaurants"] },
    ],
  },
  {
    name: "Telangana",
    screens: 160,
    areas: [
      { city: "Hyderabad", screens: 110, locations: ["HITEC City", "Airports", "Malls", "Metro"] },
      { city: "Secunderabad", screens: 30, locations: ["Retail Areas", "Offices", "Hospitals"] },
      { city: "Warangal", screens: 20, locations: ["Commercial Hubs", "Education"] },
    ],
  },
  {
    name: "Rajasthan",
    screens: 140,
    areas: [
      { city: "Jaipur", screens: 60, locations: ["Malls", "Hotels", "Tourist Zones", "Airports"] },
      { city: "Jodhpur", screens: 30, locations: ["Markets", "Hospitality", "Retail"] },
      { city: "Udaipur", screens: 25, locations: ["Hotels", "Tourist Areas", "Restaurants"] },
      { city: "Kota", screens: 25, locations: ["Coaching Hubs", "Education", "Commercial"] },
    ],
  },
  {
    name: "Uttar Pradesh",
    screens: 130,
    areas: [
      { city: "Lucknow", screens: 45, locations: ["Gomti Nagar", "Malls", "Corporate Offices"] },
      { city: "Varanasi", screens: 30, locations: ["Ghats Area", "Hotels", "Tourist Zones"] },
      { city: "Agra", screens: 25, locations: ["Hotels", "Tourist Hubs", "Retail"] },
      { city: "Kanpur", screens: 30, locations: ["Commercial Areas", "Hospitals", "Education"] },
    ],
  },
  {
    name: "West Bengal",
    screens: 120,
    areas: [
      { city: "Kolkata", screens: 80, locations: ["Park Street", "Malls", "Metro Stations", "Airports"] },
      { city: "Siliguri", screens: 20, locations: ["Retail Zones", "Hotels"] },
      { city: "Durgapur", screens: 20, locations: ["Commercial Areas", "Education Hubs"] },
    ],
  },
  {
    name: "Kerala",
    screens: 105,
    areas: [
      { city: "Kochi", screens: 45, locations: ["Malls", "IT Parks", "Airports", "Healthcare"] },
      { city: "Thiruvananthapuram", screens: 30, locations: ["Technopark", "Retail", "Government"] },
      { city: "Kozhikode", screens: 30, locations: ["Commercial Hubs", "Hospitals", "Education"] },
    ],
  },
  {
    name: "Punjab",
    screens: 95,
    areas: [
      { city: "Chandigarh", screens: 35, locations: ["Sector Markets", "Malls", "IT Parks"] },
      { city: "Ludhiana", screens: 25, locations: ["Industrial Areas", "Retail", "Hospitals"] },
      { city: "Amritsar", screens: 20, locations: ["Hotels", "Tourist Zones", "Markets"] },
      { city: "Jalandhar", screens: 15, locations: ["Commercial Areas", "Education"] },
    ],
  },
  {
    name: "Madhya Pradesh",
    screens: 85,
    areas: [
      { city: "Indore", screens: 35, locations: ["Vijay Nagar", "Malls", "Corporate"] },
      { city: "Bhopal", screens: 30, locations: ["MP Nagar", "Retail Zones", "Hospitals"] },
      { city: "Gwalior", screens: 20, locations: ["Markets", "Education Hubs"] },
    ],
  },
];

export default function StartAdvertising() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState(fallbackStates);
  const detailRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screenImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/network/states`);
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStates(data);
        }
      } catch (error) {
        // Keep current static fallback data when API is unavailable.
      }
    };

    loadStates();
  }, []);

  const handleStateClick = (state) => {
    setSelectedCity("");
    setSelectedState(selectedState?.name === state.name ? null : state);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const locationIcons = {
    Malls: <FaStore />,
    Airports: <FaSubway />,
    Hospitals: <FaHospital />,
    Healthcare: <FaHospital />,
    Education: <FaGraduationCap />,
    Restaurants: <FaUtensils />,
    Hotels: <FaBuilding />,
    Offices: <FaBuilding />,
    default: <FaMapMarkerAlt />,
  };

  const getLocationIcon = (loc) => {
    for (const key of Object.keys(locationIcons)) {
      if (loc.toLowerCase().includes(key.toLowerCase())) return locationIcons[key];
    }
    return locationIcons.default;
  };

  return (
    <main className="bg-sky-50 min-h-screen">

      {/* ───────────── HERO SECTION ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
        {/* Ambient glows */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/15 rounded-full blur-[160px]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT – Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 backdrop-blur border border-sky-300 text-sky-700 text-xs tracking-wide uppercase shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              Digital Advertising Platform
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-slate-900">
              Advertise Across{" "}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-sky-500 bg-clip-text text-transparent">
                High-Impact Digital Screens
              </span>
            </h1>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
              Reach millions through A2K's network of <b>10,000+ digital kiosks and displays</b> placed
              in corporate offices, retail stores, restaurants, transport hubs, hospitals, and
              educational institutions — with <b>real-time content updates</b> and <b>targeted audience reach</b>.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#network">
                <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Explore Our Network</span>
                </button>
              </a>
              <Link to="/contact">
                <button className="px-8 py-4 rounded-2xl border border-slate-300 bg-white/80 backdrop-blur text-slate-800 font-semibold hover:bg-white hover:shadow-lg hover:border-sky-300 transition-all duration-300 transform hover:-translate-y-1">
                  Talk With Expert
                </button>
              </Link>
            </div>

            {/* Mini stats */}
             {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
    {[
      { val: "10K+", label: "Active Screens" },
      { val: "35+", label: "Cities" },
      { val: "50M+", label: "Daily Views" },
    ].map((stat, index) => (
      <div
        key={index}
        className="group relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-white to-sky-50/70 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 opacity-70 group-hover:opacity-100" />
        <p className="text-3xl font-extrabold text-slate-900">{stat.val}</p>
        <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
      </div>
    ))}
  </div>
          </motion.div>

          {/* RIGHT – Floating Screens Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-300/20 via-blue-300/10 to-sky-300/10 blur-3xl rounded-full" />

            {/* Main display grid */}
            <div className="relative w-full max-w-[520px]">

              {/* Large primary screen */}
              <div className="relative bg-black rounded-2xl p-[5px] shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
                <div className="rounded-xl overflow-hidden relative w-full h-[280px] md:h-[320px]">
                  {screenImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Digital screen"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === activeScreen ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                  {/* Live badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-white text-xs font-medium">LIVE</span>
                  </div>
                </div>
                {/* Stand */}
                <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl shadow-md" />
              </div>

              {/* Small floating screens */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 md:-right-10 w-[140px] md:w-[160px]"
              >
                <div className="bg-black rounded-xl p-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                  <div className="rounded-lg overflow-hidden h-[90px] md:h-[100px]">
                    <img src={screenImages[(activeScreen + 2) % screenImages.length]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -left-4 md:-left-10 w-[130px] md:w-[150px]"
              >
                <div className="bg-black rounded-xl p-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                  <div className="rounded-lg overflow-hidden h-[80px] md:h-[95px]">
                    <img src={screenImages[(activeScreen + 4) % screenImages.length]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              {/* Connection lines (abstract tech feel) */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-dashed border-sky-300/40 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-dashed border-sky-300/40 rounded-bl-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              How It <span className="text-sky-600">Works</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Three simple steps to get your brand on screens across India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-sky-300 via-sky-300 to-sky-300" />

            {[
              {
                step: "01",
                icon: <FaTv className="text-2xl" />,
                title: "Choose Your Screens",
                desc: "Select from indoor and outdoor digital displays across prime locations in 35+ cities. Filter by audience, location type, and footfall.",
              },
              {
                step: "02",
                icon: <FaBullhorn className="text-2xl" />,
                title: "Upload Your Content",
                desc: "Share your ad creatives — videos, images, or animations. Our in-house design team can craft high-impact content for you.",
              },
              {
                step: "03",
                icon: <FaChartLine className="text-2xl" />,
                title: "Go Live & Track",
                desc: "Your ads go live instantly across the network. Monitor impressions, reach, and real-time performance through our dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:border-sky-200 transition-all duration-300 text-center group"
              >
                {/* Step circle */}
                <div className="relative z-10 mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-400/25 group-hover:scale-110 transition-transform duration-300 mb-6">
                  {item.icon}
                </div>

                <span className="text-xs font-bold text-sky-400 tracking-widest uppercase">
                  Step {item.step}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── WHY ADVERTISE WITH US ───────────── */}
      <section className="py-24 bg-gradient-to-br from-sky-50 via-sky-100/50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Why Brands <span className="text-sky-600">Choose Us</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              India's most trusted digital out-of-home advertising network.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTv />,
                title: "Premium Screen Locations",
                desc: "High-footfall placements in malls, airports, hospitals, offices, and transit stations across India.",
              },
              {
                icon: <FaUsers />,
                title: "Targeted Audiences",
                desc: "Reach the right people by selecting screens based on demographics, geography, and venue type.",
              },
              {
                icon: <FaChartLine />,
                title: "Real-Time Analytics",
                desc: "Track impressions, engagement, and campaign performance through our live reporting dashboard.",
              },
              {
                icon: <FaClock />,
                title: "Instant Content Updates",
                desc: "Change your ad creatives in real-time across all screens. No reprints, no delays, no middlemen.",
              },
              {
                icon: <FaBullhorn />,
                title: "Creative Support",
                desc: "Our in-house design team helps you create stunning ad creatives optimized for digital displays.",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Pan-India Coverage",
                desc: "Active presence across 35+ cities with 10,000+ screens — and rapidly expanding.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-sky-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-sky-600 text-xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ADVERTISING NETWORK – STATE CARDS ───────────── */}
      <section id="network" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Our Advertising <span className="text-sky-600">Network</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Screens deployed across India's top states. Choose where your brand should be seen.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {states.map((state, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => handleStateClick(state)}
                className={`group relative rounded-2xl p-6 border shadow-sm cursor-pointer
                           transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5
                           ${selectedState?.name === state.name
                             ? "bg-gradient-to-br from-sky-100 to-blue-100 border-sky-400 shadow-lg shadow-sky-200/50 ring-2 ring-sky-400/30"
                             : "bg-gradient-to-br from-white to-sky-50/50 border-slate-200 hover:border-sky-300 hover:from-sky-50 hover:to-blue-50"
                           }`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/0 to-blue-400/0 group-hover:from-sky-400/5 group-hover:to-blue-400/5 transition-all duration-300" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className={`text-sm transition-colors duration-300 ${selectedState?.name === state.name ? "text-blue-500" : "text-sky-500 group-hover:text-blue-500"}`} />
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">{state.name}</h3>
                    </div>
                    <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 ${selectedState?.name === state.name ? "rotate-180 text-sky-500" : ""}`} />
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl md:text-3xl font-extrabold transition-colors duration-300 ${selectedState?.name === state.name ? "text-blue-600" : "text-sky-600 group-hover:text-blue-600"}`}>
                      {state.screens}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">Screens</span>
                  </div>

                  {/* Mini bar */}
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full group-hover:from-sky-500 group-hover:to-blue-500 transition-all duration-500"
                      style={{ width: `${(state.screens / 320) * 100}%` }}
                    />
                  </div>

                  {/* City count hint */}
                  <p className="mt-2 text-xs text-slate-400">{state.areas.length} cities</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ───── STATE DETAIL PANEL ───── */}
          <div ref={detailRef}>
            <AnimatePresence>
              {selectedState && (
                <motion.div
                  key={selectedState.name}
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 40 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="relative bg-gradient-to-br from-white via-sky-50/30 to-blue-50/30 rounded-3xl border border-sky-200 shadow-xl p-8 md:p-10">
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedState(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-100 flex items-center justify-center text-slate-500 hover:text-sky-600 transition-all duration-200"
                    >
                      <FaTimes className="text-sm" />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white text-xl shadow-lg shadow-sky-400/25">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{selectedState.name}</h3>
                        <p className="text-slate-500">
                          <span className="font-semibold text-sky-600">{selectedState.screens}</span> screens across{" "}
                          <span className="font-semibold text-sky-600">{selectedState.areas.length}</span> cities
                        </p>
                      </div>
                    </div>

                    {/* City Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {selectedState.areas.map((area, i) => (
                        <motion.div
                          key={area.city}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          onClick={() => setSelectedCity(selectedCity === area.city ? "" : area.city)}
                          className={`group/card bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                            selectedCity === area.city
                              ? "border-sky-400 ring-2 ring-sky-200"
                              : "border-slate-200 hover:border-sky-300"
                          }`}
                        >
                          {/* City name & screens */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-slate-900">{area.city}</h4>
                              <p className="text-sm text-slate-500 mt-0.5">{area.screens} screens active</p>
                            </div>
                            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                              <FaTv className="text-sky-600" />
                            </div>
                          </div>

                          {/* Screen bar */}
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(area.screens / selectedState.areas[0].screens) * 100}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                              className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full"
                            />
                          </div>

                          {/* Location tags */}
                          <div className="flex flex-wrap gap-2">
                            {area.locations.map((loc, j) => (
                              <span
                                key={j}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium
                                           group-hover/card:bg-sky-50 group-hover/card:border-sky-200 group-hover/card:text-sky-700 transition-colors duration-300"
                              >
                                <span className="text-sky-400 text-[10px]">{getLocationIcon(loc)}</span>
                                {loc}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA in detail panel */}
                    <div className="mt-8 pt-6 border-t border-sky-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-slate-600">
                        Want to advertise in{" "}
                        <span className="font-semibold text-slate-900">{selectedCity || selectedState.name}</span>?
                      </p>
                      <Link
                        to={`/get-quote/${encodeURIComponent(selectedState.name)}${
                          selectedCity ? `?city=${encodeURIComponent(selectedCity)}` : ""
                        }`}
                      >
                        <button className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden">
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative">Advertise In {selectedCity || selectedState.name}</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 shadow-md">
              <FaTv className="text-sky-500 text-xl" />
              <span className="text-slate-700 font-medium">
                Total Network:{" "}
                <span className="text-2xl font-extrabold text-sky-600">
                  {states.reduce((sum, s) => sum + s.screens, 0).toLocaleString()}+
                </span>{" "}
                Screens
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── FINAL CTA ───────────── */}
      <section className="relative py-28 bg-gradient-to-r from-sky-100 via-blue-100 to-sky-100 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-300/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Ready to put your brand on screen?
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
              Contact our advertising team for a custom media plan tailored to your audience, locations, and budget.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-quote">
                <button className="group relative px-10 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold shadow-xl shadow-sky-500/25 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get a Quote</span>
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-4 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:shadow-lg hover:border-sky-300 transition-all duration-300 transform hover:-translate-y-1">
                  Talk to Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
