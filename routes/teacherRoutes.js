const { createQuiz, listQuiz, singleQuiz, deleteQuiz, updateQuiz, createQuestion, listQuestions, deleteQuestion, updateQuestion } = require("../controllers/teacherController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();


// Quiz routes
router.post("/create", authMiddleware, createQuiz);
router.get("/list",authMiddleware, listQuiz)
router.get("/:id", authMiddleware,singleQuiz)
router.delete("/:id", authMiddleware,deleteQuiz)
router.patch("/:id", authMiddleware,updateQuiz)

// Question routes  
router.post("/question/create",authMiddleware, createQuestion);
router.get("/question/list",authMiddleware, listQuestions)
router.delete("/question/:id",authMiddleware, deleteQuestion)
router.patch("/question/:id", authMiddleware, updateQuestion)

module.exports = router;
