import Board from '../components/Board'
import * as taskApi from "../api/task"
import * as userApi from "../api/user"
import * as projectApi from "../api/project"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getUserRole from '../utils/auth';

const BoardPages = () => {


    const {projectId} = useParams() 
    const [users, setUsers] = useState([])
    const [projectName, setProjectName] = useState() 
    
    const role = getUserRole()
    
    const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [] 
    })

    useEffect(() => {
        const Data = async () => {

            const taskRes = await taskApi.getByProjectId(projectId)
            if(taskRes.success){
                
                const mappedTasks = {
                    todo: [],
                    inProgress: [],
                    done: []
                }

                for (let task of taskRes.data){
                    mappedTasks[task.status]?.push(task)
                }

                setTasks(mappedTasks)
            }

            const project = await projectApi.getOne(projectId)
            if(project.success) setProjectName(project.data.name)

            const userRes = await userApi.getAll()
            if (userRes.success) setUsers(userRes.data)
        }
        Data()
    }, [projectId])


    const [show, setShow] = useState(false)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [assignedTo, setAssignedTo] = useState(null)

    

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const handleCreateTask = async () => {
        if(!title.trim() || !description.trim()) return

        const newTask = {
            title,
            description,
            project: projectId,
            assignedTo 
        }

        const res = await taskApi.create(newTask)

        if(res.success){
            setTasks((prev) =>({
            ...prev,
            todo: [...prev.todo, res.data.task ]
            }))
            setTitle('')
            setDescription('')
            handleClose()
        } else {
            alert("Ошибка при создании")
        }
        
    } 

    return (
        <>
          <h2 className="mt-6 text-2xl font-semibold text-center">{projectName}</h2>
      
          { role === "admin" && (<div className="flex justify-center mt-4">
            <button
              onClick={handleShow}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-md"
            >
              Создать Задание
            </button>
          </div>)}
      
          <hr className="my-6 border-gray-300" />
      
          <Board tasks={tasks} setTasks={setTasks} projectId={projectId} />
      
          {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative">
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
      
                <h3 className="text-xl font-semibold mb-4">Создать Задание</h3>
      
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Называние
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание
                    </label>
                    <textarea
                      rows={3}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Назначить на пользователя
                    </label>
                    <select
                      value={assignedTo || ""}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">-- Выберите исполнителя --</option>
                      {users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.name || user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
      
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleCreateTask}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                  >
                    Создать
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

export default BoardPages;