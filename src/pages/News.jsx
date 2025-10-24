import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        // очакван ендпойнт: GET /api/news  -> [{ id, title, summary, date }]
        const res = await fetch(`${API_BASE}/api/news`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setItems(Array.isArray(data) ? data : data?.items ?? []);
      } catch (e) {
        if (!ignore) setError("Неуспешно зареждане на новините.");
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Новини</h1>
        {/* По-късно: бутон за добавяне в Админ панела */}
      </header>

      {loading && (
        <div className="bg-white rounded-2xl shadow p-6 text-gray-600">
          Зареждане…
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-6 text-gray-600">
          Няма записи.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => {
            const date =
              n.date ? new Date(n.date).toLocaleDateString("bg-BG") : "";
            return (
              <article
                key={n.id ?? n._id ?? n.slug ?? Math.random()}
                className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">{n.title}</h2>
                {date && (
                  <div className="text-sm text-gray-500 mb-3">{date}</div>
                )}
                <p className="text-gray-700 line-clamp-4">
                  {n.summary ?? n.content ?? ""}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
