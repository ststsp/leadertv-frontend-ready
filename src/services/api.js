const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')
const API_PREFIX = (import.meta.env.VITE_API_PREFIX || '/api').replace(/\/+$/, '')
const BASE = `${API_URL}${API_PREFIX}`


async function http(method, url, data){
const res = await fetch(`${BASE}${url}`, {
method,
headers: { 'Content-Type': 'application/json' },
body: data ? JSON.stringify(data) : undefined,
})
if(!res.ok){
const text = await res.text().catch(()=> '')
throw new Error(`${res.status} ${res.statusText}: ${text}`)
}
const ct = res.headers.get('content-type') || ''
return ct.includes('application/json') ? res.json() : res.text()
}


// NEWS
export const NewsAPI = {
list: () => http('GET', '/news'),
create: (payload) => http('POST', '/news', payload),
remove: (id) => http('DELETE', `/news/${id}`),
update: (id, payload) => http('PUT', `/news/${id}`, payload),
}


// EVENTS
export const EventsAPI = {
list: () => http('GET', '/events'),
create: (payload) => http('POST', '/events', payload),
remove: (id) => http('DELETE', `/events/${id}`),
update: (id, payload) => http('PUT', `/events/${id}`, payload),
}