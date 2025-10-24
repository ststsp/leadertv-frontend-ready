// src/pages/Admin.jsx
import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "/api";
const API_BASE = `${API_URL.replace(/\/$/, "")}${API_PREFIX}`;

export default function Admin() {
  // -------- Admin key (login) --------
  const [adminInput, setAdminInput] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isAuthed = useMemo(() => Boolean(adminKey), [adminKey]);

  useEffect(() => {
    const saved = sessionStorage.getItem("adminKey") || "";
    setAdminKey(saved);
    setAdminInput(saved ? "********" : "");
  }, []);

  const handleLogin = () => {
    // Ако полето е "маскирано" с ******** и вече имаме ключ — просто покажи статус
    if (adminInput === "********" && adminKey) return;
    const val = adminInput.trim();
    if (!val) {
      alert("Моля, въведи админ ключ.");
      return;
    }
    sessionStorage.setItem("adminKey", val);
    setAdminKey(val);
    alert("Успешен вход (ключът е запазен за тази сесия).");
    // Маскирай веднага полето
    setAdminInput("********");
    setShowPassword(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminKey");
    setAdminKey("");
    setAdminInput("");
  };

  // -------- Helpers for API --------
  async function api(method, path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(method !== "GET" && method !== "HEAD" && adminKey
          ? { "x-admin-key": adminKey }
          : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    // Хвани текст при грешка, за да покажем полезно съобщение
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try {
        const data = await res.json();
        if (data?.error) msg += `: ${JSON.stringify(data)}`;
      } catch {
        // ignore
      }
      throw new Error(msg);
    }
    // При 204 няма тяло
    if (res.status === 204) return null;
    return res.json();
  }

  // -------- Списъци (новини/събития) --------
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  const loadAll = async () => {
    try {
      const [n, e] = await Promise.all([api("GET", "/news"), api("GET", "/events")]);
      setNews(n || []);
      setEvents(e || []);
    } catch (err) {
      console.error(err);
      // не блокирай UI
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // -------- Публикуване: новина --------
  const [nTitle, setNTitle] = useState("");
  const [nDate, setNDate] = useState("");
  const [nBody, setNBody] = useState("");

  const submitNews = async () => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    if (!nTitle.trim() || !nDate.trim() || !nBody.trim())
      return alert("Попълни заглавие, дата и текст.");
    try {
      await api("POST", "/news", { title: nTitle, date: nDate, body: nBody });
      alert("Новината е публикувана.");
      setNTitle("");
      setNDate("");
      setNBody("");
      loadAll();
    } catch (err) {
      alert(`Проблем при публикуване: ${err.message}`);
    }
  };

  // -------- Публикуване: събитие --------
  const [eTitle, setETitle] = useState("");
  const [eDate, setEDate] = useState("");
  const [eLocation, setELocation] = useState("");

  const submitEvent = async () => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    if (!eTitle.trim() || !eDate.trim())
      return alert("Попълни заглавие и дата (локацията е по желание).");
    try {
      await api("POST", "/events", { title: eTitle, date: eDate, location: eLocation });
      alert("Събитието е публикувано.");
      setETitle("");
      setEDate("");
      setELocation("");
      loadAll();
    } catch (err) {
      alert(`Проблем при публикуване: ${err.message}`);
    }
  };

  // -------- Редакция/Изтриване --------
  const editNews = async (item) => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    const title = prompt("Заглавие:", item.title ?? "");
    if (title === null) return;
    const date = prompt("Дата (YYYY-MM-DD):", item.date ?? "");
    if (date === null) return;
    const body = prompt("Текст:", item.body ?? "");
    if (body === null) return;
    try {
      await api("PUT", `/news/${item.id}`, { title, date, body });
      alert("Новината е обновена.");
      loadAll();
    } catch (err) {
      alert(`Проблем при редакция: ${err.message}`);
    }
  };

  const deleteNews = async (item) => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    if (!confirm("Сигурни ли сте, че искате да изтриете тази новина?")) return;
    try {
      await api("DELETE", `/news/${item.id}`);
      loadAll();
    } catch (err) {
      alert(`Проблем при изтриване: ${err.message}`);
    }
  };

  const editEvent = async (item) => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    const title = prompt("Заглавие:", item.title ?? "");
    if (title === null) return;
    const date = prompt("Дата (YYYY-MM-DD):", item.date ?? "");
    if (date === null) return;
    const location = prompt("Локация:", item.location ?? "");
    if (location === null) return;
    try {
      await api("PUT", `/events/${item.id}`, { title, date, location });
      alert("Събитието е обновено.");
      loadAll();
    } catch (err) {
      alert(`Проблем при редакция: ${err.message}`);
    }
  };

  const deleteEvent = async (item) => {
    if (!isAuthed) return alert("Първо влез с админ ключ.");
    if (!confirm("Сигурни ли сте, че искате да изтриете това събитие?")) return;
    try {
      await api("DELETE", `/events/${item.id}`);
      loadAll();
    } catch (err) {
      alert(`Проблем при изтриване: ${err.message}`);
    }
  };

  // -------- UI helpers --------
  const chipStyle = (ok) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 10,
    background: ok ? "#DCFCE7" : "#F3F4F6",
    color: ok ? "#166534" : "#374151",
    border: `1px solid ${ok ? "#86efac" : "#e5e7eb"}`,
  });

  const btn = {
    base: {
      padding: "8px 14px",
      borderRadius: 8,
      border: "1px solid #e5e7eb",
      cursor: "pointer",
      fontWeight: 600,
      background: "#f9fafb",
    },
    primary: {
      background: "#16a34a",
      color: "#fff",
      borderColor: "#16a34a",
    },
    danger: {
      background: "#ef4444",
      color: "#fff",
      borderColor: "#ef4444",
    },
    warn: {
      background: "#f59e0b",
      color: "#fff",
      borderColor: "#f59e0b",
    },
  };

  const card = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  };

  return (
    <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Админ панел</h1>

      {/* Login row */}
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ minWidth: 90, fontWeight: 600 }}>Админ ключ:</label>

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={adminInput}
            onChange={(e) => setAdminInput(e.target.value)}
            placeholder="въведи парола…"
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              minWidth: 260,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Скрий паролата" : "Покажи паролата"}
            style={{
              ...btn.base,
              position: "relative",
              marginLeft: 8,
            }}
          >
            {showPassword ? "Скрий" : "Покажи"}
          </button>
        </div>

        <button type="button" onClick={handleLogin} style={{ ...btn.base, ...btn.primary }}>
          Вход
        </button>
        <button type="button" onClick={handleLogout} style={{ ...btn.base }}>
          Изход
        </button>

        <span style={{ marginLeft: "auto", fontSize: 14 }}>
          API:{" "}
          <a href={API_BASE} target="_blank" rel="noreferrer">
            {API_BASE}
          </a>
          <span style={chipStyle(isAuthed)}>{isAuthed ? "Влязъл" : "Не влязъл"}</span>
        </span>
      </div>

      {/* Forms */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
          marginTop: 8,
        }}
      >
        {/* News form */}
        <div style={card}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Публикувай новина</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Заглавие"
              value={nTitle}
              onChange={(e) => setNTitle(e.target.value)}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <input
              placeholder="Дата (YYYY-MM-DD)"
              value={nDate}
              onChange={(e) => setNDate(e.target.value)}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <textarea
              placeholder="Текст"
              rows={6}
              value={nBody}
              onChange={(e) => setNBody(e.target.value)}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <div>
              <button onClick={submitNews} style={{ ...btn.base, ...btn.primary }}>
                Публикувай
              </button>
            </div>
          </div>

          <h3 style={{ marginTop: 18, marginBottom: 6 }}>Последни новини</h3>
          {news.length === 0 ? (
            <div style={{ color: "#6b7280" }}>Няма записи.</div>
          ) : (
            news
              .slice()
              .reverse()
              .map((n) => (
                <div key={n.id} style={{ ...card, marginBottom: 10 }}>
                  <div style={{ fontWeight: 700 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{n.date}</div>
                  {n.body ? <div style={{ marginTop: 6 }}>{n.body}</div> : null}
                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <button onClick={() => editNews(n)} style={{ ...btn.base, ...btn.warn }}>
                      Редакция
                    </button>
                    <button onClick={() => deleteNews(n)} style={{ ...btn.base, ...btn.danger }}>
                      Изтриване
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Events form */}
        <div style={card}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Публикувай събитие</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              placeholder="Заглавие"
              value={eTitle}
              onChange={(e) => setETitle(e.target.value)}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                placeholder="Дата (YYYY-MM-DD)"
                value={eDate}
                onChange={(e) => setEDate(e.target.value)}
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
              />
              <input
                placeholder="Локация"
                value={eLocation}
                onChange={(e) => setELocation(e.target.value)}
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
              />
            </div>
            <div>
              <button onClick={submitEvent} style={{ ...btn.base, ...btn.primary }}>
                Публикувай
              </button>
            </div>
          </div>

          <h3 style={{ marginTop: 18, marginBottom: 6 }}>Предстоящи събития</h3>
          {events.length === 0 ? (
            <div style={{ color: "#6b7280" }}>Няма записи.</div>
          ) : (
            events
              .slice()
              .reverse()
              .map((e) => (
                <div key={e.id} style={{ ...card, marginBottom: 10 }}>
                  <div style={{ fontWeight: 700 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {e.date} {e.location ? `• ${e.location}` : ""}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                    <button onClick={() => editEvent(e)} style={{ ...btn.base, ...btn.warn }}>
                      Редакция
                    </button>
                    <button onClick={() => deleteEvent(e)} style={{ ...btn.base, ...btn.danger }}>
                      Изтриване
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
