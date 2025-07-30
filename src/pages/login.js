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
    
    return(
        <>
        <form onSubmit={handleSubmit} method="POST" className="container mt-5 border p-4 rounded" style={{width: 400}}>

            <h2>Логин</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label"> Почта </label>
                <input type="email" name="email" className="form-control" id="email" onChange={handleEmail} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label"> Почта </label>
                <input type="password" name="password" className="form-control" id="password" onChange={handlePassword} />
            </div>
            <button type="submit" className="btn btn-primary">Логин</button>
            <div className="mt-3">
                <label>
                    Нет аккаунта? <Link to='/register'>Регистрация</Link>
                </label>
                <p className='error'>{error}</p>
            </div>
        </form>
        </>
    )
}

export default LoginPage