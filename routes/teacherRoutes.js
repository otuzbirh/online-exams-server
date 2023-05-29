const { createQuiz, listQuiz, singleQuiz, deleteQuiz, updateQuiz, createQuestion, listQuestions, deleteQuestion, updateQuestion } = require("../controllers/teacherController");
const authMiddleware = require('../middleware/auth')
const router = require("express").Router();


// Quiz routes
router.post("/create", createQuiz);
router.get("/list", listQuiz)
router.get("/:id", singleQuiz)
router.delete("/:id", deleteQuiz)
router.patch("/:id", updateQuiz)

// Question routes
router.post("/question/create", createQuestion);
router.get("/question/list",authMiddleware, listQuestions)
router.delete("/question/:id", deleteQuestion)
router.patch("/question/:id", updateQuestion)

module.exports = router;
