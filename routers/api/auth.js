const { Router } = require('express')
const router = Router()
const User = require('../../models/user')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

// const isRegistration = [
//     check('email', 'Некорректный email').isEmail(),
//     check('password', 'Некорректный пароль').isLength({ min: 6 })
// ]
const isLogin = [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists()
]

// router.post('/registration', isRegistration, async (req, res) => {
//     try {
//         const { email, password } = req.body

//         const errors = validationResult(req) //работа с валидацией
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: 'Некорректные данные при регистрации'
//             })
//         }
//         const isUser = await User.findOne({ email: email }) //проверка зарегстрирован ли уже такой еmail
//         if (isUser) {
//             return res.status(300).json({ message: "Данный Email уже занят, попробуйте другой." })
//         }
//         const heshedPassword = await bcrypt.hash(password, 12)

//         const user = new User({
//             email: email,
//             password: heshedPassword
//         })
//         await user.save()

//         res.status(201).json({ message: 'Пользователь создан' })
//     }
//     catch (error) {
//         console.error(error)
//     }

// }
// )
router.post('/login', isLogin, async (req, res) => {
    try {
        const { email, password } = req.body

        const errors = validationResult(req) //работа с валидацией
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message: "Такого email`a нет в базе"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "неверный пароль"})
        }
        const jwtSecret = "xnjeujlyj1234Nkmifz"
        const token = jwtToken.sign(
            {userId:user.id},
            jwtSecret, 
            {expiresIn: '1h'}
        )
        res.json({token:token, userId:user.id})
    }
    catch(error){
        console.error(error)
    }
})


module.exports = router