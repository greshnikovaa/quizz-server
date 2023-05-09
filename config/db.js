require('dotenv').config()

const mongoose = require('mongoose');

const dbkey = process.env.URL_MONGO

const connectDB = async () => {   
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(dbkey, {
            useNewUrlParser: true
        })
        console.log('connect')
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB