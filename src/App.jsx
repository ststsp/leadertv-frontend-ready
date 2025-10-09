import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Начало */}
        <Route path="/" element={<Home />} />

        {/* Страница по държава (изисква файл src/pages/CountryPage.jsx) */}
        <Route path="/country/:code" element={<CountryPage />} />

        {/* Примерни – ако ги имате вече, нека си останат вашите реални компоненти */}
        {/* <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin" element={<AdminPage />} /> */}

        {/* 404 – по избор */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
