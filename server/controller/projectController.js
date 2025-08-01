const projectService = require("../service/projectService")

const create = async (req, res) => {
    try{
        const projectData = {
            ...req.body,
            creator: req.user.id
        }
        const success = await projectService.createProject(projectData)
        res.status(201).json(success)        
    }catch(err){
        res.status(401).json({ error: err.message })
    }
}

const getAll = async (req, res) => {
    try {
        const projects = await projectService.getProjects()
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ error: error.message })        
    }
}

const getOne = async (req, res) => {
    try {
        const project = await projectService.getOneProject(req.params.id)
        res.status(200).json(project)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const {name, description, members} = req.body
        const newProject = await projectService.updateProject(req.params.id, name, description, members)
        res.status(200).json(newProject)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleted = async (req, res) => {
    try {
        const deletedProject = await projectService.deleteProject(req.params.id)
        res.status(200).json(deletedProject)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleted
}
