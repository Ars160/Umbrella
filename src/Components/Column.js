import { Droppable } from '@hello-pangea/dnd'
import Task from './Task'

const Column = ({title, taskKey, tasks}) => {
    return(
        <Droppable droppableId={taskKey}>
      {(provided) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
            flex: 1,
            minHeight: "300px",
          }}
        >
          <h2>{title}</h2>
          {tasks[taskKey].map((task, index) => (
            <Task key={task._id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    )
}

export default Column