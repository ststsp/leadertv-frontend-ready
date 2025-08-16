import React from "react";

const NewsPage = () => {
  const news = [
    {
      id: 1,
      title: "Стартира нова програма за развитие на МИГ",
      date: "2025-08-10",
      content: "Министерството на земеделието обяви нова програма за финансиране на проекти в селските райони..."
    },
    {
      id: 2,
      title: "Обучение за местни инициативни групи",
      date: "2025-08-12",
      content: "В София ще се проведе национално обучение за представители на МИГ от цялата страна..."
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Новини</h1>
      {news.map(item => (
        <div key={item.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-500">{item.date}</p>
          <p className="mt-2">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
