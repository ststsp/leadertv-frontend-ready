const BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json();
}

// Новини
export const getNews = () => request("/api/news");
// Събития
export const getEvents = () => request("/api/events");

export default { getNews, getEvents };
