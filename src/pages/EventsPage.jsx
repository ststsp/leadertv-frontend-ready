import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

function EventCard({ ev }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="text-sm text-gray-500">
        {new Date(ev.date || ev.datetime || ev.when).toLocaleString("bg-BG", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <h3 className="mt-1 text-lg font-semibold">{ev.title}</h3>
      {ev.location && <div className="text-gray-600">{ev.location}</div>}
      {ev.description && (
        <p className="mt-2 line-clamp-3 text-gray-700">{ev.description}</p>
      )}
      {/* детайлна страница (следваща стъпка): */}
      {/* <Link to={`/events/${ev.id}`} className="mt-3 inline-block text-sm text-emerald-700 hover:underline">Детайли →</Link> */}
    </article>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getEvents()
      .then((data) => {
        if (!alive) return;
        setEvents(Array.isArray(data) ? data : data?.items || []);
      })
      .catch((e) => alive && setErr(e.message || "Грешка при зареждане"))
      .finally(() => alive && setLoading(false));
    return () => (alive = false);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Събития</h1>

      {loading && <div className="text-gray-600">Зареждане…</div>}
      {err && !loading && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {!loading && !err && events.length === 0 && (
        <div className="text-gray-600">Няма предстоящи събития.</div>
      )}

      {!loading && !err && events.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <EventCard key={ev.id || ev._id || ev.title + ev.date} ev={ev} />
          ))}
        </div>
      )}
    </main>
  );
}
