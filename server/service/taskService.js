const Task = require('../models/Task')

const createTask = async ({title, description, status, project, creator, assignedTo}) => {

    const task = await Task.create({title, description, status, project, creator, assignedTo})

    return {success: true, task}

}

const getTasks = async () => {
    const task = await Task.find()
    return task
}

const getOneTask = async (id) => {
    const task = await Task.findById(id)
    if(!task) throw new Error("this task is none")
    
    return task
}

const updateTask = async (id, updates) => {
    const newTask = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!newTask) throw new Error( "Task not found" )

    return newTask
}

const deleteTask = async (id) => {
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) throw new Error("Task not found")
    
    return deleted
}

const ByProjectId = async(projectId) => {
    const tasks = await Task.find({project: projectId})

    return tasks
}

module.exports = {
    createTask,
    getTasks,
    getOneTask,
    updateTask,
    deleteTask,
    ByProjectId
}