import { Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import * as userApi from "../api/user"
import * as taskApi from "../api/task"
import { useNavigate } from 'react-router-dom';



const Task = ({task, index}) => {


    const [user, setUser] = useState("")
    const navigate = useNavigate()
    

    useEffect(() => {
      const project = async () => {

        const resUser = await userApi.getOne(task.assignedTo)
        if(resUser.success) setUser(resUser.data.name)
          else setUser("Неизвестно")
      }

      project()
    }, [task])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
        if (confirmDelete) {
            await taskApi.deleted(id);
        }
    }

    const handleGoToTaskItem = (taskId) => {
      navigate(`/task/${taskId}`);
    };

    return(
      <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border border-gray-300 rounded-md p-4 mb-3 shadow-sm"
          style={{ ...provided.draggableProps.style }}
        >
          <div>
            <h3 className="text-base font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            <span className="inline-block bg-blue-100 text-gray-600 text-xs font-medium px-3 py-1 rounded mb-3">
              {user}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleGoToTaskItem(task._id)}
                className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300"
                >
                Перейти →
              </button>
              <button
                onClick={() => navigate(`/task/${task._id}/edit`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
              >
                Изменить
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
    )
}

export default Task;