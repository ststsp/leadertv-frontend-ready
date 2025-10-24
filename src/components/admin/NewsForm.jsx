import { useEffect, useState } from "react";

export default function NewsForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? "");
      setSummary(initial.summary ?? initial.content ?? "");
      setDate(initial.date ? new Date(initial.date).toISOString().slice(0, 10) : "");
    }
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      summary: summary.trim(),
      date: date ? new Date(date).toISOString() : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Заглавие</label>
        <input className="w-full border rounded-lg px-3 py-2"
               value={title} onChange={(e)=>setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Резюме</label>
        <textarea className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
                  value={summary} onChange={(e)=>setSummary(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Дата</label>
        <input type="date" className="border rounded-lg px-3 py-2"
               value={date} onChange={(e)=>setDate(e.target.value)} />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Запази</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border">Отказ</button>
      </div>
    </form>
  );
}
