import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../services/api'

export default function EventsCalendar() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Събития</h2>
      {events.map((e) => (
        <div key={e._id} className="border-b py-2">
          <h3 className="font-semibold">{e.title}</h3>
          <p>{e.date}</p>
        </div>
      ))}
    </div>
  )
}