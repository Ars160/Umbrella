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
    
    return project
}

const updateProject = async (id, name, description, members) => {
    const newProject = await Project.findByIdAndUpdate(id, {name, description}, { new: true });
    if (!newProject) throw new Error( "Project not found" )

      if (members) {
        const project = await Project.findById(id);
        const creatorId = project.creator.toString();

        await ProjectUser.deleteMany({ 
            project: id, 
            role: 'member' 
        });

        const uniqueMembers = [...new Set(
            members.filter(userId => userId !== creatorId)
        )];

        const memberUsers = uniqueMembers.map(userId => ({
            user: userId,
            project: id,
            role: 'member'
        }));

        if (memberUsers.length > 0) {
            await ProjectUser.insertMany(memberUsers);
        }
      }
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