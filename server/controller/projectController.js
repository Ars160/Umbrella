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

const getAll = async (req,res) => {
    try {
        const projects = await projectService.getProjects()
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ error: error.message })        
    }
}

module.exports = {
    create,
    getAll
}
