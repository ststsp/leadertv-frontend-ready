import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";

import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Admin from "./pages/Admin.jsx";

function NavBar() {
  const linkBase = "text-slate-600 hover:text-slate-900 px-3 py-2 rounded";
  const linkActive = "text-green-700 font-semibold";
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl leading-none">📺</span>
          <span className="text-lg font-bold">LeaderTV</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Начало</NavLink>
          <NavLink to="/news" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Новини</NavLink>
          <NavLink to="/events" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Събития</NavLink>
          <NavLink to="/admin" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Админ</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="border-t bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500 py-6">
          © {new Date().getFullYear()} LeaderTV. Всички права запазени.
        </div>
      </footer>
    </>
  );
}
