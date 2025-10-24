import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX ?? "/api";

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}${API_PREFIX}/news`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!cancelled) setItems(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Неуспешно зареждане на новините.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNews();
    return () => (cancelled = true);
  }, []);

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Новини</h1>
      </header>

      {loading && <div className="bg-white p-6 rounded-xl shadow">Зареждане…</div>}
      {error && <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-red-600">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow text-gray-600">Няма записи.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <article key={n.id ?? n._id} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">{n.title}</h2>
              <p className="text-gray-700 mb-3 line-clamp-3">{n.summary ?? n.content}</p>
              <div className="text-sm text-gray-500">{new Date(n.date).toLocaleDateString("bg-BG")}</div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
