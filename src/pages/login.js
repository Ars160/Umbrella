import { useState } from "react"
import { login } from "../api/auth"
import { Link, useNavigate } from "react-router-dom"



const LoginPage = () => {

    const navigate = useNavigate()

    const [error, setError] = useState()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleEmail = (e) => {
        setFormData({
            ...formData, email: e.target.value
        })
    }

    const handlePassword = (e) => {
        setFormData({
            ...formData, password: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const loginnedUser = await login(formData)
        if(loginnedUser.success){
            localStorage.setItem("token", JSON.stringify(loginnedUser.data.token))
            navigate('/projects')
        }else{
            setError("Неправильный логин или пароль!");
        }
    }
    
    return (
        <>
          <form 
            onSubmit={handleSubmit} 
            method="POST" 
            className="w-full max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Логин</h2>
      
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Почта
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                onChange={handleEmail}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                onChange={handlePassword}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
      
            <button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Войти
            </button>
      
            <div className="mt-4 text-center text-sm text-gray-600">
              Нет аккаунта?{' '}
              <Link to='/register' className="text-yellow-600 hover:underline">
                Регистрация
              </Link>
            </div>
      
            {error && (
              <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
        </>
      );
      
}

export default LoginPage