import { Outlet, Link, useNavigate } from "react-router-dom";
import { profile } from "../api/user";
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
            if(user.success){
              navigate('/profile', {state: user.data})
            } else{
              navigate('/login')
            }
        }

    const handleLogout = async () => {
        localStorage.clear()
        navigate("/login")
    }
    
    return (
        <>
          <nav className="py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div>
              <Link to="/" className="text-xl font-bold tracking-wide">
                Umbrella
              </Link>
                <button
                  onClick={() => {navigate('/projects')}}
                  className="text-gray-500 px-4 py-2 rounded-md mx-5 font-medium hover:bg-gray-200 hover:text-black transition"
                >
                  Проекты
                </button>
                </div>
              <div className="flex items-center space-x-4">
                
                <button
                  onClick={handleProfile}
                  className="text-gray-500 px-4 py-2 rounded-md font-medium hover:bg-gray-200 hover:text-black transition"
                >
                  Профиль
                </button>
      
                {hasToken ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 px-4 py-2 rounded-md font-medium hover:bg-gray-200 hover:text-black transition"
                  >
                    Выйти
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-500 px-4 py-2 rounded-md font-medium hover:bg-gray-200 hover:text-black transition"
                  >
                    Логин
                  </button>
                )}
              </div>
            </div>
          </nav>
      
          <Outlet />
        </>
      );
      

}

