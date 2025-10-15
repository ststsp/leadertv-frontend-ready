import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../data/countries";

/**
 * Без външни зависимости: четем бекенда директно от Vite env променливи.
 * Работи и ако вече имаш services/api.js – този компонент не го изисква.
 */
const API_BASE = (() => {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const prefix = (import.meta.env.VITE_API_PREFIX || "/api").replace(/^\/*/, "/");
  return `${base}${prefix}`;
})();

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // новини
    fetch(`${API_BASE}/news`)
      .then(r => r.ok ? r.json() : [])
      .then(data => Array.isArray(data) ? setNews(data.slice(0, 5)) : setNews([]))
      .catch(() => setNews([]));

    // събития
    fetch(`${API_BASE}/events`)
      .then(r => r.ok ? r.json() : [])
      .then(data => Array.isArray(data) ? setEvents(data.slice(0, 5)) : setEvents([]))
      .catch(() => setEvents([]));
  }, []);

  // Стабилен ред от знамена – по код.
  const countryTiles = useMemo(
    () => [...countries].sort((a, b) => a.code.localeCompare(b.code)),
    []
  );

  return (
    <>
      {/* Герой */}
      <section className="hero">
        <div className="container">
          <h1>Добре дошли в LeaderTV</h1>
          <p>Платформа за новини и събития на МИГ и партньорски организации.</p>

          {/* Мозайка със знамена (бутон → /country/:code) */}
          <div className="flags-grid">
            {countryTiles.map(c => (
              <div
                key={c.code}
                className="flag-tile"
                role="button"
                onClick={() => navigate(`/country/${c.code}`)}
                title={`${c.name} — виж МИГ групите`}
              >
                <img src={c.flag} alt={c.name} loading="lazy" />
                <div className="tile-caption">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Две колони */}
      <section>
        <div className="container columns">
          <div className="card">
            <h3 className="section-title">Последни новини</h3>
            <div className="list">
              {news.length === 0 && <div className="item">Няма записи.</div>}
              {news.map(n => (
                <article key={n.id} className="item">
                  <div className="title">{n.title}</div>
                  {n.date && <div className="meta">{n.date}</div>}
                  {n.body && <div>{n.body}</div>}
                </article>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Предстоящи събития</h3>
            <div className="list">
              {events.length === 0 && <div className="item">Няма записи.</div>}
              {events.map(e => (
                <article key={e.id} className="item">
                  <div className="title">{e.title}</div>
                  <div className="meta">
                    {e.date || ""}{e.location ? ` • ${e.location}` : ""}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">© 2025 LeaderTV. Всички права запазени.</footer>
    </>
  );
}
