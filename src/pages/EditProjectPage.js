import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as projectApi from "../api/project"
import * as userApi from "../api/user"


const EditProjectPage = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [members, setMembers] = useState([])
    const [users, setUsers] = useState([])




    useEffect(() => {
        const Data = async () => {
        const res = await projectApi.getOne(params.id)
        if(res.success) {
            setName(res.data.name)
            setDescription(res.data.description)
            
            setMembers(res.data.members?.map(m => m._id))
        }

        const userRes = await userApi.getAll();
        if (userRes.success) setUsers(userRes.data);
        }

        Data()
    }, [params.id])

    const handleUpdate = async () => {
        const res = await projectApi.update(params.id, {
            name,
            description,
            members
        })

        if(res.success){
            alert('Проект обновлен!')
            navigate('/projects')
        }else{
            alert('Ошибка при обновлении')
        }
    }

    const handleClose = () => {
        navigate('/projects')
    }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Редактировать проект</h2>
            <button
                onClick={handleClose}
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
            &times;
            </button>
            </div>

            <form className="space-y-5">
            {/* Название */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>

            {/* Описание */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>

            {/* Участники */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Участники проекта</label>
            <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-md px-4 py-2">
            {users
                .filter(user => user.role !== "admin")
                .map(user => (
                <label key={user._id} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    value={user._id}
                    checked={members.includes(user._id)}
                    onChange={(e) => {
                        const userId = e.target.value;
                        if (members.includes(userId)) {
                        setMembers(prev => prev.filter(id => id !== userId));
                        } else {
                        setMembers(prev => [...prev, userId]);
                        }
                    }}
                    />
                    <span>{user.name}</span>
                </label>
            ))}
            </div>
            </div>


            {/* Сохранить */}
            <div className="mt-6 flex justify-end space-x-3">
            <button
                    onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Отмена
                </button>

                <button
                type="button"
                onClick={handleUpdate}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                Сохранить
                </button>
            </div>
            </form>
    </div>
  </div>
);

}

export default EditProjectPage

