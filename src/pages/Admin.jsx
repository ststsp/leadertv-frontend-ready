import { useEffect, useMemo, useState } from "react";

const apiBase = (() => {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
  const pref = import.meta.env.VITE_API_PREFIX || "/api";
  return `${base}${pref}`;
})();

function useAdminKey() {
  const [key, setKey] = useState(() => localStorage.getItem("adminKey") || "");
  const save = (k) => { setKey(k); localStorage.setItem("adminKey", k); };
  const clear = () => { setKey(""); localStorage.removeItem("adminKey"); };
  return { key, save, clear };
}

async function apiJson(url, { method = "GET", body, adminKey } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(adminKey ? { "x-admin-key": adminKey } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${t || res.statusText}`);
  }
  return res.json();
}

export default function AdminPage() {
  const { key, save, clear } = useAdminKey();
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [nTitle, setNTitle] = useState("");
  const [nDate, setNDate] = useState("");
  const [nBody, setNBody] = useState("");
  const [eTitle, setETitle] = useState("");
  const [eDate, setEDate] = useState("");
  const [eLoc, setELoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const endpoints = useMemo(() => ({
    news: `${apiBase}/news`,
    events: `${apiBase}/events`,
  }), []);

  const loadAll = async () => {
    setErr("");
    try {
      const [n, e] = await Promise.all([
        apiJson(endpoints.news),
        apiJson(endpoints.events),
      ]);
      setNews(n);
      setEvents(e);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => { loadAll(); /* on mount */ }, []);

  const submitNews = async (ev) => {
    ev.preventDefault();
    setLoading(true); setErr("");
    try {
      await apiJson(endpoints.news, {
        method: "POST",
        body: { title: nTitle, date: nDate, body: nBody },
        adminKey: key,
      });
      setNTitle(""); setNDate(""); setNBody("");
      await loadAll();
      alert("Новината е публикувана.");
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const submitEvent = async (ev) => {
    ev.preventDefault();
    setLoading(true); setErr("");
    try {
      await apiJson(endpoints.events, {
        method: "POST",
        body: { title: eTitle, date: eDate, location: eLoc },
        adminKey: key,
      });
      setETitle(""); setEDate(""); setELoc("");
      await loadAll();
      alert("Събитието е публикувано.");
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Админ панел</h1>

      {/* Login box */}
      <div className="mb-8 rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <label className="font-medium">Админ ключ:</label>
        <input
          type="password"
          className="border rounded px-3 py-2 w-72"
          placeholder="въведи парола..."
          value={key}
          onChange={(e) => save(e.target.value)}
        />
        <button
          className="ml-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => clear()}
          type="button"
        >Изчисти</button>
        <div className="text-sm text-gray-500 ml-auto">
          API: <code>{apiBase}</code>
        </div>
      </div>

      {err && <div className="mb-6 p-3 rounded bg-red-50 text-red-700">{err}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Новина */}
        <form onSubmit={submitNews} className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold mb-4">Публикувай новина</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Заглавие</label>
              <input className="w-full border rounded px-3 py-2"
                value={nTitle} onChange={(e) => setNTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Дата (YYYY-MM-DD)</label>
              <input className="w-full border rounded px-3 py-2"
                value={nDate} onChange={(e) => setNDate(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Текст</label>
              <textarea className="w-full border rounded px-3 py-2 min-h-[120px]"
                value={nBody} onChange={(e) => setNBody(e.target.value)} required />
            </div>
            <button
              disabled={loading || !key}
              className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
            >
              Публикувай
            </button>
            {!key && <p className="text-sm text-gray-500">Въведи админ ключ, за да публикуваш.</p>}
          </div>
        </form>

        {/* Събитие */}
        <form onSubmit={submitEvent} className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold mb-4">Публикувай събитие</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Заглавие</label>
              <input className="w-full border rounded px-3 py-2"
                value={eTitle} onChange={(e) => setETitle(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Дата</label>
                <input className="w-full border rounded px-3 py-2"
                  value={eDate} onChange={(e) => setEDate(e.target.value)} placeholder="YYYY-MM-DD" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Локация</label>
                <input className="w-full border rounded px-3 py-2"
                  value={eLoc} onChange={(e) => setELoc(e.target.value)} required />
              </div>
            </div>
            <button
              disabled={loading || !key}
              className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Публикувай
            </button>
          </div>
        </form>
      </div>

      {/* Списъци */}
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-lg font-semibold mb-3">Последни новини</h3>
          <div className="space-y-2">
            {news.map(n => (
              <div key={n.id} className="border rounded p-3">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-500">{n.date}</div>
                <div className="text-sm mt-1 whitespace-pre-wrap">{n.body}</div>
              </div>
            ))}
            {!news.length && <div className="text-sm text-gray-500">Няма записи.</div>}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Предстоящи събития</h3>
          <div className="space-y-2">
            {events.map(e => (
              <div key={e.id} className="border rounded p-3">
                <div className="font-medium">{e.title}</div>
                <div className="text-sm text-gray-500">{e.date} · {e.location}</div>
              </div>
            ))}
            {!events.length && <div className="text-sm text-gray-500">Няма записи.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
