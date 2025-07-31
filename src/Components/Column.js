import { Droppable } from '@hello-pangea/dnd'
import Task from './Task'

const Column = ({title, taskKey, tasks}) => {
  return (
    <Droppable droppableId={taskKey}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-4 rounded-lg flex-1 min-h-[300px] shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
  
          {tasks[taskKey].map((task, index) => (
            <Task key={task._id} task={task} index={index} />
          ))}
  
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
  
}

export default Column