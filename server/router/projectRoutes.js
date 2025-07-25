const express = require("express")
const auth = require("../middlewares/authMiddleware")
const projectController = require("../controller/projectController")

const router = express.Router()

router.use(auth)

router.post("/create", projectController.create)
router.get("/", projectController.getAll)
router.get("/:id", projectController.getOne)
router.put("/:id", projectController.update)
router.delete("/:id", projectController.deleted)

module.exports = router 