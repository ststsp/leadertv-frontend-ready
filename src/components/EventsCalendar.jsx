import { useEffect, useState } from 'react'
import { EventsAPI } from '../services/api'


export default function EventsCalendar(){
const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


useEffect(() => {
(async () => {
try {
setLoading(true)
const data = await EventsAPI.list()
setItems(Array.isArray(data) ? data : [])
} catch (e) {
setError(e.message)
} finally {
setLoading(false)
}
})()
}, [])


if (loading) return <p>Зареждане на събития…</p>
if (error) return <p className="text-red-600">Грешка: {error}</p>


return (
<section className="space-y-4">
<div className="grid md:grid-cols-2 gap-5">
{items.map(e => (
<article key={e.id || e._id} className="card">
<h3 className="font-semibold text-lg">{e.title}</h3>
<p className="text-sm text-slate-600 mt-1">{e.date} • {e.location}</p>
</article>
))}
{items.length === 0 && (
<p className="text-slate-500">Няма планирани събития.</p>
)}
</div>
</section>
)
}