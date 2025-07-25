const userService = require('../service/userService')

const profile = async (req, res) => {
    try{
            const user = await userService.profileUser(req.user.id)
            res.status(200).json(user)        
        }catch(err){
            res.status(404).json({ error: err.message })
        } 
} 

module.exports = {profile}
