import { useEffect, useState } from "react";
import { api } from "../services/api";

function parseNewsDate(raw) {
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === "number") return new Date(raw > 1e12 ? raw : raw * 1000);
  if (typeof raw === "string") {
    const s = raw.trim();
    if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(s)) return new Date(s.replace(" ", "T"));
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00`);
    const d = new Date(s);
    if (!isNaN(d)) return d;
  }
  return null;
}

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    api.getNews()
      .then((data) => {
        if (alive) {
          setNews(Array.isArray(data) ? data.slice(0, 2) : []);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (alive) {
          setError(e.message || "Неуспешно зареждане на новини");
          setLoading(false);
        }
      });
    return () => { alive = false; };
  }, []);

  if (loading) return <p>Зареждане…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Новини</h2>
        <a href="/news" className="text-blue-600 hover:underline">Всички новини</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((n) => {
          const d = parseNewsDate(n.date ?? n.createdAt);
          return (
            <article key={n.id ?? n._id ?? n.title} className="p-4 border rounded-xl shadow-sm">
              {d && (
                <time className="block text-sm opacity-70 mb-1">
                  {d.toLocaleDateString("bg-BG", { day: "2-digit", month: "long", year: "numeric" })}
                </time>
              )}
              <h3 className="font-medium">{n.title}</h3>
              {n.summary && <p className="mt-1 text-sm opacity-80">{n.summary}</p>}
              {!n.summary && n.excerpt && <p className="mt-1 text-sm opacity-80">{n.excerpt}</p>}
              {!n.summary && !n.excerpt && n.content && (
                <p className="mt-1 text-sm opacity-80">{String(n.content).slice(0, 120)}…</p>
              )}
              {n.url && (
                <a href={n.url} className="mt-2 inline-block text-sm text-blue-600 hover:underline">
                  Прочети повече
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}