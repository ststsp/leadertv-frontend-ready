import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD ?? "";

async function apiGet(path) {
  const r = await fetch(`${API}${path}`);
  if (!r.ok) throw new Error(`GET ${path} -> ${r.status}`);
  return r.json();
}
async function apiPost(path, body) {
  const r = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`POST ${path} -> ${r.status}`);
  return r.json();
}
async function apiDel(path) {
  const r = await fetch(`${API}${path}`, { method: "DELETE" });
  if (!r.ok) throw new Error(`DELETE ${path} -> ${r.status}`);
  return r.json();
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  const [newsForm, setNewsForm] = useState({ title: "", date: "", content: "", link: "" });
  const [eventForm, setEventForm] = useState({ title: "", start: "", location: "" });

  // ако е логнат -> зареди данните
  useEffect(() => {
    if (!authed) return;
    (async () => {
      try {
        const [n, e] = await Promise.all([apiGet("/api/news"), apiGet("/api/events")]);
        setNews(n);
        setEvents(e);
      } catch (e) {
        console.error(e);
        setErr("Неуспешно зареждане на данни.");
      }
    })();
  }, [authed]);

  function handleLogin(e) {
    e.preventDefault();
    if (pass === ADMIN_PASS && pass.length > 0) {
      setAuthed(true);
      setErr("");
    } else {
      setErr("Невалидна парола.");
    }
  }

  async function addNews(e) {
    e.preventDefault();
    try {
      const created = await apiPost("/api/news", newsForm);
      setNews([created, ...news]);
      setNewsForm({ title: "", date: "", content: "", link: "" });
    } catch (e) {
      console.error(e);
      alert("Грешка при добавяне на новина");
    }
  }
  async function deleteNews(id) {
    if (!confirm("Изтриване на новина?")) return;
    try {
      await apiDel(`/api/news/${id}`);
      setNews(news.filter(n => n.id !== id));
    } catch (e) {
      console.error(e);
      alert("Грешка при изтриване");
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    try {
      const created = await apiPost("/api/events", eventForm);
      setEvents([created, ...events]);
      setEventForm({ title: "", start: "", location: "" });
    } catch (e) {
      console.error(e);
      alert("Грешка при добавяне на събитие");
    }
  }
  async function deleteEvent(id) {
    if (!confirm("Изтриване на събитие?")) return;
    try {
      await apiDel(`/api/events/${id}`);
      setEvents(events.filter(x => x.id !== id));
    } catch (e) {
      console.error(e);
      alert("Грешка при изтриване");
    }
  }

  // --------- UI ---------
  if (!authed) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin вход</h1>
        <form onSubmit={handleLogin} className="max-w-sm space-y-3">
          <input
            type="password"
            className="border rounded px-3 py-2 w-full"
            placeholder="Парола"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Вход</button>
        </form>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 space-y-10">
      <h1 className="text-2xl font-bold">Админ панел</h1>

      {/* Новини */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Новини</h2>
        <form onSubmit={addNews} className="grid gap-2 max-w-2xl">
          <input className="border rounded px-3 py-2" placeholder="Заглавие"
                 value={newsForm.title} onChange={e=>setNewsForm({...newsForm, title:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Дата (YYYY-MM-DD)"
                 value={newsForm.date} onChange={e=>setNewsForm({...newsForm, date:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Резюме/съдържание"
                 value={newsForm.content} onChange={e=>setNewsForm({...newsForm, content:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Външен линк (по избор)"
                 value={newsForm.link} onChange={e=>setNewsForm({...newsForm, link:e.target.value})}/>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-max">Добави новина</button>
        </form>

        <div className="divide-y">
          {news.map(n => (
            <div key={n.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-500">{n.date}</div>
              </div>
              <button onClick={()=>deleteNews(n.id)} className="text-red-600">Изтрий</button>
            </div>
          ))}
          {news.length === 0 && <p className="text-gray-500 p-3">Няма новини.</p>}
        </div>
      </section>

      {/* Събития */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Събития</h2>
        <form onSubmit={addEvent} className="grid gap-2 max-w-2xl">
          <input className="border rounded px-3 py-2" placeholder="Заглавие"
                 value={eventForm.title} onChange={e=>setEventForm({...eventForm, title:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Начало (YYYY-MM-DDTHH:mm)"
                 value={eventForm.start} onChange={e=>setEventForm({...eventForm, start:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Локация"
                 value={eventForm.location} onChange={e=>setEventForm({...eventForm, location:e.target.value})}/>
          <button className="bg-green-600 text-white px-4 py-2 rounded w-max">Добави събитие</button>
        </form>

        <div className="divide-y">
          {events.map(ev => (
            <div key={ev.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-gray-500">{ev.start} • {ev.location}</div>
              </div>
              <button onClick={()=>deleteEvent(ev.id)} className="text-red-600">Изтрий</button>
            </div>
          ))}
          {events.length === 0 && <p className="text-gray-500 p-3">Няма събития.</p>}
        </div>
      </section>
    </main>
  );
}
