import axios from "axios";

const configuredBackendUrl = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "");
const runtimeOrigin =
  typeof window !== "undefined" && window.location?.origin ? window.location.origin : "";

const BACKEND_URL = configuredBackendUrl || runtimeOrigin;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, timeout: 20000 });

export const TOKEN_KEY = "sandr_admin_token";

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
}
export function setToken(token) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch (e) { /* ignore */ }
}
export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
}

export function authHeaders() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
