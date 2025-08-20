import { useEffect, useState } from "react";
import { getNews } from "../services/api";

function NewsCard({ n }) {
  const dt = new Date(n.date || n.publishedAt || n.createdAt);
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="text-sm text-gray-500">
        {isFinite(dt) &&
          dt.toLocaleDateString("bg-BG", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
      </div>
      <h3 className="mt-1 text-lg font-semibold">{n.title}</h3>
      {n.summary && <p className="mt-2 line-clamp-3 text-gray-700">{n.summary}</p>}
      {/* <Link to={`/news/${n.id}`} className="mt-3 inline-block text-sm text-emerald-700 hover:underline">Прочети повече →</Link> */}
    </article>
  );
}

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getNews()
      .then((data) => {
        if (!alive) return;
        setItems(Array.isArray(data) ? data : data?.items || []);
      })
      .catch((e) => alive && setErr(e.message || "Грешка при зареждане"))
      .finally(() => alive && setLoading(false));
    return () => (alive = false);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Новини</h1>

      {loading && <div className="text-gray-600">Зареждане…</div>}
      {err && !loading && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {!loading && !err && items.length === 0 && (
        <div className="text-gray-600">Няма публикувани новини.</div>
      )}

      {!loading && !err && items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <NewsCard key={n.id || n._id || n.title + n.date} n={n} />
          ))}
        </div>
      )}
    </main>
  );
}
