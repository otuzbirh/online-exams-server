const { createScore, listScores, studentList} = require("../controllers/studentController");
const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();


// Quiz routes
router.post("/create", authMiddleware, createScore);
router.get("/list", authMiddleware, listScores)
router.get("/list/:id", authMiddleware, studentList)




module.exports = router;
