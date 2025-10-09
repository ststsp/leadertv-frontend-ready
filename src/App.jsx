import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
// (ако имаш още страници – импортирай си ги)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* новият рут */}
        <Route path="/country/:code" element={<CountryPage />} />
        {/* другите ти рутове */}
      </Routes>
    </BrowserRouter>
  );
}
