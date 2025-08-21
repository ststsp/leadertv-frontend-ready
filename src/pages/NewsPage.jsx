import { Link } from "react-router-dom";
import NewsList from "../components/News";

export default function NewsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Всички новини</h1>
        <Link to="/" className="text-green-700 hover:underline">Начало</Link>
      </div>
      <NewsList />
    </main>
  );
}
