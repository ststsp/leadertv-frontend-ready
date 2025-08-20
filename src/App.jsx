// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Навигация */}
        <NavBar />

        {/* Основно съдържание */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Футър */}
        <footer className="border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
            © 2025 LeaderTV. Всички права запазени.
          </div>
        </footer>
      </div>
    </Router>
  );
}
