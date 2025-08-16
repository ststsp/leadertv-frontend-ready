import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL;
const SECRET = import.meta.env.VITE_ADMIN_PASSWORD || "";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": SECRET,
      ...(options.headers || {}),
    },
  });
  if (res.ok) return res.status === 204 ? null : res.json();
  const text = await res.text();
  throw new Error(text || `HTTP ${res.status}`);
}

export default function AdminPanel() {
  const [pass, setPass] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  const [nTitle, setNTitle] = useState("");
  const [nDate, setNDate] = useState("");
  const [nContent, setNContent] = useState("");
  const [nLink, setNLink] = useState("");

  const [eTitle, setETitle] = useState("");
  const [eStart, setEStart] = useState("");
  const [eLocation, setELocation] = useState("");

  const canUse = useMemo(() => isAuthed, [isAuthed]);

  async function loadAll() {
    const [n, e] = await Promise.all([
      request("/api/news"),
      request("/api/events"),
    ]);
    setNews(n);
    setEvents(e);
  }

  useEffect(() => {
    if (canUse) loadAll().catch(console.error);
  }, [canUse]);

  function handleLogin(e) {
    e.preventDefault();
    if (!SECRET) {
      alert("Липсва VITE_ADMIN_PASSWORD в .env на фронтенда.");
      return;
    }
    if (pass.trim() === SECRET.trim()) setIsAuthed(true);
    else alert("Невалидна парола");
  }

  async function addNews(e) {
    e.preventDefault();
    await request("/api/news", {
      method: "POST",
      body: JSON.stringify({
        title: nTitle,
        date: nDate,
        content: nContent,
        link: nLink || null,
      }),
    });
    setNTitle(""); setNDate(""); setNContent(""); setNLink("");
    await loadAll();
  }

  async function addEvent(e) {
    e.preventDefault();
    await request("/api/events", {
      method: "POST",
      body: JSON.stringify({
        title: eTitle,
        start: eStart,
        location: eLocation,
      }),
    });
    setETitle(""); setEStart(""); setELocation("");
    await loadAll();
  }

  async function delNews(id) {
    if (!confirm("Да изтрия ли тази новина?")) return;
    await request(`/api/news/${id}`, { method: "DELETE" });
    await loadAll();
  }

  async function delEvent(id) {
    if (!confirm("Да изтрия ли това събитие?")) return;
    await request(`/api/events/${id}`, { method: "DELETE" });
    await loadAll();
  }

  if (!canUse) {
    return (
      <div className="container mx-auto max-w-2xl py-10">
        <h1 className="text-2xl font-semibold mb-6">Admin вход</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Парола"
            className="w-full border rounded px-3 py-2"
          />
          <button className="bg-blue-600 text-white rounded px-4 py-2">Вход</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-8">Админ панел</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Новини</h2>
        <form onSubmit={addNews} className="grid md:grid-cols-2 gap-3 mb-4">
          <input value={nTitle} onChange={(e) => setNTitle(e.target.value)} className="border rounded px-3 py-2" placeholder="Заглавие" required />
          <input value={nDate} onChange={(e) => setNDate(e.target.value)} className="border rounded px-3 py-2" placeholder="Дата (YYYY-MM-DD)" required />
          <input value={nContent} onChange={(e) => setNContent(e.target.value)} className="md:col-span-2 border rounded px-3 py-2" placeholder="Резюме / съдържание" required />
          <input value={nLink} onChange={(e) => setNLink(e.target.value)} className="md:col-span-2 border rounded px-3 py-2" placeholder="Външен линк (опционално)" />
          <div className="md:col-span-2">
            <button className="bg-green-600 text-white rounded px-4 py-2">Добави новина</button>
          </div>
        </form>

        <ul className="space-y-2">
          {news.map((n) => (
            <li key={n.id} className="flex items-start justify-between border rounded p-3">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-sm opacity-70">{n.date}</div>
                {n.link ? <a className="text-sm underline" href={n.link} target="_blank">линк</a> : null}
              </div>
              <button className="text-red-600" onClick={() => delNews(n.id)}>Изтрий</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Събития</h2>
        <form onSubmit={addEvent} className="grid md:grid-cols-3 gap-3 mb-4">
          <input value={eTitle} onChange={(e) => setETitle(e.target.value)} className="border rounded px-3 py-2" placeholder="Заглавие" required />
          <input value={eStart} onChange={(e) => setEStart(e.target.value)} className="border rounded px-3 py-2" placeholder="Начало (YYYY-MM-DD или YYYY-MM-DDTHH:mm)" required />
          <input value={eLocation} onChange={(e) => setELocation(e.target.value)} className="border rounded px-3 py-2" placeholder="Локация" required />
          <div className="md:col-span-3">
            <button className="bg-green-600 text-white rounded px-4 py-2">Добави събитие</button>
          </div>
        </form>

        <ul className="space-y-2">
          {events.map((ev) => (
            <li key={ev.id} className="flex items-start justify-between border rounded p-3">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm opacity-70">{ev.start} · {ev.location}</div>
              </div>
              <button className="text-red-600" onClick={() => delEvent(ev.id)}>Изтрий</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
