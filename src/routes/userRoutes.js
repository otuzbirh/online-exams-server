const { createUser, listUsers, singleUser, deleteUser, updateUser, listStudents } = require("../controllers/userController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();

router.post("/create", authMiddleware, createUser);
router.get("/list", authMiddleware, listUsers)
router.get("/:id", authMiddleware, singleUser)
router.delete("/:id", authMiddleware, deleteUser)
router.patch("/:id", authMiddleware, updateUser)

router.get("/", authMiddleware, listStudents)



module.exports = router;