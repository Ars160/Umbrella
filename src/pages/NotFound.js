import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Страница не найдено</h1>
      <p className="text-gray-600 mt-4">Такой страницы возможно нету...</p>
      <Link to="/" className="mt-6 text-blue-500 underline">
        Возвращаться на главную страницу
      </Link>
    </div>
  );
};

export default NotFound;
