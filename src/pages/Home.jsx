// src/pages/Home.jsx
import { Link } from "react-router-dom";

// ВАЖНО: с разширение .js + работи и при default export, и при именуван export
import * as newsModule from "../data/news.js";
import * as eventsModule from "../data/events.js";

const newsArr =
  (newsModule?.default ?? newsModule?.news ?? []);
const eventsArr =
  (eventsModule?.default ?? eventsModule?.events ?? []);

export default function Home() {
  const latestNews = Array.isArray(newsArr) ? newsArr.slice(0, 3) : [];
  const upcomingEvents = Array.isArray(eventsArr) ? eventsArr.slice(0, 3) : [];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            Добре дошли в <span className="underline decoration-white/70">LeaderTV</span>
          </h1>
          <p className="mt-4 text-center text-white/90 max-w-3xl mx-auto">
            Платформа за новини и събития на МИГ и партньорски организации.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/news"
              className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow hover:bg-white/90"
            >
              Виж новините
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow hover:bg-white/90"
            >
              Календар на събитията
            </Link>
          </div>
        </div>
      </section>

      {/* ДВЕ КОЛОНИ: НОВИНИ / СЪБИТИЯ */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Последни новини */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">Последни новини</h2>
                <Link
                  to="/news"
                  className="text-emerald-700 text-sm font-medium hover:underline"
                >
                  Всички →
                </Link>
              </div>
              <ul className="divide-y">
                {latestNews.map((n) => (
                  <li key={n.id ?? n.title} className="px-5 py-4">
                    <p className="text-xs text-slate-500">{n.date}</p>
                    <p className="mt-1 font-medium">{n.title}</p>
                    {n.excerpt && (
                      <p className="mt-1 text-sm text-slate-600">{n.excerpt}</p>
                    )}
                  </li>
                ))}
                {latestNews.length === 0 && (
                  <li className="px-5 py-6 text-slate-500 text-sm">
                    Няма налични новини.
                  </li>
                )}
              </ul>
            </div>

            {/* Предстоящи събития */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">Предстоящи събития</h2>
                <Link
                  to="/events"
                  className="text-emerald-700 text-sm font-medium hover:underline"
                >
                  Всички →
                </Link>
              </div>
              <ul className="divide-y">
                {upcomingEvents.map((e) => (
                  <li key={e.id ?? e.title} className="px-5 py-4">
                    <p className="text-xs text-slate-500">
                      {e.date} {e.time ? `• ${e.time}` : ""}
                    </p>
                    <p className="mt-1 font-medium">{e.title}</p>
                    {e.location && (
                      <p className="mt-1 text-sm text-slate-600">{e.location}</p>
                    )}
                  </li>
                ))}
                {upcomingEvents.length === 0 && (
                  <li className="px-5 py-6 text-slate-500 text-sm">
                    Няма планирани събития.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
