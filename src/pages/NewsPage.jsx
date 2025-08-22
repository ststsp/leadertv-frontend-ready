import { Link } from "react-router-dom";
import news from "../data/news.js";

export default function NewsPage() {
  const items = (news ?? []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Новини</h1>
        <Link to="/" className="text-green-700 hover:underline">Начало</Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 text-slate-500">
          Няма налични новини.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <article key={n.id} className="bg-white rounded-xl shadow hover:shadow-md transition">
              {n.image && (
                <img src={n.image} alt={n.title} className="h-40 w-full object-cover rounded-t-xl" />
              )}
              <div className="p-5">
                <p className="text-xs text-slate-500">{n.date}</p>
                <Link to={`/news/${n.id}`} className="mt-1 font-semibold hover:underline block">
                  {n.title}
                </Link>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{n.excerpt || n.summary}</p>
                <Link to={`/news/${n.id}`} className="mt-3 inline-flex items-center text-emerald-700">
                  Прочети още →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
