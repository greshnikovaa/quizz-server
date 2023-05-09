const mongoose = require('mongoose')

const QuizzSchema = new mongoose.Schema({
    themeId:{
        type: mongoose.Types.ObjectId,
        ref: 'Theme',
    },
    correct:{
        type: Number,
        required: true
    },
    question:{
        type: String,
        required: true,
    },
    answers:{
        type:[{
            type: String
        }],
        required: true
    }
})

module.exports = Quizz = mongoose.model('quizz', QuizzSchema)