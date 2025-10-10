import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage"; // новата страница

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Страница за държава по код, напр. /country/bg */}
        <Route path="/country/:code" element={<CountryPage />} />

        {/* Ако имаш други страници, остави си ги тук */}
        {/* <Route path="/news" element={<NewsPage />} /> */}
        {/* <Route path="/events" element={<EventsPage />} /> */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
