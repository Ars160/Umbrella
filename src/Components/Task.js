import { Draggable } from '@hello-pangea/dnd';

const Task = ({task, index}) => {
    return(
        <Draggable draggableId={task.id} index={index}>
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
            <span className="badge bg-info">{task.project}</span>
            </div>
          </div>
        )}
      </Draggable>
    )
}

export default Task;