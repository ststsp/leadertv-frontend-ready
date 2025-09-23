import { useEffect, useMemo, useState } from "react";

/* --- Нормализиран API base (махаме крайни . и /) --- */
const apiBase = (() => {
  const rawBase = import.meta.env.VITE_API_URL || "";
  const base = rawBase.replace(/[./]+$/, "");
  const prefRaw = import.meta.env.VITE_API_PREFIX || "/api";
  const pref = prefRaw.startsWith("/") ? prefRaw : `/${prefRaw}`;
  return `${base}${pref}`;
})();

/* --- Admin key (локално в браузъра) --- */
function useAdminKey() {
  const [key, setKey] = useState(() => localStorage.getItem("adminKey") || "");
  const save = (k) => {
    setKey(k);
    localStorage.setItem("adminKey", k);
  };
  const clear = () => {
    setKey("");
    localStorage.removeItem("adminKey");
  };
  return { key, save, clear };
}

/* --- Fetch helper --- */
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
  if (res.status === 204) return null;
  return res.json();
}

export default function AdminPage() {
  const { key, save, clear } = useAdminKey();

  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  // форми за създаване
  const [nTitle, setNTitle] = useState("");
  const [nDate, setNDate] = useState("");
  const [nBody, setNBody] = useState("");
  const [eTitle, setETitle] = useState("");
  const [eDate, setEDate] = useState("");
  const [eLoc, setELoc] = useState("");

  // редакция
  const [editType, setEditType] = useState(null); // "news" | "events" | null
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // login state
  const [logged, setLogged] = useState(() => !!localStorage.getItem("adminKey"));
  const [loginStatus, setLoginStatus] = useState("idle"); // idle | checking | ok | bad

  const endpoints = useMemo(
    () => ({
      news: `${apiBase}/news`,
      events: `${apiBase}/events`,
    }),
    []
  );

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

  useEffect(() => {
    loadAll();
  }, []); // on mount

  /* ---------- LOGIN / LOGOUT ---------- */
  const verifyKey = async () => {
    if (!key) {
      setLogged(false);
      setLoginStatus("bad");
      return;
    }
    setLoginStatus("checking");
    try {
      // DELETE до невалидно id: при валиден ключ -> 404, при невалиден -> 401
      const res = await fetch(`${endpoints.news}/__verify__`, {
        method: "DELETE",
        headers: { "x-admin-key": key, "Content-Type": "application/json" },
      });
      if (res.status === 401) {
        setLogged(false);
        setLoginStatus("bad");
        return;
      }
      setLogged(true);
      setLoginStatus("ok");
    } catch {
      setLogged(false);
      setLoginStatus("bad");
    }
  };

  const logout = () => {
    clear();
    setLogged(false);
    setLoginStatus("idle");
  };

  /* ---------- CREATE ---------- */
  const submitNews = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await apiJson(endpoints.news, {
        method: "POST",
        body: { title: nTitle, date: nDate, body: nBody },
        adminKey: key,
      });
      setNTitle("");
      setNDate("");
      setNBody("");
      await loadAll();
      alert("Новината е публикувана.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitEvent = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await apiJson(endpoints.events, {
        method: "POST",
        body: { title: eTitle, date: eDate, location: eLoc },
        adminKey: key,
      });
      setETitle("");
      setEDate("");
      setELoc("");
      await loadAll();
      alert("Събитието е публикувано.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- EDIT ---------- */
  const beginEdit = (type, item) => {
    setEditType(type);
    setEditId(item.id || item._id);
    if (type === "news") {
      setEditData({
        title: item.title || "",
        date: item.date || "",
        body: item.body || "",
      });
    } else {
      setEditData({
        title: item.title || "",
        date: item.date || "",
        location: item.location || "",
      });
    }
  };

  const cancelEdit = () => {
    setEditType(null);
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editType || !editId) return;
    const url =
      editType === "news"
        ? `${endpoints.news}/${editId}`
        : `${endpoints.events}/${editId}`;
    setLoading(true);
    setErr("");
    try {
      await apiJson(url, { method: "PUT", body: editData, adminKey: key });
      await loadAll();
      cancelEdit();
      alert("Промените са записани.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE ---------- */
  const deleteItem = async (type, id) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете?")) return;
    const url =
      type === "news" ? `${endpoints.news}/${id}` : `${endpoints.events}/${id}`;
    setLoading(true);
    setErr("");
    try {
      await apiJson(url, { method: "DELETE", adminKey: key });
      await loadAll();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = (type, id) => editType === type && editId === (id || null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Админ панел</h1>

      {/* Login box */}
      <div className="mb-8 rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3">
        <label className="font-medium">Админ ключ:</label>
        <input
          type="password"
          className="border rounded px-3 py-2 w-72"
          placeholder="въведи парола..."
          value={key}
          onChange={(e) => save(e.target.value)}
        />
        <button
          type="button"
          onClick={verifyKey}
          className="px-3 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
          disabled={!key || loginStatus === "checking"}
        >
          {loginStatus === "checking" ? "Проверка..." : "Вход"}
        </button>
        <button
          type="button"
          onClick={logout}
          className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Изход
        </button>

        <div className="ml-auto text-sm text-gray-500">
          API: <code>{apiBase}</code>
        </div>

        {loginStatus === "ok" && (
          <div className="text-emerald-600 text-sm">Влязъл</div>
        )}
        {loginStatus === "bad" && (
          <div className="text-rose-600 text-sm">Невалиден ключ</div>
        )}
      </div>

      {err && (
        <div className="mb-6 p-3 rounded bg-red-50 text-red-700">{err}</div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Новина */}
        <form onSubmit={submitNews} className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold mb-4">Публикувай новина</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Заглавие</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={nTitle}
                onChange={(e) => setNTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Дата (YYYY-MM-DD)</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={nDate}
                onChange={(e) => setNDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Текст</label>
              <textarea
                className="w-full border rounded px-3 py-2 min-h-[120px]"
                value={nBody}
                onChange={(e) => setNBody(e.target.value)}
                required
              />
            </div>
            <button
              disabled={loading || !logged}
              className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
            >
              Публикувай
            </button>
            {!logged && (
              <p className="text-sm text-gray-500">
                Натисни „Вход“, за да активираш публикуването.
              </p>
            )}
          </div>
        </form>

        {/* Събитие */}
        <form onSubmit={submitEvent} className="rounded-2xl border p-5">
          <h2 className="text-xl font-semibold mb-4">Публикувай събитие</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Заглавие</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={eTitle}
                onChange={(e) => setETitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Дата</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={eDate}
                  onChange={(e) => setEDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Локация</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={eLoc}
                  onChange={(e) => setELoc(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              disabled={loading || !logged}
              className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Публикувай
            </button>
          </div>
        </form>
      </div>

      {/* Списъци */}
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* NEWS LIST */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Последни новини</h3>
          <div className="space-y-2">
            {news.map((n) => {
              const id = n.id || n._id;
              const editing = isEditing("news", id);
              return (
                <div key={id} className="border rounded p-3">
                  {!editing ? (
                    <>
                      <div className="font-medium">{n.title}</div>
                      <div className="text-sm text-gray-500">{n.date}</div>
                      <div className="text-sm mt-1 whitespace-pre-wrap">
                        {n.body}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-amber-500 text-white"
                          onClick={() => beginEdit("news", n)}
                          type="button"
                          disabled={!logged}
                        >
                          Редакция
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-rose-600 text-white"
                          onClick={() => deleteItem("news", id)}
                          type="button"
                          disabled={!logged}
                        >
                          Изтриване
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <input
                          className="border rounded px-2 py-1"
                          value={editData.title || ""}
                          onChange={(e) =>
                            setEditData((d) => ({ ...d, title: e.target.value }))
                          }
                        />
                        <input
                          className="border rounded px-2 py-1"
                          value={editData.date || ""}
                          onChange={(e) =>
                            setEditData((d) => ({ ...d, date: e.target.value }))
                          }
                          placeholder="YYYY-MM-DD"
                        />
                        <textarea
                          className="border rounded px-2 py-1 min-h-[90px]"
                          value={editData.body || ""}
                          onChange={(e) =>
                            setEditData((d) => ({ ...d, body: e.target.value }))
                          }
                        />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-emerald-600 text-white"
                          onClick={saveEdit}
                          type="button"
                          disabled={!logged || loading}
                        >
                          Запази
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-gray-200"
                          onClick={cancelEdit}
                          type="button"
                          disabled={loading}
                        >
                          Откажи
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            {!news.length && (
              <div className="text-sm text-gray-500">Няма записи.</div>
            )}
          </div>
        </section>

        {/* EVENTS LIST */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Предстоящи събития</h3>
          <div className="space-y-2">
            {events.map((e) => {
              const id = e.id || e._id;
              const editing = isEditing("events", id);
              return (
                <div key={id} className="border rounded p-3">
                  {!editing ? (
                    <>
                      <div className="font-medium">{e.title}</div>
                      <div className="text-sm text-gray-500">
                        {e.date} · {e.location}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-amber-500 text-white"
                          onClick={() => beginEdit("events", e)}
                          type="button"
                          disabled={!logged}
                        >
                          Редакция
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-rose-600 text-white"
                          onClick={() => deleteItem("events", id)}
                          type="button"
                          disabled={!logged}
                        >
                          Изтриване
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <input
                          className="border rounded px-2 py-1"
                          value={editData.title || ""}
                          onChange={(ev) =>
                            setEditData((d) => ({ ...d, title: ev.target.value }))
                          }
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            className="border rounded px-2 py-1"
                            value={editData.date || ""}
                            onChange={(ev) =>
                              setEditData((d) => ({ ...d, date: ev.target.value }))
                            }
                            placeholder="YYYY-MM-DD"
                          />
                          <input
                            className="border rounded px-2 py-1"
                            value={editData.location || ""}
                            onChange={(ev) =>
                              setEditData((d) => ({
                                ...d,
                                location: ev.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-emerald-600 text-white"
                          onClick={saveEdit}
                          type="button"
                          disabled={!logged || loading}
                        >
                          Запази
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-gray-200"
                          onClick={cancelEdit}
                          type="button"
                          disabled={loading}
                        >
                          Откажи
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            {!events.length && (
              <div className="text-sm text-gray-500">Няма записи.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
