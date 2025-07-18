const router = require("express").Router();
const { generateQuestions } = require('../controllers/aiQuestionController');

router.post('/generate-questions', async (req, res) => {
    const { topic, difficulty, count } = req.body;
    const questions = await generateQuestions(topic, difficulty, count);
    res.json(questions);
});

module.exports = router;