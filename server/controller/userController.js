const { json } = require('express')
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

const update = async (req, res) => {
    try {
        const newUser = await userService.updateProfile(req.params.id, req.body)
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const changePw = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body
  
      if (currentPassword === newPassword) {
        return res.status(400).json({ message: "New password must be different from current password" })
      }
  
      const updatedUser = await userService.changePassword(req.params.id, currentPassword, newPassword)
      res.status(200).json({ message: "Password changed successfully", user: updatedUser })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  

module.exports = {
    profile,
    getAll,
    getOne,
    update,
    changePw
}
