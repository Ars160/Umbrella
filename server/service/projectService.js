const Project = require("../models/Project")
const ProjectUser = require("../models/ProjectUser")
const Task = require("../models/Task")

const createProject = async ({ name, description, creator, members = [] }) => {
    const existingProject = await Project.findOne({ name });
    if (existingProject) throw new Error("This project already exists");
  
    const project = await Project.create({ name, description, creator });
  
    await ProjectUser.create({
      user: creator,
      project: project._id,
      role: 'owner',
    });
  
    const uniqueMembers = [...new Set(members.filter(id => id !== creator.toString()))];
  
    const projectUsers = uniqueMembers.map(userId => ({
      user: userId,
      project: project._id,
      role: 'member',
    }));
  
    if (projectUsers.length > 0) {
      await ProjectUser.insertMany(projectUsers);
    }
  
    return { success: true, project };
  };
  

const getProjects = async () => {
    const projects = await Project.find()
    return projects
}

const getOneProject = async (id) => {
    const project = await Project.findById(id)
    if(!project) throw new Error("this project is none")

    const members = await ProjectUser.find({ project: id }).populate("user");
    
    return {
      ...project.toObject(),
      members: members.map(m => m.user)
    }
}

const updateProject = async (id, name, description, members) => {
    const updatedProject = await Project.findByIdAndUpdate(id, {name, description}, { new: true });
    if (!updatedProject) throw new Error( "Project not found" )

      await ProjectUser.deleteMany({ project: id });

      const projectUsers = members.map(userId => ({
        user: userId,
        project: id,
        role: 'member'
      }));

      await ProjectUser.insertMany(projectUsers);

    return {
      ...updatedProject.toObject(),
      members
    }
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