import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "../utils/adminAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const STATUS_LABELS = { new: "New", contacted: "Contacted", closed: "Closed" };
const STATUS_COLORS = {
  new: "bg-sky-100 text-sky-700 border-sky-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const CONTACT_TYPE_LABELS = { business: "Business Enquiry", consultation: "Consultation", careers: "Careers" };
const CONTACT_TYPE_COLORS = {
  business: "bg-blue-100 text-blue-700 border-blue-200",
  consultation: "bg-violet-100 text-violet-700 border-violet-200",
  careers: "bg-orange-100 text-orange-700 border-orange-200",
};
const CONTACT_STATUS_LABELS = { new: "New", read: "Read", replied: "Replied" };
const CONTACT_STATUS_COLORS = {
  new: "bg-sky-100 text-sky-700 border-sky-200",
  read: "bg-slate-100 text-slate-600 border-slate-200",
  replied: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const createEmptyArea = () => ({
  city: "",
  screens: "",
  locationsText: "",
});

const createEmptyForm = () => ({
  name: "",
  screens: "",
  areas: [createEmptyArea()],
});

const mapStateToForm = (stateItem) => ({
  name: stateItem.name || "",
  screens: String(stateItem.screens ?? ""),
  areas:
    Array.isArray(stateItem.areas) && stateItem.areas.length > 0
      ? stateItem.areas.map((area) => ({
          city: area.city || "",
          screens: String(area.screens ?? ""),
          locationsText: Array.isArray(area.locations) ? area.locations.join(", ") : "",
        }))
      : [createEmptyArea()],
});

const buildPayload = (formData) => ({
  name: formData.name.trim(),
  screens: Number(formData.screens),
  areas: formData.areas
    .map((area) => ({
      city: area.city.trim(),
      screens: Number(area.screens),
      locations: area.locationsText
        .split(",")
        .map((loc) => loc.trim())
        .filter(Boolean),
    }))
    .filter((area) => area.city),
});

export default function AdminNetworkPanel() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [selectedStateId, setSelectedStateId] = useState(null);
  const [formData, setFormData] = useState(createEmptyForm());
  const [submitting, setSubmitting] = useState(false);

  const selectedState = useMemo(
    () => states.find((stateItem) => stateItem._id === selectedStateId) || null,
    [states, selectedStateId]
  );

  const loadStates = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/api/network/states`);
      if (!response.ok) {
        throw new Error("Failed to load states");
      }
      const data = await response.json();
      setStates(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to fetch states");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  const resetForm = () => {
    setSelectedStateId(null);
    setFormData(createEmptyForm());
    setMessage("");
  };

  const onEditClick = (stateItem) => {
    setSelectedStateId(stateItem._id);
    setFormData(mapStateToForm(stateItem));
    setMessage("");
  };

  const onDeleteClick = async (stateId) => {
    const confirmDelete = window.confirm("Delete this state and all cities?");
    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");
      const response = await adminFetch(`${API_BASE_URL}/api/network/states/${stateId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Delete failed");
      }

      setMessage("State deleted successfully.");
      if (selectedStateId === stateId) {
        resetForm();
      }
      await loadStates();
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete state");
    }
  };

  const updateFormField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAreaField = (index, field, value) => {
    setFormData((prev) => {
      const nextAreas = [...prev.areas];
      nextAreas[index] = { ...nextAreas[index], [field]: value };
      return { ...prev, areas: nextAreas };
    });
  };

  const addAreaRow = () => {
    setFormData((prev) => ({
      ...prev,
      areas: [...prev.areas, createEmptyArea()],
    }));
  };

  const removeAreaRow = (index) => {
    setFormData((prev) => {
      if (prev.areas.length === 1) {
        return prev;
      }
      const nextAreas = prev.areas.filter((_, areaIndex) => areaIndex !== index);
      return { ...prev, areas: nextAreas };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const payload = buildPayload(formData);

      if (!payload.name || Number.isNaN(payload.screens)) {
        throw new Error("State name and total screens are required.");
      }

      if (payload.areas.some((area) => Number.isNaN(area.screens))) {
        throw new Error("Each city row must have valid screen count.");
      }

      const isEditMode = Boolean(selectedStateId);
      const url = isEditMode
        ? `${API_BASE_URL}/api/network/states/${selectedStateId}`
        : `${API_BASE_URL}/api/network/states`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await adminFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Save failed");
      }

      setMessage(isEditMode ? "State updated successfully." : "State created successfully.");
      resetForm();
      await loadStates();
    } catch (submitError) {
      setError(submitError.message || "Unable to save state");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Enquiries ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("network"); // "network" | "enquiries"
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquiriesError, setEnquiriesError] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [expandedEnquiry, setExpandedEnquiry] = useState(null);

  const loadEnquiries = async () => {
    setEnquiriesLoading(true);
    setEnquiriesError("");
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/enquiries`);
      if (!res.ok) throw new Error("Failed to load enquiries");
      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      setEnquiriesError(err.message || "Unable to fetch enquiries");
    } finally {
      setEnquiriesLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "enquiries" && enquiries.length === 0) {
      loadEnquiries();
    }
    if (tab === "contact" && contactSubmissions.length === 0) {
      loadContactSubmissions();
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/enquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (expandedEnquiry === id) setExpandedEnquiry(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const enquiryStateNames = useMemo(() => {
    const names = [...new Set(enquiries.map((e) => e.stateName))].sort();
    return names;
  }, [enquiries]);

  const enquiryCityNames = useMemo(() => {
    const source = stateFilter === "all" ? enquiries : enquiries.filter((e) => e.stateName === stateFilter);
    const names = [...new Set(source.map((e) => e.cityName).filter(Boolean))].sort();
    return names;
  }, [enquiries, stateFilter]);

  const filteredEnquiries = useMemo(() => {
    let result = enquiries;
    if (stateFilter !== "all") result = result.filter((e) => e.stateName === stateFilter);
    if (cityFilter !== "all") result = result.filter((e) => e.cityName === cityFilter);
    return result;
  }, [enquiries, stateFilter, cityFilter]);

  // Grouped: state → city → enquiries (sorted state asc, city asc, date desc)
  const enquiriesByStateCity = useMemo(() => {
    const stateMap = {};
    filteredEnquiries.forEach((e) => {
      if (!stateMap[e.stateName]) stateMap[e.stateName] = {};
      const cityKey = e.cityName || "(No City)";
      if (!stateMap[e.stateName][cityKey]) stateMap[e.stateName][cityKey] = [];
      stateMap[e.stateName][cityKey].push(e);
    });
    // Sort states alphabetically, cities alphabetically within each state
    const sorted = {};
    Object.keys(stateMap).sort().forEach((state) => {
      sorted[state] = {};
      Object.keys(stateMap[state]).sort((a, b) => {
        if (a === "(No City)") return 1;
        if (b === "(No City)") return -1;
        return a.localeCompare(b);
      }).forEach((city) => {
        sorted[state][city] = stateMap[state][city];
      });
    });
    return sorted;
  }, [filteredEnquiries]);

  const enquiriesByState = useMemo(() => {
    const map = {};
    filteredEnquiries.forEach((e) => {
      if (!map[e.stateName]) map[e.stateName] = [];
      map[e.stateName].push(e);
    });
    return map;
  }, [filteredEnquiries]);

  // ── Contact Submissions ─────────────────────────────────────────────────────
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactTypeFilter, setContactTypeFilter] = useState("all");
  const [expandedContact, setExpandedContact] = useState(null);

  const loadContactSubmissions = async () => {
    setContactLoading(true);
    setContactError("");
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/contact`);
      if (!res.ok) throw new Error("Failed to load contact submissions");
      const data = await res.json();
      setContactSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setContactError(err.message || "Unable to fetch contact submissions");
    } finally {
      setContactLoading(false);
    }
  };

  const handleContactStatusChange = async (id, newStatus) => {
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/contact/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");
      setContactSubmissions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    try {
      const res = await adminFetch(`${API_BASE_URL}/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setContactSubmissions((prev) => prev.filter((s) => s._id !== id));
      if (expandedContact === id) setExpandedContact(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredContactSubmissions = useMemo(() => {
    if (contactTypeFilter === "all") return contactSubmissions;
    return contactSubmissions.filter((s) => s.type === contactTypeFilter);
  }, [contactSubmissions, contactTypeFilter]);

  return (
    <main className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Network Admin Panel</h1>
          <p className="text-slate-600 mt-2">Manage states, screen counts, city coverage, advertising enquiries, and contact submissions.</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            type="button"
            onClick={() => handleTabChange("network")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
              activeTab === "network"
                ? "border-sky-500 text-sky-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Network Management
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("enquiries")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
              activeTab === "enquiries"
                ? "border-sky-500 text-sky-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Enquiries / Leads
            {enquiries.filter((e) => e.status === "new").length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-sky-500 text-white rounded-full">
                {enquiries.filter((e) => e.status === "new").length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("contact")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
              activeTab === "contact"
                ? "border-sky-500 text-sky-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Contact Submissions
            {contactSubmissions.filter((s) => s.status === "new").length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-sky-500 text-white rounded-full">
                {contactSubmissions.filter((s) => s.status === "new").length}
              </span>
            )}
          </button>
        </div>

        {/* Network Management Tab */}
        {activeTab === "network" && (
        <div className="grid lg:grid-cols-5 gap-6">
          <section className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">States</h2>
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:border-sky-300 hover:bg-sky-50"
              >
                + New State
              </button>
            </div>

            {loading ? (
              <p className="text-slate-500 text-sm">Loading states...</p>
            ) : states.length === 0 ? (
              <p className="text-slate-500 text-sm">No states found yet. Create your first state.</p>
            ) : (
              <div className="space-y-3 max-h-[640px] overflow-auto pr-1">
                {states.map((stateItem) => (
                  <div
                    key={stateItem._id}
                    className={`rounded-xl border p-4 transition ${
                      selectedStateId === stateItem._id
                        ? "border-sky-400 bg-sky-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onEditClick(stateItem)}
                        className="text-left flex-1"
                      >
                        <h3 className="font-semibold text-slate-900">{stateItem.name}</h3>
                        <p className="text-sm text-slate-600 mt-0.5">{stateItem.screens} screens</p>
                        <p className="text-xs text-slate-500 mt-1">{stateItem.areas?.length || 0} cities</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(stateItem._id)}
                        className="text-xs px-2 py-1 rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              {selectedState ? `Edit: ${selectedState.name}` : "Create New State"}
            </h2>

            {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}
            {message && <p className="mb-4 text-sm text-emerald-600">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="text-sm text-slate-700">
                  State Name
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateFormField("name", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="Maharashtra"
                    required
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Total Screens
                  <input
                    type="number"
                    min="0"
                    value={formData.screens}
                    onChange={(event) => updateFormField("screens", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="320"
                    required
                  />
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Cities</h3>
                  <button
                    type="button"
                    onClick={addAreaRow}
                    className="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:border-sky-300 hover:bg-sky-50"
                  >
                    + Add City
                  </button>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                  {formData.areas.map((area, index) => (
                    <div key={`area-${index}`} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <div className="grid md:grid-cols-12 gap-3">
                        <input
                          type="text"
                          value={area.city}
                          onChange={(event) => updateAreaField(index, "city", event.target.value)}
                          className="md:col-span-4 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          placeholder="City name"
                        />
                        <input
                          type="number"
                          min="0"
                          value={area.screens}
                          onChange={(event) => updateAreaField(index, "screens", event.target.value)}
                          className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          placeholder="Screens"
                        />
                        <input
                          type="text"
                          value={area.locationsText}
                          onChange={(event) => updateAreaField(index, "locationsText", event.target.value)}
                          className="md:col-span-5 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          placeholder="Locations comma separated"
                        />
                        <button
                          type="button"
                          onClick={() => removeAreaRow(index)}
                          className="md:col-span-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 px-2 py-2"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 disabled:opacity-60"
                >
                  {submitting ? "Saving..." : selectedState ? "Update State" : "Create State"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100"
                >
                  Clear
                </button>
              </div>
            </form>
          </section>
        </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-slate-600 font-medium">Filter by State:</label>
                <select
                  value={stateFilter}
                  onChange={(e) => { setStateFilter(e.target.value); setCityFilter("all"); }}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="all">All States ({enquiries.length})</option>
                  {enquiryStateNames.map((name) => (
                    <option key={name} value={name}>
                      {name} ({enquiries.filter((e) => e.stateName === name).length})
                    </option>
                  ))}
                </select>

                {enquiryCityNames.length > 0 && (
                  <>
                    <label className="text-sm text-slate-600 font-medium">City:</label>
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="all">All Cities</option>
                      {enquiryCityNames.map((city) => (
                        <option key={city} value={city}>
                          {city} ({enquiries.filter((e) => e.cityName === city && (stateFilter === "all" || e.stateName === stateFilter)).length})
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={loadEnquiries}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                Refresh
              </button>
            </div>

            {enquiriesLoading && <p className="text-slate-500 text-sm">Loading enquiries...</p>}
            {enquiriesError && <p className="text-rose-600 text-sm">{enquiriesError}</p>}

            {!enquiriesLoading && !enquiriesError && filteredEnquiries.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <p className="text-slate-500">No enquiries found yet. They will appear here after users submit the quote form.</p>
              </div>
            )}

            {/* Grouped by State → City */}
            {Object.entries(enquiriesByStateCity).map(([state, citiesMap]) => (
              <div key={state} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-bold text-slate-900">{state}</h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-sky-100 text-sky-700 rounded-full">
                    {Object.values(citiesMap).reduce((acc, leads) => acc + leads.length, 0)} enquir{Object.values(citiesMap).reduce((acc, leads) => acc + leads.length, 0) === 1 ? "y" : "ies"}
                  </span>
                </div>

                {Object.entries(citiesMap).map(([city, leads]) => (
                  <div key={city} className="mb-5">
                    {city !== "(No City)" && (
                      <div className="flex items-center gap-2 mb-2 ml-1">
                        <span className="text-sm font-semibold text-sky-700">{city}</span>
                        <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                          {leads.length} lead{leads.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {leads.map((enq) => (
                    <div
                      key={enq._id}
                      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                    >
                      {/* Row summary */}
                      <div className="flex flex-wrap items-center gap-3 p-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-slate-900 truncate">{enq.companyName}</p>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${STATUS_COLORS[enq.status]}`}>
                              {STATUS_LABELS[enq.status]}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {enq.contactPerson} &middot; {enq.email} &middot; {enq.phone}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {enq.industry} &middot; {enq.budget} &middot; {new Date(enq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                            className="text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => setExpandedEnquiry(expandedEnquiry === enq._id ? null : enq._id)}
                            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 hover:bg-slate-50"
                          >
                            {expandedEnquiry === enq._id ? "Hide" : "Details"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(enq._id)}
                            className="px-3 py-1.5 text-xs rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {expandedEnquiry === enq._id && (
                        <div className="border-t border-slate-100 bg-slate-50 p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Company</p>
                            <p className="text-slate-800">{enq.companyName}</p>
                            {enq.industry && <p className="text-slate-500">{enq.industry}</p>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Region</p>
                            <p className="text-slate-800">{enq.cityName ? `${enq.cityName}, ` : ""}{enq.stateName}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Contact</p>
                            <p className="text-slate-800">{enq.contactPerson}{enq.designation ? ` — ${enq.designation}` : ""}</p>
                            <p className="text-slate-500">{enq.email}</p>
                            <p className="text-slate-500">{enq.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Campaign</p>
                            <p className="text-slate-800">{enq.screenType}</p>
                            <p className="text-slate-500">{enq.duration}</p>
                            <p className="text-slate-500">{enq.budget}</p>
                          </div>
                          {enq.locations && (
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Preferred Locations</p>
                              <p className="text-slate-800">{enq.locations}</p>
                            </div>
                          )}
                          {enq.message && (
                            <div className="sm:col-span-2">
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Message</p>
                              <p className="text-slate-800 whitespace-pre-wrap">{enq.message}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Contact Submissions Tab */}
        {activeTab === "contact" && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3 flex-wrap">
                <label className="text-sm text-slate-600 font-medium">Filter by Type:</label>
                {["all", "business", "consultation", "careers"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setContactTypeFilter(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      contactTypeFilter === t
                        ? "bg-sky-600 text-white border-sky-600"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t === "all" ? `All (${contactSubmissions.length})` : `${CONTACT_TYPE_LABELS[t]} (${contactSubmissions.filter((s) => s.type === t).length})`}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={loadContactSubmissions}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
              >
                Refresh
              </button>
            </div>

            {contactLoading && <p className="text-slate-500 text-sm">Loading submissions...</p>}
            {contactError && <p className="text-rose-600 text-sm">{contactError}</p>}

            {!contactLoading && !contactError && filteredContactSubmissions.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <p className="text-slate-500">No contact submissions yet. They will appear here after users fill the Contact page form.</p>
              </div>
            )}

            <div className="space-y-3">
              {filteredContactSubmissions.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Row summary */}
                  <div className="flex flex-wrap items-center gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-slate-900 truncate">{sub.fullName}</p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${CONTACT_TYPE_COLORS[sub.type]}`}>
                          {CONTACT_TYPE_LABELS[sub.type]}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${CONTACT_STATUS_COLORS[sub.status]}`}>
                          {CONTACT_STATUS_LABELS[sub.status]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{sub.email} &middot; {sub.phone}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={sub.status}
                        onChange={(e) => handleContactStatusChange(sub._id, e.target.value)}
                        className="text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => setExpandedContact(expandedContact === sub._id ? null : sub._id)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 hover:bg-slate-50"
                      >
                        {expandedContact === sub._id ? "Hide" : "Details"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(sub._id)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandedContact === sub._id && (
                    <div className="border-t border-slate-100 bg-slate-50 p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Contact</p>
                        <p className="text-slate-800">{sub.fullName}</p>
                        <p className="text-slate-500">{sub.email}</p>
                        <p className="text-slate-500">{sub.phone}</p>
                      </div>
                      {sub.type !== "careers" && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Product Interest</p>
                          <p className="text-slate-800">{sub.productOfInterest || "—"}</p>
                        </div>
                      )}
                      {sub.type === "careers" && sub.portfolioUrl && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Portfolio / LinkedIn</p>
                          <a href={sub.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline break-all">{sub.portfolioUrl}</a>
                        </div>
                      )}
                      {(sub.projectRequirements || sub.coverLetter) && (
                        <div className="sm:col-span-2">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            {sub.type === "careers" ? "Cover Letter" : "Project Requirements"}
                          </p>
                          <p className="text-slate-800 whitespace-pre-wrap">{sub.projectRequirements || sub.coverLetter}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
