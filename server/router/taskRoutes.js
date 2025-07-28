const express = require("express")
const auth = require("../middlewares/authMiddleware")
const taskController = require("../controller/taskController")

const router = express.Router()

router.use(auth)

router.post("/", taskController.create)
router.get("/", taskController.getAll)
router.get("/:id", taskController.getOne)
router.put("/:id", taskController.update)
router.delete("/:id", taskController.deleted)

module.exports = router 