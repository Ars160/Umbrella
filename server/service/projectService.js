const Project = require("../models/Project")
const ProjectUser = require("../models/ProjectUser")
const Task = require("../models/Task")

const createProject = async ({name, description, creator}) => {
    const exsistingProject = await Project.findOne({name})
    if(exsistingProject) throw new Error("This project already exsists")

    const project = await Project.create({name, description, creator})

    await ProjectUser.create({
        user: creator,
        project: project._id,
        role: 'owner'
      });

    return {success: true, project}
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
    const project = await Project.findById(id)
    if (!project) throw new Error("Project not found")

    await Task.deleteMany({ project: id })    
    await ProjectUser.deleteMany({ project: id })

    const deleted = await Project.findByIdAndDelete(id)

    return deleted
}


module.exports = {
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
    }