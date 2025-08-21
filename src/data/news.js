import { Link } from "react-router-dom";
import news from "../data/news";

export default function NewsList({ limit }) {
  const items = Array.isArray(news)
    ? [...news].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const list = limit ? items.slice(0, limit) : items;

  if (!list.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-slate-500">
        Няма налични новини.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {list.map((n) => {
        const date = n.date
          ? new Date(n.date).toLocaleDateString("bg-BG", { day: "2-digit", month: "2-digit", year: "numeric" })
          : "";
        return (
          <li key={n.id}>
            <Link
              to={`/news/${n.id}`}
              className="block bg-white rounded-2xl shadow hover:shadow-md transition p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {n.title}
                </h3>
                {date && <span className="text-sm text-slate-500 shrink-0">{date}</span>}
              </div>
              {(n.summary || n.excerpt) && (
                <p className="mt-2 text-slate-600">
                  {n.summary || n.excerpt}
                </p>
              )}
              <span className="mt-3 inline-flex items-center text-green-700">
                Прочети още
                <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0L18 9.586l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
