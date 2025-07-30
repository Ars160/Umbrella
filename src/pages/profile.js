import { useLocation, useNavigate } from "react-router-dom"


const Profile = () => {
    
    const {state} = useLocation()
    const navigate = useNavigate()

    
    return(
        <>
            <h1>Профиль</h1>
            <p>ID: {state?.id}</p>
            <p>Имя: {state?.name}</p>
            <p>Email: {state?.email}</p>
            <p>Роль: {state?.role}</p>

            <button onClick={() => navigate(-1)} className="btn btn-primary">Назад</button>
        </>
    )
}

export default Profile