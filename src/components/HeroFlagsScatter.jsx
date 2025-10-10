import { Link } from "react-router-dom";
import { countries } from "../data/countries";

/**
 * Зелен банер с “разхвърляни” знамена вляво/вдясно.
 * Всяко знаме е бутон към /country/:code.
 */
export default function HeroFlagsScatter() {
  // избираме до ~24 държави за банера (можеш да увеличиш/намалиш)
  const showcase = countries.slice(0, 24);
  const leftFlags  = showcase.filter((_, i) => i % 2 === 0);
  const rightFlags = showcase.filter((_, i) => i % 2 === 1);

  return (
    <section className="hero hero--green">
      <div className="hero-flags">
        {/* Лява “колона” знамена */}
        <div className="flags-side left">
          {leftFlags.map((c, i) => (
            <FlagCard key={c.code} country={c} idx={i} />
          ))}
        </div>

        {/* Централно съдържание */}
        <div className="hero-content">
          <h1>Добре дошли в LeaderTV</h1>
          <p>Платформа за новини и събития на МИГ и партньорски организации.</p>

          <div className="hero-cta">
            <Link to="/news" className="btn btn-light">Виж новините</Link>
            <Link to="/events" className="btn btn-outline">Календар на събитията</Link>
          </div>
        </div>

        {/* Дясна “колона” знамена */}
        <div className="flags-side right">
          {rightFlags.map((c, i) => (
            <FlagCard key={c.code} country={c} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlagCard({ country, idx }) {
  const rot = [-6, -3, -2, 2, 3, 5][idx % 6]; // малко въртене за „разхвърляно“
  return (
    <Link
      to={`/country/${country.code}`}
      className="flag-card"
      title={country.name}
      aria-label={country.name}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <img src={country.flag} alt={country.name} loading="lazy" />
    </Link>
  );
}
