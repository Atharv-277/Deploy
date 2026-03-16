import { useState } from "react";

export default function ProductNavbar({ active, setActive }) {
  const navItems = [
    { label: "Display Solutions", value: "Display Solutions" },
    { label: "Kiosk Solutions", value: "Kiosk Solutions" },
    { label: "Interactive Solutions", value: "Interactive Solutions" },
    { label: "Media players", value: "Digital Signage Hardware" },
    { label: "Mounting Solutions", value: "Mounting Solutions" },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-6 flex gap-10 py-5 whitespace-nowrap min-w-max">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.value)}
            className={`relative text-sm font-medium transition-all flex-shrink-0 ${
              active === item.value
                ? "text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.label}

            {active === item.value && (
              <span className="absolute left-0 -bottom-3 w-full h-[3px] bg-blue-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}