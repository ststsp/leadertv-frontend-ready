// src/services/api.js
const BASE = import.meta.env.VITE_API_URL;

// --- общ помощник ---
async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${opts.method || "GET"} ${path} -> ${res.status} ${text}`);
  }
  // някои DELETE-и може да връщат празно тяло
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : null;
}

// --- News ---
export async function getNews() {
  return request("/api/news");
}
export async function createNews(data) {
  return request("/api/news", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function deleteNews(id) {
  return request(`/api/news/${id}`, { method: "DELETE" });
}

// --- Events ---
export async function getEvents() {
  return request("/api/events");
}
export async function createEvent(data) {
  return request("/api/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export async function deleteEvent(id) {
  return request(`/api/events/${id}`, { method: "DELETE" });
}

// удобен обект за import { api } ...
export const api = {
  getNews,
  createNews,
  deleteNews,
  getEvents,
  createEvent,
  deleteEvent,
};
