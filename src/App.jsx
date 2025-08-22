// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="border-t bg-white py-6 mt-10">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} LeaderTV. Всички права запазени.
          </div>
        </footer>
      </div>
    </Router>
  );
}
