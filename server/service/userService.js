const User = require("../models/User")
const bcrypt = require("bcryptjs")

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

const updateProfile = async (id, updates) => {
    const newUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!newUser) throw new Error( "User not found" )

    return newUser
}

const changePassword = async (id, currentPassword, newPassword) => {
    const user = await User.findById(id)
    if (!user) throw new Error("User not found")
  
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) throw new Error("Current password is incorrect")
  
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()
  
    return user
  }

module.exports = {
    profileUser, 
    getUsers,
    getOneUser,
    updateProfile,
    changePassword
}