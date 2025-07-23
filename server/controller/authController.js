const authService = require("../service/authService")

const register = async (req, res) => {
    try{
        const newUser = await authService.registerUser(req.body)
        res.status(201).json(newUser)        
    }catch(err){
        res.status(401).json({ error: err.message })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const data = await authService.loginUser(email, password)
        res.status(200).json(data)
    }catch(err){
        res.status(401).json({ error: err.message })
    }
}

module.exports = {
    register,
    login
}