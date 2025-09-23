import { useEffect, useState } from 'react'
import { NewsAPI } from '../services/api'


export default function News(){
const [items, setItems] = useState([])
const [query, setQuery] = useState('')
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


useEffect(() => {
(async () => {
try {
setLoading(true)
const data = await NewsAPI.list()
setItems(Array.isArray(data) ? data : [])
} catch (e) {
setError(e.message)
} finally {
setLoading(false)
}
})()
}, [])


const filtered = items.filter(n => (n.title || '').toLowerCase().includes(query.toLowerCase()))


if (loading) return <p>Зареждане на новини…</p>
if (error) return <p className="text-red-600">Грешка: {error}</p>


return (
<section className="space-y-4">
<div className="flex items-center gap-2">
<input
className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
placeholder="Търсене в новини..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>
</div>
<ul className="grid md:grid-cols-2 gap-5">
{filtered.map(n => (
<li key={n.id || n._id} className="card">
<h3 className="font-semibold text-lg">{n.title}</h3>
{n.date && <p className="text-xs text-slate-500 mb-2">{n.date}</p>}
<p className="text-slate-700">{n.body}</p>
</li>
))}
{filtered.length === 0 && (
<li className="text-slate-500">Няма резултати.</li>
)}
</ul>
</section>
)
}