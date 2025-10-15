import { Link, useParams } from "react-router-dom";
import { getCountryByCode } from "../data/countries";

export default function CountryPage() {
  const { code } = useParams();
  const country = getCountryByCode(code);

  if (!country) {
    return (
      <div className="container" style={{ padding: "28px 0" }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Държавата не е намерена</h2>
          <p>Невалиден код: <strong>{code}</strong></p>
          <p><Link to="/">← Назад към началото</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "28px 0" }}>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={country.flag} alt={country.name} width="68" height="48" style={{ borderRadius: 8, objectFit: "cover" }}/>
          <div>
            <h2 style={{ margin: "0 0 4px" }}>{country.name}</h2>
            <div style={{ color: "#6b7a8b" }}>Код: {country.code.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Местни групи (МИГ)</h3>
        {(!country.groups || country.groups.length === 0) && <p>Няма въведени групи.</p>}
        <div className="list">
          {country.groups?.map((g, i) => (
            <div key={i} className="item">
              <div className="title">{g.name}</div>
              <div className="meta">{g.city || "—"}</div>
              {g.site && (
                <div>
                  <a href={g.site} target="_blank" rel="noreferrer">Официален сайт</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p style={{ marginTop: 16 }}><Link to="/">← Назад към началото</Link></p>
    </div>
  );
}
