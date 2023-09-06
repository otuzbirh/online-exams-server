const Quiz = require("../models/Quiz");
const Question = require("../models/Question")
const Score = require("../models/Score")
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error')


const createScore = asyncWrapper(async (req, res) => {
    const score = await Score.create(req.body);
    res.status(201).json({ score });
  });

  const listScores = asyncWrapper(async (req, res, next) => {
    const scores = await Score.find({})
      .populate('quizId', 'quizname')
      .populate('studentId', 'firstName lastName email')
  
    res.status(200).json(scores);
  });

  const studentList = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
  
    const scores = await Score.find({ studentId: id })
      .populate('quizId', 'quizname')
      .populate('studentId', 'firstName lastName email');
    
    res.status(200).json(scores);
  });
  


  module.exports = {
    createScore,
    listScores,
    studentList
  };
  