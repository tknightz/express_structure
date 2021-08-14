const mongoose = require('mongoose')
const Schema = mongoose.Schema

let accountSchema = new Schema({
  user_name: String,
  password: String, 
  token: String
})

module.exports = mongoose.model('Account', accountSchema)
