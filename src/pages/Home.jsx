import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { countries } from "../data/countries";

const fmtBG = (d) =>
  new Date(d).toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const sortByDateDesc = (arr, field = "date") =>
  [...(arr || [])].sort(
    (a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime()
  );

export default function Home() {
  const nav = useNavigate();

  const [news, setNews] = useState({ items: [], loading: true });
  const [events, setEvents] = useState({ items: [], loading: true });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Динамичен импорт БЕЗ top-level await
      let api = {};
      try {
        api = await import("../services/api");
      } catch {
        api = {};
      }

      // Фолбек към fetch, ако services/api липсва
      const getNews =
        api.getNews ||
        (async () => {
          const r = await fetch("/api/news");
          return r.json();
        });

      const getEvents =
        api.getEvents ||
        (async () => {
          const r = await fetch("/api/events");
          return r.json();
        });

      try {
        const [n, e] = await Promise.all([getNews(), getEvents()]);
        if (cancelled) return;
        setNews({ items: sortByDateDesc(n).slice(0, 5), loading: false });
        setEvents({ items: sortByDateDesc(e).slice(0, 5), loading: false });
      } catch {
        if (cancelled) return;
        setNews({ items: [], loading: false });
        setEvents({ items: [], loading: false });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalNews = news.items.length;

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <h1>Добре дошли в LeaderTV</h1>
          <p>Платформа за новини и събития на МИГ и партньорски организации.</p>

          {/* FLAGS GRID */}
          <div className="flag-grid">
            {countries.map((c) => (
              <button
                key={c.code}
                className="flag-card"
                onClick={() => nav(`/country/${c.code}`)}
                aria-label={c.name}
              >
                <img src={c.flag} alt={c.name} loading="lazy" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT ROW */}
      <div className="wrap section">
        <div className="cards">
          {/* NEWS */}
          <section className="card">
            <header className="card-head">
              <h2 className="card-title">
                Последни новини{" "}
                {totalNews > 0 && <span className="badge">{totalNews}</span>}
              </h2>
              <Link className="link" to="/news">
                Всички →
              </Link>
            </header>
            <div className="card-body">
              {news.loading ? (
                <SkeletonList />
              ) : news.items.length ? (
                <ul className="list">
                  {news.items.map((n) => (
                    <li className="item" key={n.id || n._id || n.title}>
                      <h3 className="item-title">{n.title}</h3>
                      <div className="item-date">{fmtBG(n.date)}</div>
                      {n.body && <p className="item-text">{n.body}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Няма записи.</p>
              )}
            </div>
          </section>

          {/* EVENTS */}
          <section className="card">
            <header className="card-head">
              <h2 className="card-title">Предстоящи събития</h2>
              <Link className="link" to="/events">
                Всички →
              </Link>
            </header>
            <div className="card-body">
              {events.loading ? (
                <SkeletonList />
              ) : events.items.length ? (
                <ul className="list">
                  {events.items.map((e) => (
                    <li className="item" key={e.id || e._id || e.title}>
                      <h3 className="item-title">{e.title}</h3>
                      <div className="item-date">{fmtBG(e.date)}</div>
                      {e.location && (
                        <p className="item-text">Локация: {e.location}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Няма записи.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function SkeletonList() {
  return (
    <div className="list">
      <div className="item">
        <div className="skeleton" style={{ width: "60%" }} />
        <div className="skeleton" style={{ width: "30%", height: 12 }} />
        <div className="skeleton" style={{ width: "90%" }} />
      </div>
      <div className="item">
        <div className="skeleton" style={{ width: "55%" }} />
        <div className="skeleton" style={{ width: "28%", height: 12 }} />
        <div className="skeleton" style={{ width: "80%" }} />
      </div>
    </div>
  );
}
