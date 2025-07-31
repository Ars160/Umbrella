import { useLocation, useNavigate } from "react-router-dom"


const Profile = () => {
    
    const {state} = useLocation()
    const navigate = useNavigate()

    
    return (
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">Профиль</h1>
      
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">ID:</span> {state?.id}</p>
            <p><span className="font-medium">Имя:</span> {state?.name}</p>
            <p><span className="font-medium">Email:</span> {state?.email}</p>
            <p><span className="font-medium">Роль:</span> {state?.role}</p>
          </div>
      
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Назад
          </button>
        </div>
      );
      
}

export default Profile