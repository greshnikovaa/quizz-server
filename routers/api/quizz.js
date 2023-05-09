const express = require('express')
const router = express.Router()

const Theme = require('../../models/theme')
const Quiz = require('../../models/quizz')

router.get('/theme', async (req,res) => {
    Theme.find()
    .then((themes)=>{
        res.json({themes})
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({mes:'тема не найдена'})
    })
})

router.delete('/:id', (req,res)=>{
    Theme.findByIdAndDelete(req.params.id)
    .then((theme)=>{
        Quiz.deleteMany({themeId:req.params.id})
        .then((quiz)=>{
            res.json({mes: "Тест удален"})
        })
    })
    .catch((err)=>{
        res.status(400).json({mes:'тест не удален'})
    })
})

router.get('/:id', (req,res)=>{
    Quiz.find({themeId:req.params.id})
        .then((quizzes)=>{
            res.json(quizzes)
        })
        .catch((err)=>{
            res.status(404).json({mes :'вопрос не найден'})
        })
})

router.post('/', (req,res)=>{
    const {title, quizes} = req.body
    Theme.create({title: title})
        .then(async(theme)=>{
            try{
                for(let quiz of quizes){
                    await Quiz.create({
                        themeId: theme._id,  
                        question: quiz.question,
                        correct: quiz.correct,
                        answers: quiz.answers
                    })
                }
                res.json({mes:'тест удален'})
            }
            catch(err){
                console.log(err)
                res.status(400).json({mes:'сбой в добавлении данных'})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json({mes:'тема не создана'})
        })
    // const newQuizz = {
    //     title:req.body
    // }
})

module.exports = router