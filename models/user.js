const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      require: true
   }
})

module.exports = model('User', schema)