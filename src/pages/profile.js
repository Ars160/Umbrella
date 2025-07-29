import { Link, useLocation } from "react-router-dom"


const Profile = () => {
    
    const {state} = useLocation()

    console.log(state);
    
    
    return(
        <>
            <h1>Профиль</h1>
            <p>ID: {state?.id}</p>
            <p>Имя: {state?.name}</p>
            <p>Email: {state?.email}</p>
            <p>Роль: {state?.role}</p>

            <Link to='/dashboard'><button className="btn btn-primary">Назад</button></Link>
        </>
    )
}

export default Profile