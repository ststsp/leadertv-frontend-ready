// src/components/News.jsx
import React from "react";

const newsItems = [
  {
    id: 1,
    title: "Среща на МИГ в София",
    date: "2025-08-10",
    summary: "Проведе се работна среща на местни инициативни групи в София..."
  },
  {
    id: 2,
    title: "Обучение по лидерски подходи",
    date: "2025-08-05",
    summary: "МИГ от различни региони участваха в семинар по добри практики..."
  }
];

export default function News() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Новини</h2>
      <ul className="space-y-4">
        {newsItems.map(item => (
          <li key={item.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


// src/components/EventsCalendar.jsx
import React from "react";

const events = [
  {
    id: 1,
    date: "2025-09-01",
    title: "Стартира програма LEADER 2025"
  },
  {
    id: 2,
    date: "2025-09-15",
    title: "Форум за трансгранично сътрудничество"
  }
];

export function EventsCalendar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Календар на събития</h2>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="border p-4 rounded shadow">
            <p className="text-sm text-gray-500">{event.date}</p>
            <h3 className="text-xl font-semibold">{event.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
