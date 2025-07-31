import { useEffect, useState } from "react"
import * as projectApi from "../api/project"
import { useNavigate } from "react-router-dom"
import * as userApi from "../api/user"




const ProjectsPage = () => {

    const [projects, setProjects] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([])
    


    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const navigate = useNavigate()

    useEffect(() => {
        const Data = async () => {
            const projectRes = await projectApi.getAll()
            if(projectRes.success) setProjects(projectRes.data)
                

        const userRes = await userApi.getAll()
        if (userRes.success) setUsers(userRes.data)
        }
        Data()
    }, [])

    const handleGoToProject = (projectId) => {
        navigate(`/project/${projectId}`);
      };

    const handleCreateProject = async () => {
            if(!name.trim() || !description.trim()) return
    
            const newProject = {
                name,
                description,
                members: selectedUsers
              };
              
    
            const res = await projectApi.create(newProject)
    
            if(res.success){
                setProjects([...projects, res.data])
                setName('')
                setDescription('')
                handleClose()
            } else {
                alert("Ошибка при создании")
            }
            
        }

    const handleDelete = async (projectId) => {
            const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
            if (confirmDelete) {
                await projectApi.deleted(projectId);
            }
    }

    return (
      <>
        {/* Кнопка "Создать проект" */}
        <button
          onClick={handleShow}
          className="mt-6 bg-yellow-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Создать проект
        </button>
    
        {/* Модальное окно */}
        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-2xl">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Создать проект</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
    
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                  <textarea
                    rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Участники проекта</label>
                  <select
                    multiple
                    value={selectedUsers}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
                      setSelectedUsers(selectedOptions);
                    }}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
    
              {/* Модальный футер */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}
    
        {/* Список проектов */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Список проектов</h2>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white"
              >
                <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.description}</p>
                  </div>
    
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleGoToProject(project._id)}
                      className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300"
                    >
                      Перейти →
                    </button>
                    <button
                      onClick={() => navigate(`/projects/${project._id}/edit`)}
                      className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
    
    

}

export default ProjectsPage

