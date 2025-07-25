const Project = require("../models/Project")

const createProject = async ({name, description, creator}) => {
    const exsistingProject = await Project.findOne({name})
    if(exsistingProject) throw new Error("This project already exsists")

    const project = await Project.create({name, description, creator})

    return {success: true}
}

const getProjects = async () => {
    const projects = await Project.find()
    return projects
}

const getOneProject = async (id) => {
    const project = await Project.findById(id)
    if(!project) throw new Error("this project is none")
    
    return project
}

const updateProject = async (id, updates) => {
    const newProject = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!newProject) throw new Error( "Project not found" )

    return newProject
}

const deleteProject = async (id) => {
    const deleted = await Project.findByIdAndDelete(id)
    if (!deleted) throw new Error("Product not found")
    
    return deleted
}

module.exports = {
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
    }