const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcrypt = require("bcryptjs")


const registerUser = async ({name, email, password}) => {
    const existingUser = await User.findOne({email})
    if(existingUser) throw new Error(" This user is already exsists")

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({name, email, password: hashedPassword})

    return {id: user._id, name: user.name, email: user.email}
}

const loginUser = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error(" This user not found")

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error(" Password isn't correct")
        
    const token = jwt.sign(
        {id: user._id, role: user.role}, 
        process.env.JWT_SECRET, 
        {expiresIn: "1h"}
    )    
        
    return {token, id: user._id, name: user.name, email: user.email}
}

module.exports = {
    registerUser,
    loginUser
}