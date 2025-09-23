import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'
import AdminPage from './pages/AdminPage'


export default function App() {
return (
<div className="min-h-screen flex flex-col bg-gray-50">
<Navbar />
<main className="flex-1 container mx-auto px-4 py-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/news" element={<NewsPage />} />
<Route path="/events" element={<EventsPage />} />
<Route path="/admin" element={<AdminPage />} />
<Route path="*" element={<Home />} />
</Routes>
</main>
<Footer />
</div>
)
}