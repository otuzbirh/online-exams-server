const { createQuiz, listQuiz, singleQuiz, deleteQuiz, updateQuiz } = require("../controllers/teacherController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();


// Quiz routes
router.post("/create", authMiddleware, createQuiz);
router.get("/list",authMiddleware, listQuiz)
router.get("/:id", authMiddleware,singleQuiz)
router.delete("/:id", authMiddleware,deleteQuiz)
router.patch("/:id", authMiddleware,updateQuiz)



module.exports = router;
