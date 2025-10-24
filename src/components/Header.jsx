import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const linkBase =
    "px-3 py-2 rounded-lg transition hover:bg-gray-100";
  const linkActive = ({ isActive }) =>
    isActive ? `${linkBase} bg-gray-100 font-medium` : linkBase;

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          LeaderTV
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/news" className={linkActive}>Новини</NavLink>
          <NavLink to="/events" className={linkActive}>Календар</NavLink>
        </div>
      </nav>
    </header>
  );
}
