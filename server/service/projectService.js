const Project = require("../models/Project")

const createProject = async ({name, description, creator}) => {
    const exsistingProject = await Project.findOne({name})
    if(exsistingProject) throw new Error("This project already exsists")

    const project = await Project.create({name, description, creator})

    return {success: true}
}

module.exports = {
    createProject
    }