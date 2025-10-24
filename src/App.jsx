import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import Events from "./pages/Events.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* HEADER */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700">
              LeaderTV
            </Link>

            <nav className="flex gap-6 text-lg font-medium">
              <Link to="/" className="hover:text-blue-600">Начало</Link>
              <Link to="/news" className="hover:text-blue-600">Новини</Link>
              <Link to="/events" className="hover:text-blue-600">Събития</Link>
              <Link to="/admin" className="hover:text-blue-600">Админ</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t text-center py-4 text-gray-600 text-sm">
          © {new Date().getFullYear()} LeaderTV
        </footer>
      </div>
    </BrowserRouter>
  );
}
