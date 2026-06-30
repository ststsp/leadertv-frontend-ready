import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX ?? "/api";

const fmtBG = (d) =>
  new Date(d).toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export default function NewsPage() {
  const [news, setNews] = useState({ items: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${API_URL}${API_PREFIX}/news`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        const items = Array.isArray(data) ? data : data.items || [];
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (!cancelled) setNews({ items, loading: false });
      } catch {
        if (!cancelled) setNews({ items: [], loading: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Новини</h1>
      {news.loading ? (
        <p className="text-gray-500">Зареждане...</p>
      ) : news.items.length ? (
        <ul className="space-y-4">
          {news.items.map((n) => (
            <li
              key={n.id || n._id || n.title}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-semibold">{n.title}</h2>
              <div className="text-sm text-gray-500">{fmtBG(n.date)}</div>
              {n.summary && <p className="mt-2 text-gray-700">{n.summary}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Няма записи.</p>
      )}
    </section>
  );
}