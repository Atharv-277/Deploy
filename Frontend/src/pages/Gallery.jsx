import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  Building2, 
  Layers, 
  Box, 
  MessageSquareQuote, 
  Plus, 
  Save, 
  Trash2, 
  ChevronDown,
  ZoomIn
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { adminFetch } from "../utils/adminAuth";
import { API_BASE_URL } from "../config/api";

// Ensure these paths match your project structure
import a1 from "../assets/hero/a1.jpg";
import a2 from "../assets/hero/a2.jpg";
import ad1 from "../assets/hero/ad1.jpg";

import b1 from "../assets/hero/b1.jpg";
import b2 from "../assets/hero/b2.jpg";
import b4 from "../assets/hero/b4.jpg";
import ba1 from "../assets/hero/ba1.jpg";
import bb1 from "../assets/hero/bb1.jpg";
import bank1 from "../assets/hero/bank1.jpg";

import c1 from "../assets/hero/c1.jpg";
import cms from "../assets/hero/cms.jpg";
import cu from "../assets/hero/cu.jpg";

import e1 from "../assets/hero/e1.jpg";
import e2 from "../assets/hero/e2.jpg";
import e3 from "../assets/hero/e3.jpg";
import ex1 from "../assets/hero/ex1.jpg";

import g1 from "../assets/hero/g1.jpg";
import g2 from "../assets/hero/g2.jpg";
import gy1 from "../assets/hero/gy1.jpg";
import gy2 from "../assets/hero/gy2.jpg";

import h1 from "../assets/hero/h1.jpg";
import h2 from "../assets/hero/h2.jpg";

import i1 from "../assets/hero/i1.jpg";
import iair from "../assets/hero/iair.jpg";
import iban from "../assets/hero/iban.jpg";
import icor from "../assets/hero/icor.jpg";
import iedu from "../assets/hero/iedu.jpg";
import ifit from "../assets/hero/ifit.jpg";
import ihos from "../assets/hero/ihos.jpg";
import iman from "../assets/hero/iman.jpg";
import iper from "../assets/hero/iper.jpg";
import ire from "../assets/hero/ire.jpg";
import ires from "../assets/hero/ires.jpg";

import m1 from "../assets/hero/m1.jpg";
import m2 from "../assets/hero/m2.jpg";
import m3 from "../assets/hero/m3.jpg";
import m4 from "../assets/hero/m4.jpg";
import m5 from "../assets/hero/m5.jpg";
import m6 from "../assets/hero/m6.jpg";
import ma1 from "../assets/hero/ma1.jpg";
import man from "../assets/hero/man.jpg";

import o1 from "../assets/hero/o1.jpg";

import p1 from "../assets/hero/p1.jpg";
import p2 from "../assets/hero/p2.jpg";
import p3 from "../assets/hero/p3.jpg";
import p4 from "../assets/hero/p4.jpg";

import r1 from "../assets/hero/r1.jpg";
import r2 from "../assets/hero/r2.jpg";
import r3 from "../assets/hero/r3.jpg";
import r4 from "../assets/hero/r4.jpg";
import retail from "../assets/hero/retail.jpg";

import s1 from "../assets/hero/s1.jpg";
import s2 from "../assets/hero/s2.jpg";

import t1 from "../assets/hero/t1.jpg";
import t2 from "../assets/hero/t2.jpg";

import u1 from "../assets/hero/u1.jpg";


const DEFAULT_VISIBLE_INSTALLATIONS = 3; // Now controls horizontal grid count

const createEmptyInstallation = () => ({
  clientName: "",
  opted: "",
  quantity: "",
  reviews: [""],
});

// Expanded mock data so you can see the "Show More" functionality in action
const industries = [
  {
    name: "Corporate",
    desc: "Office signage deployments, interactive lobby video walls, and digital directory rollouts.",
    cover: bank1,
    images: [bank1, m1, m2, p1, p2, p3],
    clientDetails: {
      clientName: "TechVista Pvt Ltd",
      opted: "Lobby video wall + wayfinding kiosks",
      quantity: "14 units",
      reviews: ["Installation quality and training support were excellent."],
    },
    clientInstallations: [
      {
        clientName: "TechVista Pvt Ltd",
        opted: "Lobby video wall + wayfinding",
        quantity: "14 units",
        reviews: ["Installation quality and training support were excellent. Highly recommended."],
      },
      {
        clientName: "Global Finance Corp",
        opted: "Meeting room displays + CMS",
        quantity: "45 units",
        reviews: ["Streamlined our meeting bookings. The displays are crisp and reliable."],
      },
      {
        clientName: "Innovate Workspace",
        opted: "Digital directories",
        quantity: "8 units",
        reviews: ["Visitors love the new interactive directories in the lobby."],
      },
      {
        clientName: "Nexus Towers",
        opted: "Elevator digital signage",
        quantity: "24 units",
        reviews: ["Great way to communicate building updates to tenants efficiently."],
      },
    ],
  },
  {
    name: "Retail",
    desc: "High-brightness storefront displays and engaging in-store promotional installations.",
    cover: retail,
    images: [retail, p1, p2, m1, m1, m2],
    clientDetails: {
      clientName: "RetailMax India",
      opted: "Commercial displays + CMS service",
      quantity: "26 units",
      reviews: ["Our stores now run unified visuals with zero manual effort."],
    },
    clientInstallations: [
      {
        clientName: "RetailMax India",
        opted: "Commercial displays + CMS service",
        quantity: "26 units",
        reviews: ["Our stores now run unified visuals with zero manual effort."],
      },
      {
        clientName: "Urban Style Boutique",
        opted: "Window facing displays",
        quantity: "12 units",
        reviews: ["Foot traffic has visibly increased since we installed the window displays."],
      },
      {
        clientName: "MegaMart Superstores",
        opted: "Aisle promotional screens",
        quantity: "150 units",
        reviews: ["Perfect for highlighting daily deals. Centralized control is a lifesaver."],
      },
      {
        clientName: "TechGadgets Hub",
        opted: "Interactive product kiosks",
        quantity: "18 units",
        reviews: ["Customers love exploring product specs on the interactive touch screens."],
      },
    ],
  },
  {
    name: "Restaurant",
    desc: "Dynamic digital menu boards, self-order kiosks, and dining area entertainment screens.",
    cover: r1,
    images: [r1, p3, m2, m1, p1, retail],
    clientDetails: {
      clientName: "Spice Garden Chain",
      opted: "Digital menu boards + self-order kiosks",
      quantity: "19 units",
      reviews: ["Fast deployment and smooth support across all outlets."],
    },
    clientInstallations: [
      {
        clientName: "Spice Garden Chain",
        opted: "Digital menu boards + self-order kiosks",
        quantity: "19 units",
        reviews: ["Fast deployment and smooth support across all outlets."],
      },
    ],
  },
  {
    name: "Manufacturing",
    desc: "Industrial dashboards, shift-tracking screens, and plant-floor safety signage setups.",
    cover: man,
    images: [man, m1, m2, m1, p2, p3],
    clientDetails: {
      clientName: "ProFab Engineering",
      opted: "Production dashboards + safety display solution",
      quantity: "11 units",
      reviews: ["Real-time visibility improved line coordination instantly."],
    },
    clientInstallations: [
      {
        clientName: "ProFab Engineering",
        opted: "Production dashboards + safety display solution",
        quantity: "11 units",
        reviews: ["Real-time visibility improved line coordination instantly."],
      },
    ],
  },
  {
    name: "Healthcare",
    desc: "Hospital information displays, doctor directories, and patient queue management screens.",
    cover: h2,
    images: [h2, m2, p1, m2, p3, m1],
    clientDetails: {
      clientName: "Apollo Care Center",
      opted: "Queue management displays + information kiosks",
      quantity: "16 units",
      reviews: ["Patient navigation became much smoother after go-live."],
    },
    clientInstallations: [
      {
        clientName: "Apollo Care Center",
        opted: "Queue management displays + information kiosks",
        quantity: "16 units",
        reviews: ["Patient navigation became much smoother after go-live."],
      },
    ],
  },
  {
    name: "Transportation",
    desc: "Terminal info boards, arrival/departure screens, and route guidance installations.",
    cover: t1,
    images: [t1, p2, m1, m2, p1, m2],
    clientDetails: {
      clientName: "MetroLink Transit",
      opted: "Passenger information displays",
      quantity: "22 units",
      reviews: ["Clear and bright visuals improved commuter guidance."],
    },
    clientInstallations: [
      {
        clientName: "MetroLink Transit",
        opted: "Passenger information displays",
        quantity: "22 units",
        reviews: ["Clear and bright visuals improved commuter guidance."],
      },
    ],
  },
  {
    name: "Education",
    desc: "Campus communication screens, digital notice systems, and interactive wayfinding.",
    cover: e3,
    images: [e3, m1, p3, m1, m2, p2],
    clientDetails: {
      clientName: "Bright Future University",
      opted: "Campus notice boards + interactive displays",
      quantity: "13 units",
      reviews: ["Announcements are now centralized and easier to manage."],
    },
    clientInstallations: [
      {
        clientName: "Bright Future University",
        opted: "Campus notice boards + interactive displays",
        quantity: "13 units",
        reviews: ["Announcements are now centralized and easier to manage."],
      },
    ],
  },
  {
    name: "Fitness",
    desc: "Gym schedule displays, workout instructional kiosks, and member-engagement screens.",
    cover: g1,
    images: [g1, m2, p1, m1, m1, p3],
    clientDetails: {
      clientName: "UrbanFit Clubs",
      opted: "Class schedule displays + promo screens",
      quantity: "9 units",
      reviews: ["Members love the upgraded digital experience."],
    },
    clientInstallations: [
      {
        clientName: "UrbanFit Clubs",
        opted: "Class schedule displays + promo screens",
        quantity: "9 units",
        reviews: ["Members love the upgraded digital experience."],
      },
    ],
  },
];

export default function Gallery({ isAdminMode = false }) {
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [contentOverrides, setContentOverrides] = useState([]);
  const [loadingOverrides, setLoadingOverrides] = useState(false);
  const [showAllClientInfo, setShowAllClientInfo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftInstallations, setDraftInstallations] = useState([createEmptyInstallation()]);

  const mergedIndustries = useMemo(
    () =>
      industries.map((industry) => {
      const override = contentOverrides.find((entry) => entry.category === industry.name);
      const defaultReviews = Array.isArray(industry.clientDetails.reviews)
        ? industry.clientDetails.reviews
        : [];
      const overrideReviews = Array.isArray(override?.reviews)
        ? override.reviews.map((review) => String(review || "").trim()).filter(Boolean)
        : [];

      return {
        ...industry,
        clientDetails: {
          clientName: override?.clientName || industry.clientDetails.clientName,
          opted: override?.opted || industry.clientDetails.opted,
          quantity: override?.quantity || industry.clientDetails.quantity,
          reviews: overrideReviews.length > 0 ? overrideReviews : defaultReviews,
        },
        clientInstallations:
          Array.isArray(override?.clientInstallations) && override.clientInstallations.length > 0
            ? override.clientInstallations.map((item) => ({
                clientName: String(item?.clientName || "").trim(),
                opted: String(item?.opted || "").trim(),
                quantity: String(item?.quantity || "").trim(),
                reviews: Array.isArray(item?.reviews)
                  ? item.reviews.map((review) => String(review || "").trim()).filter(Boolean)
                  : [],
              }))
            : industry.clientInstallations || [
                {
                  clientName: override?.clientName || industry.clientDetails.clientName,
                  opted: override?.opted || industry.clientDetails.opted,
                  quantity: override?.quantity || industry.clientDetails.quantity,
                  reviews: overrideReviews.length > 0 ? overrideReviews : defaultReviews,
                },
              ],
      };
    }),
    [contentOverrides]
  );

  const activeData = useMemo(
    () => mergedIndustries.find((industry) => industry.name === activeIndustry),
    [mergedIndustries, activeIndustry]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeIndustry]);

  useEffect(() => {
    const loadOverrides = async () => {
      setLoadingOverrides(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/installation-content`);
        if (!response.ok) {
          throw new Error("Failed to load installation content.");
        }
        const data = await response.json();
        setContentOverrides(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error.message || error);
      } finally {
        setLoadingOverrides(false);
      }
    };

    loadOverrides();
  }, []);

  useEffect(() => {
    setShowAllClientInfo(false);
    if (!isAdminMode || !activeData) {
      return;
    }

    const nextDraft = Array.isArray(activeData.clientInstallations)
      ? activeData.clientInstallations.map((item) => ({
          clientName: item.clientName || "",
          opted: item.opted || "",
          quantity: item.quantity || "",
          reviews: Array.isArray(item.reviews) && item.reviews.length > 0 ? item.reviews : [""],
        }))
      : [createEmptyInstallation()];

    setDraftInstallations(nextDraft.length > 0 ? nextDraft : [createEmptyInstallation()]);
  }, [activeIndustry, activeData, isAdminMode]);

  const handleInstallationFieldChange = (installationIndex, field, value) => {
    setDraftInstallations((prev) =>
      prev.map((item, index) => (index === installationIndex ? { ...item, [field]: value } : item))
    );
  };

  const handleReviewChange = (installationIndex, reviewIndex, value) => {
    setDraftInstallations((prev) =>
      prev.map((item, index) =>
        index === installationIndex
          ? {
              ...item,
              reviews: item.reviews.map((review, innerIndex) =>
                innerIndex === reviewIndex ? value : review
              ),
            }
          : item
      )
    );
  };

  const handleAddInstallation = () => {
    setDraftInstallations((prev) => [...prev, createEmptyInstallation()]);
  };

  const handleRemoveInstallation = (installationIndex) => {
    setDraftInstallations((prev) => {
      const next = prev.filter((_, index) => index !== installationIndex);
      return next.length > 0 ? next : [createEmptyInstallation()];
    });
  };

  const handleAddReview = (installationIndex) => {
    setDraftInstallations((prev) =>
      prev.map((item, index) =>
        index === installationIndex ? { ...item, reviews: [...item.reviews, ""] } : item
      )
    );
  };

  const handleRemoveReview = (installationIndex, reviewIndex) => {
    setDraftInstallations((prev) =>
      prev.map((item, index) => {
        if (index !== installationIndex) {
          return item;
        }
        const nextReviews = item.reviews.filter((_, idx) => idx !== reviewIndex);
        return {
          ...item,
          reviews: nextReviews.length > 0 ? nextReviews : [""],
        };
      })
    );
  };

  const handleSaveDetails = async () => {
    if (!activeIndustry) return;

    setSaving(true);
    try {
      const payload = {
        category: activeIndustry,
        clientInstallations: draftInstallations
          .map((item) => ({
            clientName: String(item.clientName || "").trim(),
            opted: String(item.opted || "").trim(),
            quantity: String(item.quantity || "").trim(),
            reviews: Array.isArray(item.reviews)
              ? item.reviews.map((review) => String(review || "").trim()).filter(Boolean)
              : [],
          }))
          .filter(
            (item) => item.clientName || item.opted || item.quantity || item.reviews.length > 0
          ),
      };

      const firstInstallation = payload.clientInstallations[0] || createEmptyInstallation();
      payload.clientName = firstInstallation.clientName;
      payload.opted = firstInstallation.opted;
      payload.quantity = firstInstallation.quantity;
      payload.reviews = firstInstallation.reviews;

      const response = await adminFetch(`${API_BASE_URL}/api/installation-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save installation details.");
      }

      const saved = await response.json();
      setContentOverrides((prev) => {
        const index = prev.findIndex((item) => item.category === saved.category);
        if (index === -1) return [...prev, saved];
        const next = [...prev];
        next[index] = saved;
        return next;
      });
      toast.success("Installation details saved successfully! 🎉");
    } catch (error) {
      const message = error.message || "Failed to save installation details.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const publicInstallations = Array.isArray(activeData?.clientInstallations)
    ? activeData.clientInstallations
    : [];
  const visiblePublicInstallations = showAllClientInfo
    ? publicInstallations
    : publicInstallations.slice(0, DEFAULT_VISIBLE_INSTALLATIONS);

  // Helper for dynamic bento grid spanning
  const getBentoSpan = (index) => {
    switch (index) {
      case 0: return "col-span-2 md:col-span-2 row-span-2"; // Large square
      case 1: return "col-span-1 md:col-span-1 row-span-1"; // Standard
      case 2: return "col-span-1 md:col-span-1 row-span-1"; // Standard
      case 3: return "col-span-2 md:col-span-2 row-span-1"; // Wide rectangle
      case 4: return "col-span-1 md:col-span-1 row-span-1"; // Standard
      case 5: return "col-span-1 md:col-span-1 row-span-1"; // Standard
      default: return "col-span-1 row-span-1";
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-900">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!activeIndustry ? (
            
            /* ─── GRID VIEW ─── */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
            >
              {/* Header */}
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sky-600 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-sm mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  Global Deployments
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
                >
                  Installations Across <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
                    Every Industry
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-slate-600"
                >
                  Explore our proven track record of delivering high-impact digital signage solutions tailored to unique sector demands.
                </motion.p>
              </div>

              {/* Industry Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {mergedIndustries.map((ind, i) => (
                  <motion.div
                    key={ind.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setActiveIndustry(ind.name)}
                    className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 bg-slate-900"
                  >
                    <img
                      src={ind.cover}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end h-full">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-10 h-1 bg-sky-500 mb-4 rounded-full" />
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {ind.name}
                        </h2>
                        <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                          {ind.desc}
                        </p>
                        <div className="inline-flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
                          View Projects <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          ) : (

            /* ─── DETAIL VIEW ─── */
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pb-24"
            >
              {/* Hero Banner */}
              <div className="relative h-[45vh] min-h-[400px] w-full overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={activeData?.cover}
                  alt={activeIndustry}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-slate-900/60 to-slate-900/30" />

                <div className="absolute inset-0 flex items-end">
                  <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
                    <button
                      onClick={() => setActiveIndustry(null)}
                      className="group flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all w-fit"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                      Back to Industries
                    </button>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight"
                    >
                      {activeIndustry}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg sm:text-xl text-slate-200 max-w-2xl leading-relaxed"
                    >
                      {activeData?.desc}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Industry Navigation Tabs (Sticky) */}
              <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex overflow-x-auto gap-2 py-4 hide-scrollbar items-center">
                    {mergedIndustries.map((ind) => (
                      <button
                        key={ind.name}
                        onClick={() => setActiveIndustry(ind.name)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
                          activeIndustry === ind.name
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-24">
                
                {/* ─── SECTION: HORIZONTAL CLIENT DETAILS ─── */}
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Success Stories</h3>
                    <p className="text-slate-500 text-lg">Real-world deployments and direct feedback from our {activeIndustry.toLowerCase()} clients.</p>
                  </div>

                  {loadingOverrides && (
                    <div className="animate-pulse flex justify-center space-x-4 p-6 bg-white rounded-3xl border border-slate-200">
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    </div>
                  )}

                  {/* Admin Editor (Vertical Stack for better form UX) */}
                  {isAdminMode ? (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-xl font-bold text-slate-800">Edit Records</h4>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Admin Mode</span>
                      </div>
                      
                      <div className="space-y-8">
                        {draftInstallations.map((installation, installationIndex) => (
                          <div key={`installation-${installationIndex}`} className="relative bg-slate-50 rounded-2xl p-5 border border-slate-200">
                            <div className="absolute -top-3 -right-3">
                              <button
                                type="button"
                                onClick={() => handleRemoveInstallation(installationIndex)}
                                className="p-2 bg-white rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-colors"
                                title="Remove Client Info"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Client Name</label>
                                <input
                                  type="text"
                                  value={installation.clientName}
                                  onChange={(e) => handleInstallationFieldChange(installationIndex, "clientName", e.target.value)}
                                  className="w-full rounded-xl border-slate-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none border"
                                  placeholder="e.g. Acme Corp"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Opted Solution</label>
                                  <input
                                    type="text"
                                    value={installation.opted}
                                    onChange={(e) => handleInstallationFieldChange(installationIndex, "opted", e.target.value)}
                                    className="w-full rounded-xl border-slate-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none border"
                                    placeholder="e.g. Video Wall"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Quantity</label>
                                  <input
                                    type="text"
                                    value={installation.quantity}
                                    onChange={(e) => handleInstallationFieldChange(installationIndex, "quantity", e.target.value)}
                                    className="w-full rounded-xl border-slate-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none border"
                                    placeholder="e.g. 12 Units"
                                  />
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 block">Client Reviews</label>
                                <div className="space-y-3">
                                  {installation.reviews.map((review, reviewIndex) => (
                                    <div key={`review-${installationIndex}-${reviewIndex}`} className="flex gap-2">
                                      <textarea
                                        rows={2}
                                        value={review}
                                        onChange={(e) => handleReviewChange(installationIndex, reviewIndex, e.target.value)}
                                        className="flex-1 rounded-xl border-slate-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none border resize-none"
                                        placeholder="Enter client quote..."
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveReview(installationIndex, reviewIndex)}
                                        className="p-3 self-start bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => handleAddReview(installationIndex)}
                                    className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
                                  >
                                    <Plus className="w-4 h-4" /> Add Another Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-6">
                        <button
                          type="button"
                          onClick={handleAddInstallation}
                          className="flex-1 flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 font-bold hover:border-sky-400 hover:text-sky-600 transition-colors bg-slate-50 hover:bg-sky-50"
                        >
                          <Plus className="w-5 h-5" /> Add Client Block
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveDetails}
                          disabled={saving}
                          className="flex-1 flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70"
                        >
                          {saving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Save className="w-5 h-5" /> Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Public View: Horizontal Client Cards */
                    <LayoutGroup>
                      <motion.div layout className="space-y-8">
                        {/* 3-Column Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          <AnimatePresence>
                            {visiblePublicInstallations.map((installation, index) => (
                              <motion.div 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                key={`public-installation-${index}`} 
                                className="flex flex-col bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/30 group hover:border-sky-200 hover:-translate-y-1 transition-all"
                              >
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                  <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                                    <Building2 className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-extrabold text-slate-900 line-clamp-1" title={installation.clientName}>
                                      {installation.clientName || "Unnamed Client"}
                                    </h4>
                                    <span className="text-sm font-medium text-slate-500">Industry Leader</span>
                                  </div>
                                </div>

                                <div className="space-y-4 mb-6 flex-grow">
                                  <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                                    <Layers className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Solution Provided</p>
                                      <p className="text-sm font-semibold text-slate-800">{installation.opted || "N/A"}</p>
                                    </div>
                                  </div>
                                  <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                                    <Box className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Scale</p>
                                      <p className="text-sm font-semibold text-slate-800">{installation.quantity || "N/A"}</p>
                                    </div>
                                  </div>
                                </div>

                                {installation.reviews && installation.reviews.length > 0 && installation.reviews[0] !== "" && (
                                  <div className="mt-auto">
                                    {installation.reviews.slice(0, 1).map((review, reviewIndex) => (
                                      <div key={`public-review-${index}-${reviewIndex}`} className="relative bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-2xl p-5 border border-sky-100/50">
                                        <MessageSquareQuote className="absolute top-4 right-4 w-6 h-6 text-sky-200/50 rotate-12" />
                                        <p className="text-slate-700 font-medium italic relative z-10 text-sm leading-relaxed line-clamp-4">
                                          "{review}"
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {/* Show More / Show Less Toggle Centered */}
                        {publicInstallations.length > DEFAULT_VISIBLE_INSTALLATIONS && (
                          <motion.div layout className="flex justify-center pt-4">
                            <button
                              type="button"
                              onClick={() => setShowAllClientInfo((prev) => !prev)}
                              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 transition-all active:scale-95"
                            >
                              {showAllClientInfo ? (
                                <>Show Less Projects <ChevronDown className="w-4 h-4 rotate-180 transition-transform" /></>
                              ) : (
                                <>View All {publicInstallations.length} Projects <ChevronDown className="w-4 h-4 transition-transform" /></>
                              )}
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    </LayoutGroup>
                  )}
                </div>

                {/* ─── SECTION: BENTO INSTALLATION GALLERY ─── */}
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Installation Gallery</h3>
                    <p className="text-slate-500 text-lg">Visual proof of our state-of-the-art deployments in action.</p>
                  </div>
                  
                  {/* The Bento Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] gap-3 sm:gap-4 lg:gap-5">
                    {activeData?.images.map((img, i) => {
                      const spanClass = getBentoSpan(i);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer shadow-md bg-slate-200 ${spanClass}`}
                        >
                          <img
                            src={img}
                            alt={`${activeIndustry} deployment ${i + 1}`}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                            <motion.div 
                              initial={{ opacity: 0, y: 15 }}
                              whileHover={{ scale: 1.05 }}
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                            >
                              <span className="flex items-center gap-2 text-white text-sm font-semibold bg-white/20 backdrop-blur-md border border-white/40 px-5 py-2.5 rounded-full shadow-lg">
                                <ZoomIn className="w-4 h-4" /> Expand
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Call to Action Block */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden max-w-5xl mx-auto"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Ready to upgrade your {activeIndustry} space?
                      </h3>
                      <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
                        Join top tier clients and transform your environment with our cutting-edge digital signage solutions.
                      </p>
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500 text-white font-bold text-lg shadow-lg shadow-sky-500/30 hover:bg-sky-400 hover:shadow-sky-400/40 hover:-translate-y-1 transition-all"
                      >
                        Get a Free Consultation <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}