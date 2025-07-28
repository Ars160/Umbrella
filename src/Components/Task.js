import { Draggable } from '@hello-pangea/dnd';
import * as projectApi from "../api/project"
import { useEffect, useState } from 'react';
import * as userApi from "../api/user"



const Task = ({task, index}) => {

    const [projectName, setProjectName] = useState("")

    const [user, setUser] = useState("")

    useEffect(() => {
      const project = async () => {
        const res = await projectApi.getOne(task.project)
        if(res.success) setProjectName(res.data.name)
        else setProjectName("Неизвестно")

        const resUser = await userApi.getOne(task.assignedTo)
        if(resUser.success) setUser(resUser.data.name)
          else setUser("Неизвестно")
      }

      project()
    }, [task.project])

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
            <span className="badge bg-info">{projectName}</span>
            <span className="badge bg-info">{user}</span>
            </div>
          </div>
        )}
      </Draggable>
    )
}

export default Task;