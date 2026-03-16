const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const ADMIN_AUTH_TOKEN_KEY = "a2k_admin_token";
export const ADMIN_UNAUTHORIZED_EVENT = "a2k-admin-unauthorized";

export const getAdminToken = () => sessionStorage.getItem(ADMIN_AUTH_TOKEN_KEY);

export const hasAdminToken = () => Boolean(getAdminToken());

export const setAdminToken = (token) => {
  sessionStorage.setItem(ADMIN_AUTH_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  sessionStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
};

export const buildAdminHeaders = (headers = {}) => {
  const token = getAdminToken();
  if (!token) {
    return { ...headers };
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

const dispatchAdminUnauthorized = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ADMIN_UNAUTHORIZED_EVENT));
  }
};

export const adminFetch = async (input, init = {}) => {
  const response = await fetch(input, {
    ...init,
    headers: buildAdminHeaders(init.headers),
  });

  if (response.status === 401) {
    clearAdminToken();
    dispatchAdminUnauthorized();
  }

  return response;
};

export const loginAdmin = async (password) => {
  const response = await fetch(`${API_BASE_URL}/api/admin-auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Admin login failed.");
  }

  if (!data.token) {
    throw new Error("Admin token missing from server response.");
  }

  setAdminToken(data.token);
  return data;
};

export const verifyAdminSession = async () => {
  const response = await adminFetch(`${API_BASE_URL}/api/admin-auth/verify`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Admin session is invalid.");
  }

  return data;
};