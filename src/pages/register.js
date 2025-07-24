import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate} from 'react-router-dom';

const RegisterPage = () => {

const navigate = useNavigate()

const [error, setError] = useState()

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
})

const handleName = (e) => {
    setFormData({
        ...formData, name: e.target.value
    })
}

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

    const registeredUser = await register(formData)
    if(!registeredUser.success){
        setError(registeredUser)
    }else{
        navigate('/')
    }
}


    return (
        <form onSubmit={handleSubmit} method='POST' className="container mt-5 border p-4 rounded" style={{width: 400}}>
            <h2>Регистрация</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Имя</label>
                <input type='text' className="form-control" name="name" id="name" onChange={handleName}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Почта</label>
                <input type='email' className="form-control" name="email" id="email" onChange={handleEmail}/>
            </div>
            <div className="mb-3">
                <label htmlFor="upassword" className="form-label">Пароль</label>
                <input type='password' className="form-control" name="upassword" id="upassword" onChange={handlePassword}/>
            </div>
            <button type='submit' className="btn btn-primary">Регистрация</button>
            <div className="mt-3">
                <label>
                    Уже есть аккаунт? <Link to='/'>Логин</Link>
                </label>
                <p className='error'>{error}</p>
            </div>
        </form>
    )
}

export default RegisterPage