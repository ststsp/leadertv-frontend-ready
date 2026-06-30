import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX ?? "/api";

const fmtBG = (d) =>
  new Date(d).toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export default function EventsPage() {
  const [events, setEvents] = useState({ items: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${API_URL}${API_PREFIX}/events`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        const items = Array.isArray(data) ? data : data.items || [];
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (!cancelled) setEvents({ items, loading: false });
      } catch {
        if (!cancelled) setEvents({ items: [], loading: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Събития</h1>
      {events.loading ? (
        <p className="text-gray-500">Зареждане...</p>
      ) : events.items.length ? (
        <ul className="space-y-4">
          {events.items.map((e) => (
            <li
              key={e.id || e._id || e.title}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="text-xl font-semibold">{e.title}</h2>
              <div className="text-sm text-gray-500">{fmtBG(e.date)}</div>
              {e.place && (
              <p className="mt-2 text-gray-700">Място: {e.place}</p>
              )}
              {e.summary && (
               <p className="mt-2 text-gray-700">{e.summary}</p>
               )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Няма записи.</p>
      )}
    </section>
  );
}