import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlagsMosaic from "../components/FlagsMosaic";
import { countries } from "../data/countries";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "/api";

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const [nRes, eRes] = await Promise.all([
          fetch(`${API_URL}${API_PREFIX}/news`),
          fetch(`${API_URL}${API_PREFIX}/events`),
        ]);
        const [nJson, eJson] = await Promise.all([nRes.json(), eRes.json()]);
        if (!cancel) {
          setNews(Array.isArray(nJson) ? nJson.slice(0, 4) : []);
          setEvents(Array.isArray(eJson) ? eJson.slice(0, 4) : []);
        }
      } catch (err) {
        console.error("Home fetch error:", err);
        if (!cancel) {
          setNews([]);
          setEvents([]);
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      {/* ХЕРО секция – можеш да оставиш твоя съществуващ HTML/компонент */}
      <section
        style={{
          background: "linear-gradient(180deg,#d4fbe1 0%,rgba(212,251,225,0) 100%)",
          borderBottom: "1px solid rgba(0,0,0,.06)",
        }}
      >
        <div className="page">
          <h1 style={{ margin: "0 0 6px 0" }}>Добре дошли в LeaderTV</h1>
          <p className="muted" style={{ marginTop: 0 }}>
            Платформа за новини и събития на МИГ и партньорски организации.
          </p>

          {/* CTA бутони – по избор */}
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link className="btn" to="/news">Виж новините</Link>
            <Link className="btn" to="/events">Календар на събитията</Link>
          </div>

          {/* МОЗАЙКА СО ЗНАМЕНА */}
          <FlagsMosaic countries={countries} />
        </div>
      </section>

      {/* Последни новини / Предстоящи събития */}
      <section className="page" style={{ paddingTop: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          <div className="card">
            <div className="card-header">Последни новини</div>
            <div className="card-body">
              {loading ? (
                <p className="muted">Зареждане…</p>
              ) : news.length ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
                  {news.map((n) => (
                    <li key={n.id} style={{ borderBottom: "1px dashed rgba(0,0,0,.06)", paddingBottom: 10 }}>
                      <div style={{ fontWeight: 600 }}>{n.title}</div>
                      {n.date && (
                        <div className="muted" style={{ fontSize: 13 }}>
                          {n.date}
                        </div>
                      )}
                      {n.body && <div style={{ marginTop: 6 }}>{n.body}</div>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Няма записи.</p>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">Предстоящи събития</div>
            <div className="card-body">
              {loading ? (
                <p className="muted">Зареждане…</p>
              ) : events.length ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
                  {events.map((e) => (
                    <li key={e.id} style={{ borderBottom: "1px dashed rgba(0,0,0,.06)", paddingBottom: 10 }}>
                      <div style={{ fontWeight: 600 }}>{e.title}</div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        {e.date}{e.location ? ` · ${e.location}` : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Няма записи.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
