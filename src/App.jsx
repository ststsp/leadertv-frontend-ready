import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryPage from "./pages/CountryPage.jsx";

function Nav() {
  return (
    <nav style={{ background: "#fff", boxShadow: "var(--shadow)" }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", gap: 18, padding: "12px 20px"
      }}>
        <div className="header-brand" style={{ marginRight: "auto" }}>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span role="img" aria-label="tv">📺</span> LeaderTV
          </NavLink>
        </div>
        <NavLink to="/" end>Начало</NavLink>
        <NavLink to="/news">Новини</NavLink>
        <NavLink to="/events">Събития</NavLink>
        <NavLink to="/admin">Админ</NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryPage />} />
        {/* Остави следните, ако съществуват страници – не пречат */}
        <Route path="/news" element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/admin" element={<Home />} />
        {/* 404 */}
        <Route path="*" element={
          <div className="container" style={{ padding: "28px 0" }}>
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Страницата не е намерена</h2>
              <p><Link to="/">← Назад към началото</Link></p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
