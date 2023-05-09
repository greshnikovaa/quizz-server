const express = require("express")
const connectDB = require("./config/db")
const auth = require('./routers/api/auth')
const cors = require('cors')
const path = require('path')

const app = express()
connectDB()

app.use(cors({origin:true, credentials:true}));
app.use(express.json({extended:false}));
app.use('/static/images', express.static(path.join(__dirname, 'static/images')))

app.get('/', (req, res) => {
    res.send("Server listening on port 5000");
 })


const quizz = require('./routers/api/quizz')
app.use('/api/quizz', quizz)

app.use('/api/auth', auth)

const port = 8000;
app.listen(port, ()=>{
    console.log("server listening on port 8000")   
})
