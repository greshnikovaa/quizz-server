const mongoose = require('mongoose')

const ThemeSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        default: "Не задано"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Theme = mongoose.model('theme', ThemeSchema)