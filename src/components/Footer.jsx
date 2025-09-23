export default function Footer(){
return (
<footer className="bg-white border-t">
<div className="container mx-auto px-4 py-4 text-sm text-gray-600 flex items-center justify-between">
<span>© {new Date().getFullYear()} LeaderTV</span>
<a className="underline" href="/admin">Админ панел</a>
</div>
</footer>
)
}