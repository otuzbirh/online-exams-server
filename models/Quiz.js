const mongoose = require('mongoose');
const questionSchema = require('./Question')

const quizSchema = mongoose.Schema({
    quizname: {
        type: String,
        required: true
    },
    quizdescription: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  
    questions: [{
        type: mongoose.Schema.Types.Array,
        ref: 'Question' 
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);
