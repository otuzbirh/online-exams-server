const { createUser, listUsers, singleUser, deleteUser, updateUser } = require("../controllers/userController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();

router.post("/create", createUser);
router.get("/list", authMiddleware, listUsers)
router.get("/:id", singleUser)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)


module.exports = router;