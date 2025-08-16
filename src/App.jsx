import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import Admin from "./pages/Admin";

// Начална страница с двуколонен грид
function HomePage() {
  const news = [
    { id: 1, title: "Стартира нова програма за развитие на МИГ", date: "10.08.2025", excerpt: "Подкрепа за местни инициативи и обмен на опит." },
    { id: 2, title: "Обучение за местни инициативни групи", date: "12.08.2025", excerpt: "Интензивен уъркшоп по планиране и комуникация." },
    { id: 3, title: "Финансиране по нова мярка", date: "14.08.2025", excerpt: "Отворен прозорец за кандидатстване." },
  ];

  const events = [
    { id: 1, name: "Онлайн среща за обмен на опит", date: "20.08.2025", location: "Онлайн" },
    { id: 2, name: "Регионална конференция на МИГ", date: "05.09.2025", location: "София" },
    { id: 3, name: "Практически семинар", date: "18.09.2025", location: "Пловдив" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хедър секция */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Добре дошли в <span className="text-blue-600">LeaderTV</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Платформа за новини и събития за МИГ и партньорски организации.
        </p>
      </div>

      {/* Двуколонен грид */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Новини */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Последни новини</h2>
            <Link to="/news" className="text-sm text-blue-600 hover:underline">
              Всички новини →
            </Link>
          </div>

          <div className="space-y-4">
            {news.map((n) => (
              <article
                key={n.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="text-xs text-gray-500">{n.date}</div>
                  <h3 className="mt-1 font-semibold">{n.title}</h3>
                  <p className="mt-1 text-gray-600 text-sm">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Събития */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Предстоящи събития</h2>
            <Link to="/events" className="text-sm text-blue-600 hover:underline">
              Всички събития →
            </Link>
          </div>

          <div className="space-y-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="text-xs text-gray-500">{ev.date}</div>
                  <h3 className="mt-1 font-semibold">{ev.name}</h3>
                  <p className="mt-1 text-gray-600 text-sm">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      {/* Навигация */}
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="font-extrabold tracking-tight">LeaderTV</Link>
          <div className="ml-auto flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="opacity-90 hover:opacity-100">Начало</Link>
            <Link to="/news" className="opacity-90 hover:opacity-100">Новини</Link>
            <Link to="/events" className="opacity-90 hover:opacity-100">Събития</Link>
            <Link to="/admin" className="opacity-90 hover:opacity-100">Админ</Link>
          </div>
        </nav>
      </header>

      {/* Роутове */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* Футър */}
      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LeaderTV. Всички права запазени.
        </div>
      </footer>
    </Router>
  );
}
