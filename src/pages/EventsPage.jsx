import events from "../data/events.js";

export default function EventsPage() {
  const items = (events ?? []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Събития</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-6 text-slate-500">Няма планирани събития.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <article key={e.id} className="bg-white rounded-xl shadow hover:shadow-md transition p-5">
              <div className="text-xs text-slate-500">{e.date}{e.time ? ` • ${e.time}` : ""}</div>
              <h3 className="mt-1 font-semibold text-slate-900">{e.title}</h3>
              {e.location && <p className="mt-1 text-sm text-slate-600">{e.location}</p>}
              {e.description && <p className="mt-2 text-sm text-slate-700 line-clamp-3">{e.description}</p>}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
