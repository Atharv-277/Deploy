import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductNavbar from "../components/ProductNavbar";
import ProductSection from "../components/ProductSection";
import { API_BASE_URL } from "../config/api";

const productData = {
  "Display Solutions": [
    {
      name: "Commercial Displays",
      image: "/products/display/commercial.png",
      heroImage: "/products/display/commercial_hero.jpg",
    },
    {
      name: "Digital Menu Boards",
      image: "/products/display/menu-board.png",
      heroImage: "/products/display/digital-menu-boards-hero.jpg",
    },
    {
      name: "Table Top Displays",
      image: "/products/display/table-top.png",
      heroImage: "/products/display/promolit-table-top-hero.jpg",
    },
    {
      name: "Video Wall Displays",
      image: "/products/display/video-wall.png",
      heroImage: "/products/display/video_wall_display_hero.jpg",
    },
    {
      name: "LED Wall Displays",
      image: "/products/display/led-wall.png",
      heroImage: "/products/display/video_wall_hero.jpg",
    },
  ],
  "Digital Signage Hardware": [
    {
      name: "Android Media Box",
      image: "/products/signage_hardware/android_media_box.avif",
      heroImage: "/products/signage_hardware/android_media_box_hero.jpg",
    },
    {
      name: "Amazon Fire Stick",
      image: "/products/signage_hardware/amazon_fire_stick.svg",
      heroImage: "/products/signage_hardware/amazon_fire_stick_hero.png",
    },
    {
      name: "Windows Mini Player",
      image: "/products/signage_hardware/windows_mini_player.jpg",
      heroImage: "/products/signage_hardware/windows_mini_player_hero.jpg",
    },
    {
      name: "Intel Windows Stick",
      image: "/products/signage_hardware/intel_window.avif",
      heroImage: "/products/signage_hardware/intel_window_hero.avif",
    },
  ],
  "Kiosk Solutions": [
    {
      name: "Easel Stand Display",
      image: "/products/kiosk/easel-stand.svg",
      heroImage: "/products/kiosk/digital-easel-stand_hero.jpg",
    },
    {
      name: "Self Service Kiosk",
      image: "/products/kiosk/self-service.svg",
      heroImage: "/products/kiosk/self_service_kiosk_hero.jpg",
    },
    {
      name: "Digital Standee Display",
      image: "/products/kiosk/digital-standee.svg",
      heroImage: "/products/kiosk/digital_standee_display_hero.jpg",
    },
    {
      name: "Multi Touch Table",
      image: "/products/kiosk/multi-touch-table.svg",
      heroImage: "/products/kiosk/multi-touch-table_hero.svg",
    },
  ],
  "Interactive Solutions": [
    {
      name: "Xtravu eSENSE",
      image: "/products/interactive/xtravu-esense.svg",
    },
  ],
  "Mounting Solutions": [
    {
      name: "Unified Mounts",
      image: "/products/mounting/unified.svg",
      heroImage: "/products/mounting/unified_mounts_hero.jpg",
    },
    {
      name: "Cantilevered Mounts",
      image: "/products/mounting/cantilevered.svg",
      heroImage: "/products/mounting/cantilevered_hero.svg",
    },
    {
      name: "Standard Mounts",
      image: "/products/mounting/standard.svg",
      heroImage: "/products/mounting/standard_hero.svg",
    },
  ],
};

export default function ProductPage({ isAdminMode = false }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Display Solutions");
  const [contentOverrides, setContentOverrides] = useState([]);
  const [loadingOverrides, setLoadingOverrides] = useState(false);

  // Map hash values to section names
  const hashToSection = {
    "#display": "Display Solutions",
    "#digital-signage-hardware": "Digital Signage Hardware",
    "#kiosk": "Kiosk Solutions",
    "#interactive": "Interactive Solutions",
    "#mounting": "Mounting Solutions",
  };

  useEffect(() => {
    // Set active section based on hash
    if (location.hash && hashToSection[location.hash]) {
      setActiveSection(hashToSection[location.hash]);
    }
  }, [location.hash]);

  useEffect(() => {
    const loadOverrides = async () => {
      setLoadingOverrides(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/product-content`);
        if (!res.ok) {
          throw new Error("Failed to load product content overrides");
        }
        const data = await res.json();
        setContentOverrides(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingOverrides(false);
      }
    };

    loadOverrides();
  }, []);

  const getMergedSectionItems = (sectionName) => {
    const baseItems = productData[sectionName] || [];
    return baseItems.map((item) => {
      const override = contentOverrides.find(
        (entry) => entry.section === sectionName && entry.name === item.name
      );

      if (!override) {
        return {
          ...item,
          lineupItems: undefined,
          features: undefined,
          description: "",
          brochureUrl: "",
          youtubeUrl: "",
          benefitsHeading: "",
          benefits: undefined,
        };
      }

      return {
        ...item,
        image: override.cardImage || item.image,
        heroImage: override.heroImage || item.heroImage || item.image,
        lineupItems: Array.isArray(override.lineupItems) ? override.lineupItems : undefined,
        features: Array.isArray(override.features) ? override.features : undefined,
        description: override.description || "",
        brochureUrl: override.brochureUrl || "",
        youtubeUrl: override.youtubeUrl || "",
        benefitsHeading: override.benefitsHeading || "",
        benefits: Array.isArray(override.benefits) ? override.benefits : undefined,
      };
    });
  };

  const sectionItems = getMergedSectionItems(activeSection);

  const handleProductContentSaved = (saved) => {
    setContentOverrides((prev) => {
      const idx = prev.findIndex(
        (entry) => entry.section === saved.section && entry.name === saved.name
      );
      if (idx === -1) {
        return [...prev, saved];
      }
      const next = [...prev];
      next[idx] = saved;
      return next;
    });
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <ProductNavbar
        active={activeSection}
        setActive={setActiveSection}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10">
          {activeSection.toUpperCase()}
        </h2>
        {loadingOverrides && (
          <p className="text-sm text-slate-500 mb-4">Loading latest product content...</p>
        )}

        <ProductSection
          section={activeSection}
          items={sectionItems}
          isAdmin={isAdminMode}
          onProductContentSaved={handleProductContentSaved}
        />
      </div>
    </div>
  );
}