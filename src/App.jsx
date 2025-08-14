import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Admin from "./pages/Admin.jsx";

function TopBar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/leader-logo.png" alt="LeaderTV" className="h-8 w-8 rounded" />
          <span className="font-semibold text-lg">LeaderTV</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={({isActive}) => isActive ? "text-green-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
            Начало
          </NavLink>
          <NavLink to="/news" className={({isActive}) => isActive ? "text-green-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
            Новини
          </NavLink>
          <NavLink to="/events" className={({isActive}) => isActive ? "text-green-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
            Събития
          </NavLink>
          <NavLink to="/admin" className={({isActive}) => isActive ? "text-green-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
            Админ
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-50">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} LeaderTV. Всички права запазени.
          </div>
        </footer>
      </main>
    </Router>
  );
}
