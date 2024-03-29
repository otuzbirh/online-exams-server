
const { createScore, listScores, deleteScore, studentList} = require("../controllers/studentController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();


// Quiz routes
router.post("/create", authMiddleware, createScore);
router.get("/list", authMiddleware, listScores)
router.get("/list/:id", authMiddleware, studentList)
router.get("/delete/:id", authMiddleware, deleteScore)




module.exports = router;
