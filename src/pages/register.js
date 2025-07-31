import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registeredUser = await register(formData);
    if (!registeredUser.success) {
      setError(registeredUser.message || 'Ошибка регистрации');
    } else {
      navigate('/login');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Регистрация</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Почта</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Регистрация
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-yellow-600 hover:underline">
          Войти
        </Link>
      </div>

      {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

export default RegisterPage;
