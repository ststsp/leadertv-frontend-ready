const API_URL = import.meta.env.VITE_API_URL

export async function fetchNews() {
  const res = await fetch(`${API_URL}/api/news`)
  return res.json()
}

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/api/events`)
  return res.json()
}