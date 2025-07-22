import Column from "./Column"
import { DragDropContext} from "@hello-pangea/dnd"

const Board = ({tasks, setTasks}) => {

const handleDragEnd = (result) => {
    console.log(result);
    
    const {source, destination} = result

    if(!destination) return

    if(source.droppableId === destination.droppableId) {
        const columnTasks = Array.from(tasks[source.droppableId])
        const [movedTask] = columnTasks.splice(source.index, 1)
        columnTasks.splice(destination.index, 0 , movedTask)

        setTasks((prev) => ({
            ...prev,
            [source.droppableId]: columnTasks,
          }));
        } else {
          const start = Array.from(tasks[source.droppableId]);
          const finish = Array.from(tasks[destination.droppableId]);
          const [movedTask] = start.splice(source.index, 1);
          finish.splice(destination.index, 0, movedTask);
    
          setTasks((prev) => ({
            ...prev,
            [source.droppableId]: start,
            [destination.droppableId]: finish,
          }));
        }
      };



    
    return(
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "20px" }}>
            <Column title={'To Do'} taskKey={'todo'} tasks={tasks} setTasks={setTasks}/>
            <Column title={'In Progress'} taskKey={'inProgress'} tasks={tasks} setTasks={setTasks}/>
            <Column title={'Done'} taskKey={'done'} tasks={tasks} setTasks={setTasks}/>
            </div>
        </DragDropContext>
    )
}

export default Board