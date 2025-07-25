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

module.exports = {
    createProject,
    getProjects,
    getOneProject
    }