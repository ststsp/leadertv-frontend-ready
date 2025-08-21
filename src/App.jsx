// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Admin from "./pages/Admin.jsx";
// ако имаш NavBar компонент – може да го ползваш вместо хедъра по-долу
// import NavBar from "./components/NavBar.jsx";

export default function App() {
  return (
    <Router>
      <header className="bg-white border-b">
        <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold">
            <img src="/assets/LEADER-logo.png" alt="LeaderTV" className="h-6 w-6" />
            LeaderTV
          </Link>
          <ul className="flex items-center gap-6 text-sm">
            <li><Link to="/" className="hover:text-green-700">Начало</Link></li>
            <li><Link to="/news" className="hover:text-green-700">Новини</Link></li>
            <li><Link to="/events" className="hover:text-green-700">Събития</Link></li>
            <li><Link to="/admin" className="hover:text-green-700">Админ</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className="border-t bg-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} LeaderTV. Всички права запазени.
        </div>
      </footer>
    </Router>
  );
}
