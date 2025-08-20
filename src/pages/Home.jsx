// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Добре дошли в <span className="underline">LeaderTV</span>
        </h1>
        <p className="text-lg mb-8">
          Платформа за новини и събития на МИГ и партньорски организации.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/news"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Виж новините
          </Link>
          <Link
            to="/events"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Календар на събитията
          </Link>
        </div>
      </div>
    </div>
  );
}
