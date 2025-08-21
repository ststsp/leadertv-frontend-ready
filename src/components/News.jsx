// src/components/News.jsx
import React, { useEffect, useState } from "react";
import * as API from "../services/api"; // <— без фигурни скоби

export default function News({ limit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await API.fetchNews(); // <— извикваме през namespace
        const list = Array.isArray(res) ? res : res?.data || [];
        if (!cancelled) {
          setItems(limit ? list.slice(0, limit) : list);
        }
      } catch (e) {
        if (!cancelled) setErr(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (loading) return <div className="text-slate-500">Зареждане…</div>;
  if (err) return <div className="text-red-600">Възникна грешка при зареждане.</div>;
  if (!items.length) return <div className="text-slate-500">Няма налични новини.</div>;

  return (
    <ul className="divide-y divide-slate-200">
      {items.map((n) => (
        <li key={n.id ?? `${n.title}-${n.date}`} className="py-3">
          <a href={`/news/${n.id}`} className="font-medium hover:underline">
            {n.title}
          </a>
          <div className="text-sm text-slate-500">
            {n.date ? new Date(n.date).toLocaleDateString("bg-BG") : null}
          </div>
          {n.excerpt ? <p className="text-slate-600 mt-1">{n.excerpt}</p> : null}
        </li>
      ))}
    </ul>
  );
}
