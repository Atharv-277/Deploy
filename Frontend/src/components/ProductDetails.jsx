import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { adminFetch } from "../utils/adminAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const defaultFeatures = [
  "Cloud Remote Management",
  "Wi-Fi Available",
  'Available in 24" - 86"',
  "High range of Contrast & Brightness",
  "Retrofit Touch Capacity",
  "Can be used in both Landscape & Portrait",
  "Low Power Consumption",
  "IP54 (Optional)",
];

const defaultBenefitsHeading = "Features & Benefits";

const defaultBenefits = [
  {
    icon: "display",
    title: "Customizable Sizes & Designs",
    description:
      "Tailor-made solutions to fit any space be it small indoor areas or expansive outdoor settings. Sleek and modern designs that blend seamlessly with your environment.",
  },
  {
    icon: "eye",
    title: "Vibrant Visuals",
    description:
      "High-resolution displays with stunning color accuracy that captivate attention instantly. Perfect for promotional content, advertising, or creating immersive experiences.",
  },
  {
    icon: "star",
    title: "Energy Efficient",
    description:
      "Advanced technology ensures low power consumption without compromising on brightness or performance. A sustainable choice for businesses looking to reduce operational costs.",
  },
  {
    icon: "shield",
    title: "Durability & Reliability",
    description:
      "Designed to withstand frequent handling, transportation, and long hours of operation. Scratch-resistant screens and sturdy frames ensure longevity.",
  },
];

const buildBenefitsDraft = (savedBenefits = []) =>
  defaultBenefits.map((defaultItem, index) => {
    const saved = savedBenefits[index] || {};
    return {
      icon: defaultItem.icon,
      title: saved.title || defaultItem.title,
      description: saved.description || defaultItem.description,
    };
  });

const lineupTemplate = [
  { title: "Digital Standee", subtitle: '43" DIGITAL STANDEE TOUCH/NON TOUCH' },
  { title: "Digital Standee", subtitle: '43" BATTERY POWERED DIGITAL STANDEE' },
  { title: "Designer Digital Standee", subtitle: '49" DESIGNER DIGITAL STANDEE NON TOUCH' },
  { title: "Digital Standee", subtitle: '49" DIGITAL STANDEE NON TOUCH' },
  { title: "Digital Standee", subtitle: '55" DIGITAL STANDEE TOUCH' },
];

const buildDefaultLineup = (lineupItems = []) =>
  lineupTemplate.map((card, index) => ({
    title: card.title,
    subtitle: card.subtitle,
    image: `/lineup/lineup-${index + 1}.png`,
    fallbackImage: lineupItems[index]?.image || "/products/kiosk/digital-standee.svg",
    sourceName: lineupItems[index]?.name || card.title,
  }));

export default function ProductDetails({
  section,
  product,
  title,
  heroImage,
  lineupItems = [],
  onSelectLineupItem,
  isAdmin = false,
  onProductContentSaved,
}) {
  const [showFeatures, setShowFeatures] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showLineupEditor, setShowLineupEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [uploadingLineupIndex, setUploadingLineupIndex] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const defaultLineup = useMemo(() => buildDefaultLineup(lineupItems), [lineupItems]);

  const createDraft = () => ({
    cardImage: product?.image || "",
    heroImage: heroImage || product?.image || "",
    lineupItems:
      Array.isArray(product?.lineupItems) && product.lineupItems.length > 0
        ? defaultLineup.map((baseItem, index) => {
            const savedItem = product.lineupItems[index] || {};
            return {
              ...baseItem,
              title: savedItem.title || baseItem.title,
              subtitle: savedItem.subtitle || baseItem.subtitle,
              image: savedItem.image || baseItem.image,
            };
          })
        : defaultLineup,
    featuresText: (product?.features || defaultFeatures).join("\n"),
    description:
      product?.description ||
      `Our ${title} offers cutting-edge technology combined with sleek design to deliver exceptional performance for commercial applications. Perfect for retail, corporate, and hospitality environments.`,
    brochureUrl: product?.brochureUrl || "",
    youtubeUrl: product?.youtubeUrl || "",
    benefitsHeading: product?.benefitsHeading || defaultBenefitsHeading,
    benefitsItems: buildBenefitsDraft(Array.isArray(product?.benefits) ? product.benefits : []),
  });

  const [draft, setDraft] = useState(createDraft);

  useEffect(() => {
    setDraft(createDraft());
    setSaveMessage("");
    setSaveError("");
    setShowLineupEditor(false);
  }, [product, heroImage, title, defaultLineup]);

  const actionBtnBase =
    "w-full sm:w-auto px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide shadow-sm hover:shadow-lg hover:-translate-y-0.5";
  const whatsappPhoneNumber = "8668223495";
  const enquiryMessage = encodeURIComponent(
    `Hi, I am interested in ${title}${section ? ` (${section})` : ""}. Please share details.`
  );
  const whatsappEnquiryLink = `https://wa.me/${whatsappPhoneNumber}?text=${enquiryMessage}`;

  const renderBenefitIcon = (icon) => {
    if (icon === "display") {
      return (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );
    }

    if (icon === "eye") {
      return (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    }

    if (icon === "star") {
      return (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.8 5.67 6.25.9-4.52 4.4 1.07 6.22L12 16.8 6.4 19.7l1.07-6.22-4.52-4.4 6.25-.9L12 2.5z" />
        </svg>
      );
    }

    return (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" />
      </svg>
    );
  };

  const uploadAsset = async (file, endpoint) => {
    const fd = new FormData();
    fd.append("file", file);

    const response = await adminFetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: fd,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Upload failed");
    }

    const data = await response.json();
    return data.url || "";
  };

  const handleImageUpload = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (type === "hero") {
        setUploadingHero(true);
      } else {
        setUploadingCard(true);
      }
      setSaveError("");
      const url = await uploadAsset(file, "/api/product-content/upload-image");
      setDraft((prev) => ({
        ...prev,
        [type === "hero" ? "heroImage" : "cardImage"]: url,
      }));
      toast.success("Image uploaded successfully.");
    } catch (error) {
      const message = error.message || "Upload failed";
      setSaveError(message);
      toast.error(message);
    } finally {
      if (type === "hero") {
        setUploadingHero(false);
      } else {
        setUploadingCard(false);
      }
    }
  };

  const handleLineupImageUpload = async (event, index) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLineupIndex(index);
      setSaveError("");
      const url = await uploadAsset(file, "/api/product-content/upload-image");
      setDraft((prev) => ({
        ...prev,
        lineupItems: prev.lineupItems.map((item, itemIndex) =>
          itemIndex === index ? { ...item, image: url } : item
        ),
      }));
      toast.success("Lineup image uploaded successfully.");
    } catch (error) {
      const message = error.message || "Upload failed";
      setSaveError(message);
      toast.error(message);
    } finally {
      setUploadingLineupIndex(null);
    }
  };

  const handleBrochureUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBrochure(true);
      setSaveError("");
      const url = await uploadAsset(file, "/api/product-content/upload-brochure");
      setDraft((prev) => ({ ...prev, brochureUrl: url }));
      toast.success("Brochure uploaded successfully.");
    } catch (error) {
      const message = error.message || "Upload failed";
      setSaveError(message);
      toast.error(message);
    } finally {
      setUploadingBrochure(false);
    }
  };

  const handleLineupFieldChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      lineupItems: prev.lineupItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSave = async () => {
    if (!section || !title) {
      setSaveError("Missing product context.");
      toast.error("Failed to save product content.");
      return;
    }

    setSaving(true);
    setSaveMessage("");
    setSaveError("");
    try {
      const payload = {
        section,
        name: title,
        cardImage: draft.cardImage,
        heroImage: draft.heroImage,
        lineupItems: draft.lineupItems.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
        })),
        features: draft.featuresText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        description: draft.description,
        brochureUrl: draft.brochureUrl,
        youtubeUrl: draft.youtubeUrl,
        benefitsHeading: (draft.benefitsHeading || "").trim(),
        benefits: draft.benefitsItems.map((item) => ({
          title: String(item.title || "").trim(),
          description: String(item.description || "").trim(),
        })),
      };

      const response = await adminFetch(`${API_BASE_URL}/api/product-content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Save failed");
      }

      const saved = await response.json();
      setSaveMessage("Saved successfully.");
      toast.success("Product content saved successfully.");
      if (onProductContentSaved) {
        onProductContentSaved(saved);
      }
    } catch (error) {
      const message = error.message || "Unable to save product content.";
      setSaveError(message);
      toast.error(`Failed to save product content. ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const displayFeatures = draft.featuresText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const currentHero = draft.heroImage || heroImage || "/product-image-placeholder.jpg";
  const exploreLineup = draft.lineupItems;
  const displayBenefits = defaultBenefits.map((item, index) => {
    const edited = draft.benefitsItems[index] || {};
    return {
      icon: item.icon,
      title: edited.title || item.title,
      description: edited.description || item.description,
    };
  });

  return (
    <div className="mt-12 transition-all duration-500">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-[500px] flex items-center justify-center relative overflow-hidden">
            <img
              src={currentHero}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
              <div className="text-center">
                <div className="text-6xl mb-4">Display</div>
                <span className="text-gray-500 font-medium">{title}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2 uppercase tracking-tight">{title}</h2>
            <p className="text-gray-600 mb-6">A2K Screens</p>

            {isAdmin && (
              <div className="mb-6 p-4 border border-sky-200 bg-sky-50 rounded-xl space-y-3">
                <p className="text-sm font-semibold text-sky-800">Admin Edit Mode</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <label className="text-xs text-slate-700">
                    Card Image URL
                    <input
                      type="text"
                      value={draft.cardImage}
                      onChange={(e) => setDraft((prev) => ({ ...prev, cardImage: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs text-slate-700">
                    Hero Image URL
                    <input
                      type="text"
                      value={draft.heroImage}
                      onChange={(e) => setDraft((prev) => ({ ...prev, heroImage: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <label className="text-xs text-slate-700">
                    Upload Card Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "card")} className="mt-1 block w-full text-xs" />
                  </label>
                  <label className="text-xs text-slate-700">
                    Upload Hero Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "hero")} className="mt-1 block w-full text-xs" />
                  </label>
                </div>

                {(uploadingCard || uploadingHero) && (
                  <p className="text-xs text-slate-600">Uploading image...</p>
                )}
              </div>
            )}

            <div className="mb-6">
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="flex items-center justify-between w-full text-left font-bold text-xl text-slate-900 mb-4 pb-3 border-b border-slate-200 tracking-tight"
              >
                <span className="uppercase">Core Features</span>
                <span className="text-2xl font-medium text-slate-700">{showFeatures ? "-" : "+"}</span>
              </button>

              {showFeatures && (
                <>
                  {isAdmin && (
                    <textarea
                      rows={8}
                      value={draft.featuresText}
                      onChange={(e) => setDraft((prev) => ({ ...prev, featuresText: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mb-3"
                      placeholder="One feature per line"
                    />
                  )}
                  <div className="grid grid-cols-1 gap-2.5 mb-6">
                    {displayFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40"
                      >
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-cyan-400 opacity-80" />
                        <div className="flex items-center gap-3 pl-2">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                            V
                          </span>
                          <span className="text-[15px] font-semibold text-slate-700 leading-snug group-hover:text-slate-900">
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center justify-between w-full text-left font-bold text-xl text-slate-900 mb-4 pb-3 border-b border-slate-200 tracking-tight"
              >
                <span className="uppercase">Description</span>
                <span className="text-2xl font-medium text-slate-700">{showDescription ? "-" : "+"}</span>
              </button>

              {showDescription && (
                <div className="text-sm text-gray-700 leading-relaxed">
                  {isAdmin ? (
                    <textarea
                      rows={5}
                      value={draft.description}
                      onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  ) : (
                    <p>{draft.description}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {isAdmin ? (
                <>
                  <label className="w-full text-xs text-slate-700">
                    Upload Brochure (PDF)
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleBrochureUpload}
                      className="mt-1 block w-full text-xs"
                    />
                  </label>
                  {uploadingBrochure && <p className="text-xs text-slate-600">Uploading brochure...</p>}
                  <label className="w-full text-xs text-slate-700">
                    YouTube Video Link
                    <input
                      type="url"
                      value={draft.youtubeUrl}
                      onChange={(e) => setDraft((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </label>
                  <label className="w-full text-xs text-slate-700">
                    Brochure URL
                    <input
                      type="url"
                      value={draft.brochureUrl}
                      onChange={(e) => setDraft((prev) => ({ ...prev, brochureUrl: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <div className="w-full flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Product Content"}
                    </button>
                    {saveMessage && <span className="text-sm text-emerald-600">{saveMessage}</span>}
                    {saveError && <span className="text-sm text-rose-600">{saveError}</span>}
                  </div>
                </>
              ) : (
                <>
                  {draft.brochureUrl ? (
                    <a
                      href={draft.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${actionBtnBase} bg-slate-900 text-white hover:bg-slate-800`}
                    >
                      <span>D</span>
                      <span>DOWNLOAD BROCHURE</span>
                    </a>
                  ) : (
                    <button disabled className={`${actionBtnBase} bg-slate-300 text-slate-500 cursor-not-allowed`}>
                      <span>D</span>
                      <span>BROCHURE NOT AVAILABLE</span>
                    </button>
                  )}

                  {draft.youtubeUrl ? (
                    <a
                      href={draft.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${actionBtnBase} bg-red-600 text-white hover:bg-red-500`}
                    >
                      <span>T</span>
                      <span>WATCH VIDEO</span>
                    </a>
                  ) : (
                    <button disabled className={`${actionBtnBase} bg-slate-300 text-slate-500 cursor-not-allowed`}>
                      <span>T</span>
                      <span>VIDEO NOT AVAILABLE</span>
                    </button>
                  )}

                  <a
                    href={whatsappEnquiryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${actionBtnBase} bg-emerald-600 text-white hover:bg-emerald-500`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>GET ENQUIRY ON WHATSAPP</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="text-4xl font-bold text-slate-800">Explore our lineup</h3>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowLineupEditor((prev) => !prev)}
              className="px-4 py-2 text-sm rounded-lg border border-sky-300 text-sky-700 bg-sky-50 hover:bg-sky-100"
            >
              {showLineupEditor ? "Close Lineup Editor" : "Edit Explore Lineup"}
            </button>
          )}
        </div>

        {isAdmin && showLineupEditor && (
          <div className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-4 space-y-4">
            <p className="text-sm font-semibold text-sky-800">Edit Explore Lineup</p>
            <div className="space-y-4">
              {draft.lineupItems.map((item, index) => (
                <div key={`lineup-editor-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <label className="text-xs text-slate-700">
                      Card Heading
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleLineupFieldChange(index, "title", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs text-slate-700">
                      Card Paragraph
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => handleLineupFieldChange(index, "subtitle", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs text-slate-700">
                      Card Image URL
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => handleLineupFieldChange(index, "image", e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                  <label className="mt-3 block text-xs text-slate-700">
                    Upload Card Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLineupImageUpload(e, index)}
                      className="mt-1 block w-full text-xs"
                    />
                  </label>
                  {uploadingLineupIndex === index && (
                    <p className="mt-2 text-xs text-slate-600">Uploading lineup image...</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreLineup.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition"
            >
              <div className="h-52 flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    if (e.target.dataset.fallbackApplied === "true") {
                      e.target.style.display = "none";
                      return;
                    }
                    e.target.dataset.fallbackApplied = "true";
                    e.target.src = item.fallbackImage;
                  }}
                />
              </div>

              <h4 className="text-3xl font-semibold text-blue-700 mb-2">{item.title}</h4>
              <p className="text-lg text-gray-600 font-medium uppercase tracking-wide mb-5">
                {item.subtitle || item.title}
              </p>

              <Link
                to="/contact"
                className="px-6 py-3.5 bg-blue-900 text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm transition-all duration-200 hover:bg-blue-800 hover:shadow-md hover:-translate-y-0.5"
              >
                CONTACT NOW
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-slate-100 rounded-2xl px-5 py-7 md:px-8 md:py-9">
        <h3 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight mb-7 md:mb-8">
          {draft.benefitsHeading || defaultBenefitsHeading}
        </h3>

        {isAdmin && (
          <div className="mb-6 rounded-2xl border border-sky-200 bg-white p-4 space-y-4">
            <p className="text-sm font-semibold text-sky-800">Edit Features & Benefits</p>
            <label className="block text-xs text-slate-700">
              Section Heading
              <input
                type="text"
                value={draft.benefitsHeading}
                onChange={(e) => setDraft((prev) => ({ ...prev, benefitsHeading: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>

            <div className="grid gap-4 lg:grid-cols-2">
              {draft.benefitsItems.map((item, index) => (
                <div key={`benefit-editor-${index}`} className="rounded-xl border border-slate-200 p-3 bg-slate-50">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Card {index + 1}</p>
                  <label className="block text-xs text-slate-700 mb-2">
                    Card Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          benefitsItems: prev.benefitsItems.map((benefit, benefitIndex) =>
                            benefitIndex === index ? { ...benefit, title: e.target.value } : benefit
                          ),
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-xs text-slate-700">
                    Card Description
                    <textarea
                      rows={4}
                      value={item.description}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          benefitsItems: prev.benefitsItems.map((benefit, benefitIndex) =>
                            benefitIndex === index
                              ? { ...benefit, description: e.target.value }
                              : benefit
                          ),
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {displayBenefits.map((item, index) => (
            <div key={`${item.title}-${index}`} className="rounded-xl bg-white/80 border border-slate-200 p-5 md:p-6">
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-orange-500 text-white flex items-center justify-center mb-4 shadow-sm">
                {renderBenefitIcon(item.icon)}
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 tracking-tight leading-tight">{item.title}</h4>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
