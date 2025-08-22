import { Link, NavLink } from "react-router-dom";
import { Tv } from "lucide-react";

const navItems = [
  { to: "/", label: "Начало" },
  { to: "/news", label: "Новини" },
  { to: "/events", label: "Събития" },
  { to: "/admin", label: "Админ" },
];

export default function NavBar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ЛОГО: иконка + LeaderTV (само веднъж) */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Tv className="w-6 h-6 text-green-600 group-hover:text-green-700 transition" />
            <span className="text-xl font-bold text-gray-900">
              LeaderTV
            </span>
          </Link>

          {/* Меню */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative transition duration-300",
                    "text-gray-700 hover:text-green-700",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-green-600 after:transition-all after:duration-300",
                    isActive ? "after:w-full text-green-700" : "after:w-0 hover:after:w-full",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
