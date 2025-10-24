const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
const API_PREFIX = (import.meta.env.VITE_API_PREFIX ?? "/api").replace(/\/?$/, "");

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${API_PREFIX}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}

export async function apiSend(path, method, body) {
  const res = await fetch(`${API_URL}${API_PREFIX}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}`);
  return res.json();
}

export const api = {
  listNews: () => apiGet("/news"),
  createNews: (data) => apiSend("/news", "POST", data),
  updateNews: (id, data) => apiSend(`/news/${id}`, "PUT", data),
  deleteNews: (id) => apiSend(`/news/${id}`, "DELETE", {}),

  listEvents: () => apiGet("/events"),
  createEvent: (data) => apiSend("/events", "POST", data),
  updateEvent: (id, data) => apiSend(`/events/${id}`, "PUT", data),
  deleteEvent: (id) => apiSend(`/events/${id}`, "DELETE", {}),
};
