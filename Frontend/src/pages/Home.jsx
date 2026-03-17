import { useEffect, useState } from "react";
import "animate.css"; // Importing animate.css for premium animations
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  FaPhoneAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { adminFetch } from "../utils/adminAuth";
import { API_BASE_URL } from "../config/api";

//import p1 from "../assets/hero/p1.jpg";
//import p3 from "../assets/hero/p3.jpg";
import v2 from "../assets/hero/v2.mp4";
// import m1 from "../assets/hero/m1.jpg";
// import m2 from "../assets/hero/m2.jpg";
// import m3 from "../assets/hero/m3.jpg";
// import m4 from "../assets/hero/m4.jpg";
// import m5 from "../assets/hero/m5.jpg";
import wall from "../assets/hero/wall.jpg";
import w1 from "../assets/hero/w1.jpg";
import w2 from "../assets/hero/w2.jpg";
import w3 from "../assets/hero/w3.jpg";
import w4 from "../assets/hero/w4.jpg";
import retail from "../assets/hero/retail.jpg";
import b4 from "../assets/hero/b4.jpg";
import bank1 from "../assets/hero/bank1.jpg";
import r1 from "../assets/hero/r1.jpg";
import man from "../assets/hero/man.jpg";
// import m6 from "../assets/hero/m6.jpg";
import h2 from "../assets/hero/h2.jpg";
import e3 from "../assets/hero/e3.jpg";
import v3 from "../assets/hero/v3.mp4";
import v4 from "../assets/hero/v4.mp4";
import v5 from "../assets/hero/v5.mp4";

const defaultHeroTitlePrimary = "Elevate your brand with";
const defaultHeroTitleAccent = "next-generation digital advertising.";
const defaultHeroDescription =
  "Our smart screens and dynamic display solutions transform your digital presence and maximize visibility and redefine how your business attracts, engages, and influences customers.";

const media = [
  { type: "image", src: retail },
  { type: "video", src: v2 },
  { type: "video", src: v3 },
  { type: "video", src: v4 },
  { type: "image", src: r1 },
  { type: "video", src: v5 },
];

const defaultNewsItems = [
  "A2K Screens expands operations to 5 new cities across India",
  "Launched next-gen 4K Ultra Bright outdoor displays for retail",
  "Partnership with top hospitality chains for digital menu solutions",
  "A2K Screens crosses 10,000+ successful installations milestone",
  "New interactive touchscreen kiosks now available for corporate lobbies",
  "Featured in Digital Signage India Awards 2026 — Best Display Provider",
];

function NewsTicker({ newsItems = [] }) {
  const [currentNews, setCurrentNews] = useState(0);
  const [slide, setSlide] = useState(true);

  useEffect(() => {
    setCurrentNews(0);
  }, [newsItems]);

  useEffect(() => {
    if (!newsItems.length) {
      return;
    }

    const interval = setInterval(() => {
      setSlide(false);
      setTimeout(() => {
        setCurrentNews((prev) => (prev + 1) % newsItems.length);
        setSlide(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!newsItems.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-100 via-sky-50 to-sky-100 border-y border-sky-200">
      {/* Animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200/30 to-transparent animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center gap-5 md:gap-8">
        {/* Badge */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          <span className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm md:text-base font-bold uppercase tracking-widest shadow-lg shadow-sky-300/40">
            Latest News
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-sky-300 flex-shrink-0" />

        {/* News Text */}
        <div className="overflow-hidden flex-1 min-w-0">
          <p
            className={`text-base md:text-xl lg:text-2xl text-slate-800 font-semibold tracking-wide transition-all duration-500 ease-in-out ${
              slide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {newsItems[currentNews] || ""}
          </p>
        </div>

        {/* Counter */}
        <span className="hidden md:inline-flex flex-shrink-0 items-center px-3 py-1.5 rounded-full bg-sky-200/60 border border-sky-300 text-sky-700 text-sm font-medium">
          {currentNews + 1} / {newsItems.length}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div className="h-1 bg-sky-200/50">
        <div
          className="h-full bg-sky-400 rounded-r-full"
          style={{
            width: `${((currentNews + 1) / newsItems.length) * 100}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
export default function Home({ isAdminMode = false }) {
  const [homeContentOverride, setHomeContentOverride] = useState(null);
  const [loadingHomeContent, setLoadingHomeContent] = useState(false);
  const [savingHomeContent, setSavingHomeContent] = useState(false);
  const [newsDraftText, setNewsDraftText] = useState(
    defaultNewsItems.join("\n"),
  );
  const [heroTitlePrimaryDraft, setHeroTitlePrimaryDraft] = useState(
    defaultHeroTitlePrimary,
  );
  const [heroTitleAccentDraft, setHeroTitleAccentDraft] = useState(
    defaultHeroTitleAccent,
  );
  const [heroDescriptionDraft, setHeroDescriptionDraft] = useState(
    defaultHeroDescription,
  );

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const kioskScreens = ["retail", "restaurant", "corporate", "wayfinding"];
  const [kioskIndex, setKioskIndex] = useState(0);

  const navigate = useNavigate();

  // Hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % media.length);
        setFade(true);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, []);
  const [showContactBox, setShowContactBox] = useState(false);

  useEffect(() => {
    const loadHomeContent = async () => {
      setLoadingHomeContent(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/home-content`);
        if (!response.ok) {
          throw new Error("Failed to load home content");
        }
        const data = await response.json();
        setHomeContentOverride(data);
      } catch (error) {
        console.error(error.message || error);
      } finally {
        setLoadingHomeContent(false);
      }
    };

    loadHomeContent();
  }, []);

  const activeNewsItems =
    Array.isArray(homeContentOverride?.newsItems) &&
    homeContentOverride.newsItems.length > 0
      ? homeContentOverride.newsItems
      : defaultNewsItems;

  const activeHeroTitlePrimary =
    homeContentOverride?.heroTitlePrimary || defaultHeroTitlePrimary;
  const activeHeroTitleAccent =
    homeContentOverride?.heroTitleAccent || defaultHeroTitleAccent;
  const activeHeroDescription =
    homeContentOverride?.heroDescription || defaultHeroDescription;

  useEffect(() => {
    if (!isAdminMode) {
      return;
    }
    setNewsDraftText(activeNewsItems.join("\n"));
    setHeroTitlePrimaryDraft(activeHeroTitlePrimary);
    setHeroTitleAccentDraft(activeHeroTitleAccent);
    setHeroDescriptionDraft(activeHeroDescription);
  }, [
    activeNewsItems,
    activeHeroTitlePrimary,
    activeHeroTitleAccent,
    activeHeroDescription,
    isAdminMode,
  ]);

  const saveLatestNews = async () => {
    setSavingHomeContent(true);
    try {
      const payload = {
        newsItems: newsDraftText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        heroTitlePrimary: String(heroTitlePrimaryDraft || "").trim(),
        heroTitleAccent: String(heroTitleAccentDraft || "").trim(),
        heroDescription: String(heroDescriptionDraft || "").trim(),
      };

      const response = await adminFetch(`${API_BASE_URL}/api/home-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save latest news");
      }

      const saved = await response.json();
      setHomeContentOverride(saved);
      toast.success("Latest news updated.");
    } catch (error) {
      toast.error(error.message || "Failed to save latest news.");
    } finally {
      setSavingHomeContent(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactBox(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // About kiosk rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setKioskIndex((prev) => (prev + 1) % kioskScreens.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // PREMIUM About TV Slideshow
  const aboutScreens = [w1, w2, w3, w4];

  const [aboutIndex, setAboutIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutScreens.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentItem = media[current];

  return (
    <main className="bg-sky-50 overflow-hidden">
      {/* Compact Contact Info */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-3 pb-2 px-3 sm:px-0">
        <div
          className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full
                  bg-white border border-sky-200
                  shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-xs md:text-sm text-slate-700 font-medium text-center sm:text-left">
            <span className="flex items-center justify-center sm:justify-start gap-1">
              <FaPhoneAlt className="text-green-500" /> +91 8668223495
            </span>
            <span className="hidden sm:inline-block w-px h-4 bg-sky-300"></span>
            <span className="break-all sm:break-normal">✉ contact@a2kscreens.in</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/a2kscreens"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="A2K Screens Instagram"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white shadow-lg shadow-pink-300/50 transition duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-400/60"
          >
            <span className="absolute inset-0 rounded-full bg-pink-400/40 blur-md -z-10"></span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="https://wa.me/8668223495?text=Hi%2C%20I'm%20interested%20in%20your%20digital%20display%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-300/50 transition duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl hover:shadow-green-400/60"
          >
            <span className="absolute inset-0 rounded-full bg-green-400/40 blur-md -z-10"></span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50">
        {/* Ambient glows */}
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-sky-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] bg-blue-300/20 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-20 items-center">
          {" "}
          {/* Left Content */}
          <div className="space-y-7 animate__animated animate__fadeInLeft animate__slow">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-700 text-xs tracking-wide uppercase shadow-sm">
              Here Brands Shine Bright...
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium leading-tight tracking-tight text-slate-900">
              {activeHeroTitlePrimary}
              <span className="block bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {activeHeroTitleAccent}
              </span>
            </h1>

            <p className="text-slate-700 max-w-2xl text-lg leading-relaxed">
              {activeHeroDescription}
            </p>

            {isAdminMode && (
              <div className="rounded-2xl border border-sky-200 bg-white/85 p-4 space-y-3">
                <p className="text-xs font-semibold text-sky-900 uppercase tracking-wide">
                  Admin: Edit Hero Text
                </p>
                <label className="block text-xs text-slate-700">
                  Hero Heading (Top Line)
                  <input
                    type="text"
                    value={heroTitlePrimaryDraft}
                    onChange={(event) =>
                      setHeroTitlePrimaryDraft(event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-xs text-slate-700">
                  Hero Heading (Accent Line)
                  <input
                    type="text"
                    value={heroTitleAccentDraft}
                    onChange={(event) =>
                      setHeroTitleAccentDraft(event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-xs text-slate-700">
                  Hero Paragraph
                  <textarea
                    rows={4}
                    value={heroDescriptionDraft}
                    onChange={(event) =>
                      setHeroDescriptionDraft(event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </label>
                <p className="text-[11px] text-slate-600">
                  Click Save Latest News in the admin editor below the ticker to
                  save hero and news together.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-6">
              <button
                className="group relative overflow-hidden px-6 sm:px-10 py-3 sm:py-4 rounded-2xl text-white font-semibold shadow-xl shadow-sky-300/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-300/60 text-sm sm:text-base"
                onClick={() => navigate("/start-advertising")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500" />
                <span className="absolute -inset-2 rounded-3xl bg-sky-400/30 blur-xl animate-pulse" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Start Advertising
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
              <Link to="/products">
                <button className="group relative overflow-hidden px-6 sm:px-10 py-3 sm:py-4 rounded-2xl border border-sky-300/80 bg-white/90 backdrop-blur-md text-slate-900 shadow-[0_10px_25px_rgba(14,116,144,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_35px_rgba(14,116,144,0.2)] text-sm sm:text-base">
                  <span className="pointer-events-none absolute inset-0 rounded-2xl border border-sky-200/70" />
                  <span className="pointer-events-none absolute left-3 right-3 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-pulse [animation-duration:1.6s]" />
                  <span className="pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse [animation-duration:1.6s] [animation-delay:350ms]" />
                  <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-l-2 border-t-2 border-sky-400/80 rounded-tl-sm animate-pulse [animation-duration:1.6s]" />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-r-2 border-b-2 border-blue-500/80 rounded-br-sm animate-pulse [animation-duration:1.6s] [animation-delay:350ms]" />
                  <span className="relative z-10 inline-flex items-center gap-2 font-semibold">
                    Explore Products
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

            {/* Enhanced Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
              <div className="bg-gradient-to-br from-white to-slate-50 backdrop-blur border border-slate-300 rounded-2xl px-6 py-5 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-sm text-slate-600">Industrial Rated</p>
              </div>
              <div className="bg-gradient-to-br from-white to-slate-50 backdrop-blur border border-slate-300 rounded-2xl px-6 py-5 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <p className="text-2xl font-bold text-slate-900">10,000+</p>
                <p className="text-sm text-slate-600">Installations</p>
              </div>
              <div className="bg-gradient-to-br from-white to-slate-50 backdrop-blur border border-slate-300 rounded-2xl px-6 py-5 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <p className="text-2xl font-bold text-slate-900">ISO</p>
                <p className="text-sm text-slate-600">Certified</p>
              </div>
            </div>
          </div>
          {/* Right Media */}
          <div className="relative flex justify-center md:justify-end">
            {/* Slight lift */}
            <div className="relative -mt-14 md:-mt-16">
              {/* Sky Blue Ambient Glow */}
              <div className="absolute -inset-10 bg-sky-400/10 blur-3xl -z-10" />

              {/* TV Frame */}
              <div className="relative">
                {/* Outer subtle depth shadow */}
                <div
                  className="absolute inset-0 translate-y-3 
  bg-black/30 blur-md rounded-lg"
                ></div>
                {/* Matte Black Bezel */}
                <div className="relative bg-black rounded-[2rem] p-[4px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
                  {/* Screen Area */}
                 <div
  className={`relative rounded-[1.5rem] overflow-hidden transition-all duration-700 ${
    fade ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
  } w-full max-w-[640px] aspect-video`}
>
                    {currentItem.type === "image" ? (
                      <img
                        src={currentItem.src}
                        alt="Digital signage showcase"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={currentItem.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                    {/* Glass Reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none 
    bg-gradient-to-tr from-white/10 via-transparent to-transparent 
    opacity-60"
                    />
                  </div>
                </div>

                {/* Bottom Chin (like real TV) */}
                <div
                  className="absolute left-1/2 -bottom-2 -translate-x-1/2 
        w-14 h-3 rounded-b-xl bg-black shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Ticker Bar */}
      <NewsTicker newsItems={activeNewsItems} />

      {isAdminMode && (
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-sky-900">
                  Admin: Edit Latest News Ticker
                </h3>
                <button
                  type="button"
                  onClick={saveLatestNews}
                  disabled={savingHomeContent}
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 disabled:opacity-60"
                >
                  {savingHomeContent ? "Saving..." : "Save Latest News"}
                </button>
              </div>
              <textarea
                rows={6}
                value={newsDraftText}
                onChange={(event) => setNewsDraftText(event.target.value)}
                placeholder="One news item per line"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              {loadingHomeContent && (
                <p className="text-xs text-slate-600">
                  Loading saved latest news...
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Us Section – Premium Wall TV (Image Slideshow) */}
      <section
        className="relative py-16 md:py-32 overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100"
        style={{
          backgroundImage: `url(${wall})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Removed blur overlay for clear wall.jpg background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
          {" "}
          {/* LEFT SIDE – WALL TV */}
<div className="relative flex justify-center md:justify-end w-full">            <div
              className="absolute w-full max-w-[560px] h-[315px] 
  bg-black/40 blur-2xl translate-y-10 rounded-lg hidden md:block"
            ></div>
            {/* Wall glow */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl" />
            {/* TV wall shadow */}
            <div
              className="absolute w-full max-w-[420px] h-[236px] 
  bg-black/40 blur-2xl translate-y-8 rounded-lg hidden md:block"
            ></div>{" "}
            {/* TV Frame */}
            <div
              className="relative bg-black rounded-md p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
              style={{ transform: "rotateY(4deg)" }}
            >
              <div className="bg-black rounded-sm p-[5px] shadow-inner">
                {/* Screen */}
                <div className="relative w-[calc(100vw-4rem)] h-[56vw] sm:w-[360px] sm:h-[200px] md:w-[460px] md:h-[260px] bg-black rounded-sm overflow-hidden flex items-center justify-center">
                  {aboutScreens.map((screen, index) => (
                    <img
                      key={index}
                      src={screen}
                      alt="About showcase"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
      ${index === aboutIndex ? "opacity-100" : "opacity-0"}`}
                      style={{ willChange: "opacity" }}
                    />
                  ))}

                  {/* Glass reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none 
    bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE – TEXT */}
          <div className="relative flex flex-col gap-8 bg-white/80 p-8 md:p-10 rounded-3xl border border-sky-200 shadow-2xl max-w-2xl">
            {/* Section Label */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 text-xs font-semibold tracking-widest uppercase mb-4">
                About Us
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  A2K Screens
                </span>
              </h2>

              <p className="text-sky-700 mt-3 text-lg">
                Powering Intelligent Digital Experiences
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-700 text-lg leading-relaxed">
              <span className="font-semibold text-slate-900">A2K Screens</span>{" "}
              delivers commercial-grade digital display solutions that redefine
              how businesses communicate and engage — from high-impact
              advertising displays to interactive kiosks.
            </p>

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
                  <p className="text-3xl font-extrabold text-slate-900">
                    {stat.val}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/services">
                <button
                  className="px-8 py-3.5 rounded-xl
                         bg-gradient-to-r from-sky-600 to-blue-600
                         text-white font-semibold text-sm
                         shadow-lg hover:scale-105
                         transition-all duration-300"
                >
                  Explore A2K Screens
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="industries"
        className="bg-gradient-to-br from-sky-100 via-sky-50 to-sky-200 py-24"
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Industries <span className="text-blue-600">We Serve</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Transforming communication across multiple industries with smart
            digital display solutions.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
          {/* Retail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/retail")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={retail}
                  alt="Retail"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              <span className="text-gray-900">Retail</span>
            </h3>
            <p className="mt-3 text-gray-600">
              Increase in-store engagement and boost sales with dynamic
              promotional displays.
            </p>
          </motion.div>

          {/* Corporate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/corporate")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={bank1}
                  alt="Corporate"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Corporate Communication
            </h3>
            <p className="mt-3 text-gray-600">
              Share company-wide announcements, KPIs, and updates instantly
              across offices.
            </p>
          </motion.div>

          {/* Restaurant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/restaurant")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={r1}
                  alt="Restaurant"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Restaurants
            </h3>
            <p className="mt-3 text-gray-600">
              Update digital menus in real-time across locations without
              reprints or delays.
            </p>
          </motion.div>

          {/* Manufacturing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/manufacturing")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={man}
                  alt="Manufacturing"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Manufacturing
            </h3>
            <p className="mt-3 text-gray-600">
              Improve safety and productivity with real-time on-screen alerts
              and dashboards.
            </p>
          </motion.div>

          {/* Healthcare */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/hospital")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={h2}
                  alt="Healthcare"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Healthcare
            </h3>
            <p className="mt-3 text-gray-600">
              Reduce patient wait times with real-time queue and information
              displays.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center group cursor-pointer"
            onClick={() => navigate("/industries/education")}
          >
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition duration-500">
                <img
                  src={e3}
                  alt="Education"
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* TV Stand Base */}
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-lg shadow-md" />
              <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-700 rounded-full shadow-inner" />
            </div>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Education
            </h3>
            <p className="mt-3 text-gray-600">
              Connect students and staff with centralized announcements and
              updates.
            </p>
          </motion.div>
        </div>
        <div className="mt-16 flex justify-center">
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              navigate("/industries");
            }}
            className="flex items-center gap-2 px-6 py-3
               border border-gray-400
               rounded-full
               text-gray-800
               transition-all duration-300
               hover:border-sky-500
               hover:text-sky-600
               hover:-translate-y-1
               hover:shadow-md"
          >
            <span className="text-sm font-medium tracking-wide">
              Explore More
            </span>

            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </section>
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-sky-100 to-blue-50 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-300/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Our Work Defines{" "}
              <span className="text-blue-600">Our Reputation</span>
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Trusted by businesses across India for powerful digital display
              solutions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { number: "10K+", label: "Installations", icon: <FaBuilding /> },
              { number: "150+", label: "Clients", icon: <FaUsers /> },
              { number: "35+", label: "Cities", icon: <FaMapMarkerAlt /> },
              { number: "99%", label: "Satisfaction", icon: <FaStar /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-sky-400 via-blue-400 to-sky-300 shadow-xl hover:shadow-2xl transition duration-500"
              >
                {/* Inner Card */}
                <div className="bg-white rounded-3xl p-8 text-center h-full transition duration-500 group-hover:bg-sky-50">
                  <div className="text-3xl text-blue-500 mb-4 flex justify-center">
                    {item.icon}
                  </div>

                  <h3 className="text-4xl font-extrabold text-gray-900 group-hover:text-sky-600 transition duration-300">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-md text-gray-600 tracking-wide">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Trust Strip */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm uppercase tracking-widest text-slate-400 font-medium mb-10">
            Trusted by leading brands across India
          </p>
          <div className="relative">
            <div className="flex animate-marquee gap-16 items-center">
              {[
                "Apollo Hospitals",
                "Reliance retail",
                "DMart",
                "Haldiram's",
                "PhysicsWallah",
                "Infosys",
              ].map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <span className="text-slate-400 font-semibold text-lg whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
              Real feedback from businesses that transformed their spaces with
              our solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "A2K Screens helped us improve how we communicate with patients and visitors inside our hospital. The digital displays allow us to share important health awareness messages, service updates, and information in a clear and engaging way.",
                name: "Dr. Manisha Karmarkar", 
                role: "COO, Ruby Hall Clinic",
                rating: 5,
              },
              {
                quote:
                   "A2K Screens helped us promote our seasonal offers and new product launches across multiple locations. Their digital display network ensured strong visibility for our brand and helped attract more customers to our outlets.",
                name: "Kailash Agarwal",
                role: "President - Retail QSR , Haldiram's",
                rating: 5,
              },
              {
                quote:
                   "A2K Screens have improved the way we present educational content to students inside our academy. The digital displays allow us to explain concepts visually and share important class updates in a clear and engaging way.",
                name: "Satish Sharma",
                role: " CMO , PhysicsWallah",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Quote mark */}
                <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-28 bg-gradient-to-r from-sky-100 via-blue-100 to-sky-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
              Looking to deploy digital screens for your business?
            </h2>

            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
              Get in touch with our team to discuss your requirements and
              receive a custom proposal tailored to your business needs.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <button
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold 
                bg-sky-500 text-white shadow-md hover:bg-sky-400 hover:shadow-lg transition transform hover:scale-105"
                >
                  Request a Quote
                  <span className="inline-block transform transition group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Link>

              <Link to="/contact">
                <button
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold 
    border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 transition transform hover:scale-105"
                >
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
