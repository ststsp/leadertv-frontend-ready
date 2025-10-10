import { Link } from "react-router-dom";

export default function FlagsMosaic({ countries = [] }) {
  if (!countries.length) return null;

    const responsive = `
    @media (min-width:640px){ .__flags { grid-template-columns: repeat(6,minmax(0,1fr)) } }
    @media (min-width:1024px){ .__flags { grid-template-columns: repeat(10,minmax(0,1fr)) } }
  `;

  return (
    <div className="flags-wrap" style={{ marginTop: 20 }}>
      <style dangerouslySetInnerHTML={{ __html: responsive }} />
      <div
        className="flags-grid __flags"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0,1fr))",
          gap: 12,
        }}
      >
        {countries.map((c) => (
          <Link
            key={c.code}
            to={`/country/${c.code.toLowerCase()}`}
            className="flag-btn"
            title={c.name}
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 10,
              padding: 8,
              border: "1px solid rgba(0,0,0,.06)",
              boxShadow: "0 6px 16px rgba(0,0,0,.06)",
            }}
          >
            <img
              src={c.flag || `https://flagcdn.com/${c.code.toLowerCase()}.svg`}
              alt={c.name}
              loading="lazy"
              style={{
                width: 44,
                height: 32,
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
