import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as taskApi from "../api/task"
import * as userApi from "../api/user"



const EditTaskPage = () => {

    const [show, setShow] = useState(true)
    const [users, setUsers] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [assignedTo, setAssignedTo] = useState()
    

    useEffect(() => {
            const Data = async () => {
                const userRes = await userApi.getAll()
                if (userRes.success) setUsers(userRes.data)

                    
                const task = await taskApi.getOne(params.taskId)
                if(task.success){
                    setTitle(task.data.title)
                    setDescription(task.data.description)
                    setAssignedTo(task.data.assignedTo)
                }
            }
            Data()
        }, [params.taskId])


    const handleClose = () => {
        setShow(false)
        navigate(-1)
    }

    const handleUpdate = async () => {
            const res = await taskApi.update({
                id: params.taskId,
                title,
                description,
                assignedTo
            })
    
            if(res.success){
                alert('Задача обновлен!')
                handleClose()
            }else{
                alert('Ошибка при обновлении')
            }
        }
    

        return (
            <>
              {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Обновить Задачу</h2>
                      <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-black text-xl"
                      >
                        &times;
                      </button>
                    </div>
          
                    {/* Form */}
                    <form className="space-y-4">
                      {/* Название */}
                      <div>
                        <label className="block font-medium mb-1">Название</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
          
                      {/* Описание */}
                      <div>
                        <label className="block font-medium mb-1">Описание</label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
          
                      {/* Назначить участника */}
                      <div>
                        <label className="block font-medium mb-1">Назначить участника</label>
                        <select
                          value={assignedTo || ""}
                          onChange={(e) => setAssignedTo(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          {users.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
          
                    {/* Footer */}
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Обновить
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
          

}

export default EditTaskPage