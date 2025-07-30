const taskService = require("../service/taskService")

const create = async (req, res) => {
    try {
        const taskData = {
            ...req.body,
            creator: req.user.id
        }
        const success = await taskService.createTask(taskData)
        res.status(201).json(success)        
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
    
}


const getAll = async (req, res) => {
    try {
        const task = await taskService.getTasks()
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ error: error.message })        
    }
}

const getOne = async (req, res) => {
    try {
        const task = await taskService.getOneTask(req.params.id)
        res.status(200).json(task)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const newTask = await taskService.updateTask(req.params.id, req.body)
        res.status(200).json(newTask)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleted = async (req, res) => {
    try {
        const deletedTask = await taskService.deleteTask(req.params.id)
        res.status(200).json(deletedTask)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getByProjectId = async (req, res) => {
    try {
        const tasks = await taskService.ByProjectId(req.params.projectId)
        res.json(tasks)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleted,
    getByProjectId
}