const User = require("../models/User")

const profileUser = async (id) => {
    
    const user = await User.findById(id).select("-password")
    if(!user) throw new Error("User not found")

    return {id: user._id, name: user.name, email: user.email, role: user.role}
}

const getUsers = async () => {
    const user = await User.find()
    return user
}

const getOneUser = async (id) => {
    const user = await User.findById(id)
    if(!user) throw new Error("this task is none")
    
    return user
}

module.exports = {
    profileUser, 
    getUsers,
    getOneUser
}