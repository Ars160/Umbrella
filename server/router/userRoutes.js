const express = require("express")
const auth = require("../middlewares/authMiddleware")
const userController = require("../controller/userController")

const router = express.Router()

router.use(auth)

router.get("/profile", userController.profile)
router.get("/", userController.getAll)
router.get("/:id", userController.getOne)
router.put("/:id", userController.update)
router.put("/changePassword/:id", userController.changePw)


module.exports = router