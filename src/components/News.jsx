import React, { useEffect, useState } from 'react'
import { fetchNews } from '../services/api'

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetchNews().then(setNews)
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Новини</h2>
      {news.map((n) => (
        <div key={n._id} className="border-b py-2">
          <h3 className="font-semibold">{n.title}</h3>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  )
}