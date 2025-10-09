import { useParams } from "react-router-dom";
import { getCountryByCode } from "../data/countries";

export default function CountryPage() {
  const { code } = useParams();
  const country = getCountryByCode(code);

  if (!country) {
    return (
      <div className="page">
        <h1>Неизвестна държава</h1>
        <p className="muted">Код: {code}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="country-hero" style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
        <img
          src={country.flag}
          alt={country.name}
          style={{ width: 64, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(0,0,0,.1)" }}
        />
        <div>
          <h1 style={{ margin: 0 }}>{country.name}</h1>
          <div className="muted">Местни групи (МИГ/LEADER)</div>
        </div>
      </div>

      {country.groups?.length ? (
        <div className="groups-list" style={{ display: "grid", gap: 16 }}>
          {country.groups.map((g, i) => (
            <div
              key={`${g.name}-${i}`}
              className="group-card"
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 16,
                border: "1px solid rgba(0,0,0,.06)",
                boxShadow: "0 6px 16px rgba(0,0,0,.06)",
              }}
            >
              <div
                className="group-header"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
              >
                <h3 style={{ margin: 0 }}>{g.name}</h3>
                {g.city ? (
                  <span className="badge" style={{ background: "#eef6ff", color: "#2563eb", borderRadius: 8, padding: "2px 8px", fontSize: 12 }}>
                    {g.city}
                  </span>
                ) : null}
              </div>
              {g.site ? (
                <a href={g.site} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>
                  {g.site}
                </a>
              ) : (
                <span className="muted">Няма сайт</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">Няма въведени групи.</p>
      )}
    </div>
  );
}
