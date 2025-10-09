import { Link } from "react-router-dom";
export default function FlagsMosaic({ countries }) {
  return (
    <div className="flags-wrap">
      <div className="flags-grid" role="list">
        {countries.map((c) => (
          <Link
            key={c.code}
            role="listitem"
            to={`/country/${c.code}`}
            className="flag-btn"
            aria-label={`Отвори страница за ${c.name}`}
            title={c.name}
          >
            <img src={c.flag} alt={c.name} loading="lazy" />
          </Link>
        ))}
      </div>
    </div>
  );
}
