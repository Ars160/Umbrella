const User = require("../models/User")

const profileUser = async (id) => {
    
    const user = await User.findById(id).select("-password")
    if(!user) throw new Error("User not found")

    return {id: user._id, name: user.name, email: user.email, role: user.role}
}

module.exports = {profileUser}