const userService = require('../service/userService')

const profile = async (req, res) => {
    try{
            const user = await userService.profileUser(req.user.id)
            res.status(200).json(user)        
        }catch(err){
            res.status(404).json({ error: err.message })
        } 
} 

const getAll = async (req, res) => {
    try {
        const user = await userService.getUsers()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })        
    }
}

const getOne = async (req, res) => {
    try {
        const user = await userService.getOneUser(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    profile,
    getAll,
    getOne
}
