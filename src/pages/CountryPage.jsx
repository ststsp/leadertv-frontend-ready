import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountryByCode } from "../data/countries";

export default function CountryPage() {
  const { code } = useParams();
  const country = getCountryByCode(code);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (country) {
      document.title = `LeaderTV – ${country.name}`;
      window.scrollTo(0, 0);
    } else {
      document.title = "LeaderTV – Държавата не е открита";
    }
  }, [country]);

  if (!country) {
    return (
      <main className="page">
        <div className="card" style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: 0 }}>Държавата не е открита</h2>
          <p className="muted">Код: <code>{code}</code></p>
          <Link to="/" className="btn btn-light">Към началото</Link>
        </div>
      </main>
    );
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return country.groups || [];
    return (country.groups || []).filter(g => {
      return (
        (g.name && g.name.toLowerCase().includes(q)) ||
        (g.city && g.city.toLowerCase().includes(q))
      );
    });
  }, [country.groups, query]);

  return (
    <>
      {/* Хедър на държавата */}
      <section className="country-hero">
        <div className="country-hero__inner">
          <div className="country-title">
            <img
              src={country.flag}
              alt={country.name}
              className="country-flag"
              loading="lazy"
            />
            <h1>{country.name}</h1>
          </div>

          <div className="country-meta">
            <span className="badge">
              {country.groups?.length || 0} местни групи
            </span>
            <Link to="/" className="btn btn-light">Начало</Link>
          </div>
        </div>
      </section>

      {/* Търсене */}
      <main className="page">
        <div className="card">
          <label htmlFor="search" className="muted" style={{ display: "block", marginBottom: 6 }}>
            Търси по име на група или град
          </label>
          <input
            id="search"
            className="input"
            placeholder="например: София, Vichy, Leader…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Списък с групи */}
        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: "center" }}>
            <p className="muted">Няма резултати.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map((g, i) => (
              <div key={`${g.name}-${i}`} className="group-card card">
                <div className="group-card__head">
                  <h3 className="group-title">{g.name}</h3>
                  {g.city ? <span className="chip">{g.city}</span> : null}
                </div>

                {g.site ? (
                  <a
                    href={g.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Към сайта
                  </a>
                ) : (
                  <span className="muted">Няма официален сайт</span>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="muted" style={{ textAlign: "center", marginTop: 24 }}>
          © 2025 LeaderTV. Всички права запазени.
        </p>
      </main>
    </>
  );
}
