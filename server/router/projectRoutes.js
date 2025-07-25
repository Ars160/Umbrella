const express = require("express")
const auth = require("../middlewares/authMiddleware")
const projectController = require("../controller/projectController")

const router = express.Router()

router.use(auth)

router.get("/create", projectController.create)

module.exports = router 