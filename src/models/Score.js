const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  quizName: {
    type: String,
    required: false,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  studentName: {
    type: String,
    required: false,
  },
  score: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
