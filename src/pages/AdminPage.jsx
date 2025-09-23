import { useState } from 'react'


export default function AdminPage(){
// NEWS form state
const [title, setTitle] = useState('')
const [date, setDate] = useState('')
const [body, setBody] = useState('')
const [nMsg, setNMsg] = useState('')


// EVENTS form state
const [eTitle, setETitle] = useState('')
const [eDate, setEDate] = useState('')
const [eLocation, setELocation] = useState('')
const [eMsg, setEMsg] = useState('')


async function submitNews(e){
e.preventDefault()
setNMsg('')
try{
await NewsAPI.create({ title, date, body })
setNMsg('Новината е публикувана!')
setTitle(''); setDate(''); setBody('')
}catch(err){ setNMsg('Грешка: ' + err.message) }
}


async function submitEvent(e){
e.preventDefault()
setEMsg('')
try{
await EventsAPI.create({ title: eTitle, date: eDate, location: eLocation })
setEMsg('Събитието е създадено!')
setETitle(''); setEDate(''); setELocation('')
}catch(err){ setEMsg('Грешка: ' + err.message) }
}


return (
<div className="space-y-8">
<h2 className="text-2xl font-semibold">Администратор</h2>


<div className="grid md:grid-cols-2 gap-6">
<form onSubmit={submitNews} className="card space-y-3">
<h3 className="font-semibold text-lg">Публикуване на новина</h3>
<input className="border rounded-xl px-3 py-2 w-full" placeholder="Заглавие" value={title} onChange={e=>setTitle(e.target.value)} required />
<input className="border rounded-xl px-3 py-2 w-full" type="date" value={date} onChange={e=>setDate(e.target.value)} />
<textarea className="border rounded-xl px-3 py-2 w-full min-h-[120px]" placeholder="Съдържание" value={body} onChange={e=>setBody(e.target.value)} required />
<div className="flex gap-3">
<button className="btn-primary" type="submit">Публикувай</button>
</div>
{!!nMsg && <p className="text-sm text-slate-600">{nMsg}</p>}
</form>


<form onSubmit={submitEvent} className="card space-y-3">
<h3 className="font-semibold text-lg">Създаване на събитие</h3>
<input className="border rounded-xl px-3 py-2 w-full" placeholder="Заглавие" value={eTitle} onChange={e=>setETitle(e.target.value)} required />
<input className="border rounded-xl px-3 py-2 w-full" type="date" value={eDate} onChange={e=>setEDate(e.target.value)} required />
<input className="border rounded-xl px-3 py-2 w-full" placeholder="Място (напр. Zoom/София)" value={eLocation} onChange={e=>setELocation(e.target.value)} />
<div className="flex gap-3">
<button className="btn-secondary" type="submit">Създай</button>
</div>
{!!eMsg && <p className="text-sm text-slate-600">{eMsg}</p>}
</form>
</div>
</div>
)
}