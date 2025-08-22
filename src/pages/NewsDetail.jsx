import { useParams } from "react-router-dom";

export default function NewsDetail() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Детайл за новина {id}</h1>
      <p>Тук ще се показва съдържанието на новината.</p>
    </div>
  );
}
