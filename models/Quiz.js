const mongoose = require('mongoose');

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
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);
