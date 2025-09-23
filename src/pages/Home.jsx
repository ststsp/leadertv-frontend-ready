import { Link } from 'react-router-dom'


export default function Home(){
return (
<div className="space-y-6">
<h1 className="text-3xl font-bold">Добре дошли в LeaderTV</h1>
<p className="text-gray-700">Платформа за обмен между МИГ: видео, новини, събития и още.</p>
<div className="flex gap-3">
<Link to="/news" className="px-4 py-2 rounded-xl bg-black text-white">Към новини</Link>
<Link to="/events" className="px-4 py-2 rounded-xl bg-gray-900 text-white">Към календара</Link>
</div>
</div>
)
}