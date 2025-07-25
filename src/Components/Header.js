import { Outlet, Link, useNavigate } from "react-router-dom";
import { profile } from "../api/user";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function Header() {

    const [hasToken, setHasToken] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("token"));
        setHasToken(!!user);
      }, []);
      

    const navigate = useNavigate();

    const handleProfile = async () => {
            const user = await profile()
            navigate('/profile', {state: user.data})
        }

    const handleLogout = async () => {
        localStorage.clear()
        navigate("/")
    }
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Umbrella</Link>
                <div>
                    <Button variant="primary" onClick={handleProfile} >
                    Профиль
                    </Button>
                    {
                        hasToken ? (
                            <button onClick={()=>{handleLogout()}} className="btn btn-primary">Выйти</button>
                        ):(
                            <button onClick={()=>{navigate("/login")}} className="btn btn-primary">Логин</button>
                        )
                    }
                </div>
        </div>
        </nav>
        <Outlet/>
        </>
    )

}

