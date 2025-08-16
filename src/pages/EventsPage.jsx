import React from "react";

const EventsPage = () => {
  const events = [
    {
      id: 1,
      name: "Онлайн среща за обмен на опит",
      date: "2025-08-20",
      location: "Онлайн (Zoom)",
      description: "Участниците ще обсъдят добри практики и успешни проекти, реализирани в рамките на програмата LEADER."
    },
    {
      id: 2,
      name: "Регионална конференция на МИГ",
      date: "2025-09-05",
      location: "Пловдив",
      description: "Събитие с цел представяне на нови възможности за партньорства и финансиране."
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Календар на събития</h1>
      {events.map(event => (
        <div key={event.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <p className="text-gray-500">{event.date} • {event.location}</p>
          <p className="mt-2">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;
