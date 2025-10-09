import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../data/countries";

export default function CountryPage() {
  const { code } = useParams();
  const country = getCountryByCode(code);

  if (!country) {
    return (
      <div className="page">
        <h1>Няма такава държава</h1>
        <p>
          Върни се към <Link to="/">Начало</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="country-hero">
        <img src={country.flag} alt={country.name} />
        <div>
          <h1>{country.name}</h1>
          <p className="muted">
            Местни групи, контакти и връзки за {country.name}.
          </p>
        </div>
      </header>

      {country.groups?.length ? (
        <ul className="groups-list">
          {country.groups.map((g, idx) => (
            <li key={idx} className="group-card">
              <div className="group-header">
                <h3>{g.name}</h3>
                {g.city && <span className="badge">{g.city}</span>}
              </div>
              {(g.site || g.facebook || g.contact) ? (
                <ul className="links">
                  {g.site && (
                    <li>
                      <a href={g.site} target="_blank" rel="noreferrer">Сайт</a>
                    </li>
                  )}
                  {g.facebook && (
                    <li>
                      <a href={g.facebook} target="_blank" rel="noreferrer">
                        Facebook
                      </a>
                    </li>
                  )}
                  {g.contact && <li>Имейл: {g.contact}</li>}
                </ul>
              ) : (
                <p className="muted">(Няма въведени линкове засега)</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">Все още няма въведени групи.</p>
      )}

      <div style={{ marginTop: 24 }}>
        <Link className="btn" to="/">← Обратно към начало</Link>
      </div>
    </div>
  );
}
