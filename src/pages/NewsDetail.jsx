import { useParams, Link } from "react-router-dom";
import news from "../data/news.js";

export default function NewsDetail() {
  const { id } = useParams();
  const item = (news ?? []).find((n) => String(n.id) === String(id));

  if (!item) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Новината не е намерена</h1>
        <Link to="/news" className="text-green-700 hover:underline">← Връщане към всички новини</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/news" className="text-green-700 hover:underline">← Всички новини</Link>

      <article className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
        {item.image && <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />}

        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{item.title}</h1>
          {item.date && <p className="mt-2 text-sm text-slate-500">{item.date}</p>}

          {item.html ? (
            <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: item.html }} />
          ) : (
            <p className="mt-6 text-slate-800 leading-7 whitespace-pre-line">{item.content || item.excerpt || ""}</p>
          )}

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li key={t} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">#{t}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </main>
  );
}
