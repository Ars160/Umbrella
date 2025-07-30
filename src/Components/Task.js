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
    }, [])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
        if (confirmDelete) {
            await taskApi.deleted(id);
        }
    }

    return(
        <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              border: "1px solid #ccc",
              ...provided.draggableProps.style,
            }}
          >
            <div>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <span className="badge bg-info p-3">{user}</span>
            <button onClick={() => navigate(`/task/${task._id}/edit`)} className='btn btn-primary mx-1'>Изменить</button>
            <button onClick={() => {handleDelete(task._id)}} className='btn btn-danger mx-1'>Удалить</button>
            </div>
          </div>
        )}
      </Draggable>
    )
}

export default Task;