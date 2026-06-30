import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX ?? "/api";

export default function AdminPanel() {
  const [type, setType] = useState("news"); // "news" или "events"
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem("admin_key") || ""
  );
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAdminKeyChange(value) {
    setAdminKey(value);
    sessionStorage.setItem("admin_key", value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload =
      type === "events" ? { title, summary, date, place } : { title, summary, date };

    try {
      const res = await fetch(`${API_URL}${API_PREFIX}/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        setMessage("❌ Грешен или липсващ админ ключ.");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setMessage("✅ Успешно добавено!");
      setTitle("");
      setSummary("");
      setDate("");
      setPlace("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Грешка при запис. Проверете връзката с бекенда.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Админ панел</h1>

      <div>
        <label className="block mb-1 font-medium">Админ ключ</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          value={adminKey}
          onChange={(e) => handleAdminKeyChange(e.target.value)}
          placeholder="ADMIN_KEY от бекенда"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Временно решение, докато добавим реална система за вход (виж Фаза 1 от плана).
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setType("news")}
          className={`px-4 py-2 rounded-lg border ${
            type === "news" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Новини
        </button>
        <button
          onClick={() => setType("events")}
          className={`px-4 py-2 rounded-lg border ${
            type === "events" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Събития
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Заглавие</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Дата</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {type === "events" && (
          <div>
            <label className="block mb-1 font-medium">Място</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="напр. София, България"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Съдържание / описание</label>
          <textarea
            rows="5"
            className="w-full border rounded-lg px-3 py-2"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Записване..." : "Добави"}
        </button>
      </form>

      {message && (
        <div
          className={`text-center font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </section>
  );
}