import { Link, NavLink } from 'react-router-dom'


const linkBase = 'px-3 py-2 rounded-lg hover:bg-gray-200 transition'


export default function Navbar() {
return (
<header className="bg-white border-b">
<div className="container mx-auto px-4 h-16 flex items-center justify-between">
<Link to="/" className="font-bold text-xl">LeaderTV</Link>
<nav className="flex items-center gap-2">
<NavLink to="/" className={({isActive}) => isActive ? `${linkBase} bg-gray-200` : linkBase}>Начало</NavLink>
<NavLink to="/news" className={({isActive}) => isActive ? `${linkBase} bg-gray-200` : linkBase}>Новини</NavLink>
<NavLink to="/events" className={({isActive}) => isActive ? `${linkBase} bg-gray-200` : linkBase}>Календар</NavLink>
<NavLink to="/admin" className={({isActive}) => isActive ? `${linkBase} bg-gray-200` : linkBase}>Админ</NavLink>
</nav>
</div>
</header>
)
}