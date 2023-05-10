const Quiz = require("../models/Quiz");
const Question = require("../models/Question")
const  asyncWrapper  = require('../middleware/async');

const { createCustomError } = require('../errors/custom-error')


const createQuiz = asyncWrapper( async (req, res) => {
    const quiz = await Quiz.create(req.body)
    res.status(201).json({quiz})
})

const listQuiz = asyncWrapper( async (req, res, next) => {
    const quiz = await Quiz.find({})
    res.status(200).json({ quiz })
  })


  const singleQuiz = asyncWrapper( async (req, res, next) => {
    const {id: quizID} = req.params
    const quiz = await Quiz.findOne({_id: quizID})
    if(!quiz) {
        return next(createCustomError(`No quiz with id : ${quizID}`, 404))    } 
    res.status(200).json({ quiz })
    
  })

  const updateQuiz = asyncWrapper(async (req, res, next) => {
    const {id: quizID} = req.params

    const quiz = await Quiz.findOneAndUpdate({_id: quizID}, req.body, {
        new: true,
        runValidators: true
    })
    if (!quiz) {
        return next(createCustomError(`No quiz with id : ${quizID}`, 404))
      }
      res.status(200).json({ quiz })
  
  })

  

  const deleteQuiz = asyncWrapper( async (req, res, next) => {
    const {id: quizID} = req.params
    const quiz  = await Quiz.findByIdAndDelete({_id: quizID})
    if (!quiz) {
        return next(createCustomError(`No quiz with id : ${quizID}`, 404))
      }
      res.status(200).json({ user })
  } )


const createQuestion = asyncWrapper( async (req, res) => {
    const quizid = req.body.quizid;
    const questionText = req.body.questionText;
    const answer = req.body.answer;
    const options = req.body.options;

    const newQuestion = await Question.create({
        quizid: quizid,
        questionText: questionText,
        answer: answer,
        options: options
    });

    // Add the question to the quiz
    const quiz = await Quiz.findById(quizid);
    quiz.questions.push(newQuestion._id);
    await quiz.save();

    res.status(201).json({ question: newQuestion });
});

const listQuestions = asyncWrapper(async (req, res) => {
    const questions = await Question.find({})
    res.status(200).json({ questions })
  })
  
  const deleteQuestion = asyncWrapper(async (req, res, next) => {
    const { id: questionID } = req.params
    const question = await Question.findByIdAndDelete({ _id: questionID })
    if (!question) {
      return next(createCustomError(`No question with id : ${questionID}`, 404))
    }
    // remove the question id from the quiz
    const quiz = await Quiz.findByIdAndUpdate(
      question.quizid,
      { $pull: { questions: questionID } },
      { new: true }
    )
  
    res.status(200).json({ question })
  })
  
  const updateQuestion = asyncWrapper(async (req, res, next) => {
    const { id: questionID } = req.params
  
    const question = await Question.findOneAndUpdate({ _id: questionID }, req.body, {
      new: true,
      runValidators: true
    })
    if (!question) {
      return next(createCustomError(`No question with id : ${questionID}`, 404))
    }
  
    res.status(200).json({ question })
  })
  




  
  module.exports = {
    createQuiz,
    listQuiz,
    singleQuiz,
    deleteQuiz,
    updateQuiz,
    createQuestion,
    listQuestions,
    deleteQuestion,
    updateQuestion
  };