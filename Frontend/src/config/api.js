const configuredApiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || "").trim();

if (!configuredApiBaseUrl && !import.meta.env.DEV) {
  throw new Error("VITE_API_BASE_URL is required for production builds.");
}

export const API_BASE_URL = (configuredApiBaseUrl || "http://localhost:5000").replace(/\/+$/, "");
