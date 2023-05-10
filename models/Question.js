var mongoose = require('mongoose')
var questionSchema = mongoose.Schema({
    quizid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
  
    questionText:{
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options:{
        type  :Array,
        default:[]
    }
})
module.exports = mongoose.model('question',questionSchema)
