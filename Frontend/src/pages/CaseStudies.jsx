import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "animate.css";
import { adminFetch } from "../utils/adminAuth";
import { API_BASE_URL } from "../config/api";

const defaultCompletedCampaigns = [
  {
    company: "RetailMax India",
    duration: "3 Months",
    locations: "Pune, Mumbai, Bengaluru (24 screens)",
    stat: "+45%",
    statLabel: "Brand Recall",
    review: "Brand recall increased significantly within the first campaign cycle.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    company: "Spice Garden Chain",
    duration: "6 Months",
    locations: "Delhi NCR, Hyderabad, Chennai (18 screens)",
    stat: "2.5x",
    statLabel: "Footfall Increase",
    review: "Footfall and weekend conversions improved after switching to A2K's network.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    company: "UrbanFit Wellness",
    duration: "2 Months",
    locations: "Pune, Thane, Nagpur (12 screens)",
    stat: "85%",
    statLabel: "Target Audience Reach",
    review: "Hyper-local campaign execution was smooth and highly targeted.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const defaultOngoingCampaigns = [
  {
    company: "TechVista Electronics",
    duration: "Started Jan 2026",
    locations: "Bengaluru IT parks & premium malls",
    stat: "1.2M+",
    statLabel: "Impressions/Week",
    review: "Weekly performance reports help us optimize creatives quickly.",
  },
  {
    company: "FreshKart Grocers",
    duration: "Started Feb 2026",
    locations: "Tier-1 high-street retail clusters",
    stat: "Top 3",
    statLabel: "Visibility Zones",
    review: "Campaign visibility across key zones has been excellent.",
  },
];

const gradientOptions = [
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-cyan-500",
  "from-orange-500 to-rose-500",
];

const createEmptyCompleted = () => ({
  company: "",
  duration: "",
  locations: "",
  stat: "",
  statLabel: "",
  review: "",
  gradient: gradientOptions[0],
});

const createEmptyOngoing = () => ({
  company: "",
  duration: "",
  locations: "",
  stat: "",
  statLabel: "",
  review: "",
});

const hasCampaignContent = (campaign) =>
  campaign.company || campaign.duration || campaign.locations || campaign.stat || campaign.statLabel || campaign.review;

export default function CaseStudies({ isAdminMode = false }) {
  const [contentOverrides, setContentOverrides] = useState(null);
  const [loadingOverrides, setLoadingOverrides] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draftCompleted, setDraftCompleted] = useState(defaultCompletedCampaigns);
  const [draftOngoing, setDraftOngoing] = useState(defaultOngoingCampaigns);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadOverrides = async () => {
      setLoadingOverrides(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/campaign-content`);
        if (!response.ok) {
          throw new Error("Failed to load campaign content");
        }
        const data = await response.json();
        setContentOverrides(data);
      } catch (error) {
        console.error(error.message || error);
      } finally {
        setLoadingOverrides(false);
      }
    };

    loadOverrides();
  }, []);

  const completedCampaigns = useMemo(() => {
    const saved = Array.isArray(contentOverrides?.completedCampaigns)
      ? contentOverrides.completedCampaigns.filter(hasCampaignContent)
      : [];
    return saved.length > 0 ? saved : defaultCompletedCampaigns;
  }, [contentOverrides]);

  const ongoingCampaigns = useMemo(() => {
    const saved = Array.isArray(contentOverrides?.ongoingCampaigns)
      ? contentOverrides.ongoingCampaigns.filter(hasCampaignContent)
      : [];
    return saved.length > 0 ? saved : defaultOngoingCampaigns;
  }, [contentOverrides]);

  useEffect(() => {
    if (!isAdminMode) {
      return;
    }

    setDraftCompleted(completedCampaigns);
    setDraftOngoing(ongoingCampaigns);
  }, [completedCampaigns, ongoingCampaigns, isAdminMode]);

  const updateCompletedField = (index, field, value) => {
    setDraftCompleted((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );
  };

  const updateOngoingField = (index, field, value) => {
    setDraftOngoing((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
    );
  };

  const saveCampaignContent = async () => {
    setSaving(true);
    try {
      const payload = {
        completedCampaigns: draftCompleted.filter(hasCampaignContent),
        ongoingCampaigns: draftOngoing.filter(hasCampaignContent),
      };

      const response = await adminFetch(`${API_BASE_URL}/api/campaign-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save campaign content");
      }

      const saved = await response.json();
      setContentOverrides(saved);
      toast.success("Campaign content saved.");
    } catch (error) {
      toast.error(error.message || "Failed to save campaign content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 overflow-hidden py-24 selection:bg-sky-200 selection:text-sky-900">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/25 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 shadow-sm mb-8 animate__animated animate__fadeInDown">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-sky-700">
              A2K Screens Network
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6 animate__animated animate__fadeInUp">
            Campaign <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
              Success Stories
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
            Discover how leading brands leverage our hyper-local digital displays to drive measurable outcomes and dominate their target zones.
          </p>
          {loadingOverrides && (
            <p className="mt-4 text-sm text-slate-500">Loading latest campaign content...</p>
          )}
        </div>

        {isAdminMode && (
          <div className="mb-16 rounded-2xl border border-sky-200 bg-white p-6 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-900">Admin Edit Campaign Content</h2>
              <button
                type="button"
                onClick={saveCampaignContent}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Campaign Content"}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">Proven Results Cards</h3>
                <button
                  type="button"
                  onClick={() => setDraftCompleted((prev) => [...prev, createEmptyCompleted()])}
                  className="px-3 py-1.5 rounded-lg border border-sky-300 text-sky-700 text-xs bg-sky-50"
                >
                  Add Card
                </button>
              </div>
              {draftCompleted.map((campaign, index) => (
                <div key={`completed-editor-${index}`} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-semibold text-slate-700">Card {index + 1}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftCompleted((prev) => {
                          const next = prev.filter((_, itemIndex) => itemIndex !== index);
                          return next.length > 0 ? next : [createEmptyCompleted()];
                        })
                      }
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs bg-white"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input type="text" value={campaign.company} onChange={(e) => updateCompletedField(index, "company", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Company" />
                    <input type="text" value={campaign.duration} onChange={(e) => updateCompletedField(index, "duration", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Duration" />
                    <input type="text" value={campaign.locations} onChange={(e) => updateCompletedField(index, "locations", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Locations" />
                    <input type="text" value={campaign.stat} onChange={(e) => updateCompletedField(index, "stat", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Stat Value" />
                    <input type="text" value={campaign.statLabel} onChange={(e) => updateCompletedField(index, "statLabel", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Stat Label" />
                    <select value={campaign.gradient} onChange={(e) => updateCompletedField(index, "gradient", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2">
                      {gradientOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <textarea rows={3} value={campaign.review} onChange={(e) => updateCompletedField(index, "review", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Client Review" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">Currently Live Cards</h3>
                <button
                  type="button"
                  onClick={() => setDraftOngoing((prev) => [...prev, createEmptyOngoing()])}
                  className="px-3 py-1.5 rounded-lg border border-sky-300 text-sky-700 text-xs bg-sky-50"
                >
                  Add Card
                </button>
              </div>
              {draftOngoing.map((campaign, index) => (
                <div key={`ongoing-editor-${index}`} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-semibold text-slate-700">Card {index + 1}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setDraftOngoing((prev) => {
                          const next = prev.filter((_, itemIndex) => itemIndex !== index);
                          return next.length > 0 ? next : [createEmptyOngoing()];
                        })
                      }
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs bg-white"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input type="text" value={campaign.company} onChange={(e) => updateOngoingField(index, "company", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Company" />
                    <input type="text" value={campaign.duration} onChange={(e) => updateOngoingField(index, "duration", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Duration" />
                    <input type="text" value={campaign.locations} onChange={(e) => updateOngoingField(index, "locations", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Targeting / Locations" />
                    <input type="text" value={campaign.stat} onChange={(e) => updateOngoingField(index, "stat", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Stat Value" />
                    <input type="text" value={campaign.statLabel} onChange={(e) => updateOngoingField(index, "statLabel", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Stat Label" />
                    <textarea rows={3} value={campaign.review} onChange={(e) => updateOngoingField(index, "review", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Client Review" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-slate-900">Proven Results</h2>
            <div className="h-[1px] bg-gradient-to-r from-sky-300 to-transparent flex-grow"></div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {completedCampaigns.map((campaign, index) => (
              <article
                key={`${campaign.company}-${index}`}
                className="group relative rounded-3xl bg-white/90 backdrop-blur-xl border border-sky-100 hover:border-sky-300 p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${campaign.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>

                <div className="mb-8">
                  <h4 className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${campaign.gradient}`}>
                    {campaign.stat}
                  </h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">{campaign.statLabel}</p>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">{campaign.company}</h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{campaign.duration}</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{campaign.locations}</span>
                  </div>
                </div>

                <div className="relative bg-sky-50 rounded-2xl p-4 border border-sky-100">
                  <svg className="absolute top-2 left-2 w-6 h-6 text-sky-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm text-slate-600 italic relative z-10 pl-6 pr-2">"{campaign.review}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-10 animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-slate-900">Currently Live</h2>
            <div className="h-[1px] bg-gradient-to-r from-emerald-300 to-transparent flex-grow"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {ongoingCampaigns.map((campaign, index) => (
              <article
                key={`${campaign.company}-${index}`}
                className="group relative bg-white/90 backdrop-blur-xl border border-emerald-100 hover:border-emerald-300 rounded-3xl p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate__animated animate__fadeInUp overflow-hidden"
                style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-3xl group-hover:bg-emerald-300/30 transition-colors duration-500"></div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">{campaign.company}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-400 tracking-wider">LIVE NOW</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Targeting</p>
                    <p className="text-slate-700 font-medium">{campaign.locations}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Current Metric ({campaign.statLabel})</p>
                    <p className="text-emerald-400 font-bold text-xl">{campaign.stat}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border-l-2 border-emerald-400">
                  <p className="text-sm text-emerald-900/80 italic">"{campaign.review}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center pb-10 animate__animated animate__fadeInUp animate__delay-1s">
          <a
            href="/start-advertising#network"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_10px_35px_rgba(14,165,233,0.3)] hover:shadow-[0_20px_55px_rgba(14,165,233,0.35)]"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative z-10 text-lg">Launch Your Campaign</span>
            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
