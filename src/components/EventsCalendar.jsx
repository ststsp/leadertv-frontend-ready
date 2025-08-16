import { useEffect, useState } from "react";
import { api } from "../services/api";

function parseEventDate(raw) {
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === "number") return new Date(raw > 1e12 ? raw : raw * 1000);
  if (typeof raw === "string") {
    const s = raw.trim();
    if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}$/.test(s)) return new Date(s.replace(" ", "T"));
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00`);
    const d = new Date(s);
    if (!isNaN(d)) return d;
  }
  return null;
}
const pickDate = (ev) => parseEventDate(ev.start ?? ev.date ?? ev.datetime ?? ev.eventDate);

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    api.getEvents()
      .then((data) => { if (alive) { setEvents(Array.isArray(data) ? data : []); setLoading(false); } })
      .catch((e) => { if (alive) { setError(e.message || "Неуспешно зареждане на събития"); setLoading(false); } });
    return () => { alive = false; };
  }, []);

  if (loading) return <p>Зареждане…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Календар на събития</h2>
        <a href="/events" className="text-blue-600 hover:underline">Всички събития</a>
      </div>

      <ul className="divide-y rounded-2xl border overflow-hidden">
        {events.map((ev) => {
          const d = pickDate(ev);
          return (
            <li key={ev.id ?? ev._id ?? ev.title} className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-medium">{ev.title}</h3>
                  {ev.location && <p className="text-sm opacity-80">{ev.location}</p>}
                </div>
                <time className="text-sm">
                  {d ? d.toLocaleString("bg-BG", { day:"2-digit", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit" }) : ""}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}