const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  email: String,
  firstName: String,
  lastName: String, 
  age: Number
})

userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, this.salt)
}

userSchema.methods.authenticate = function (password) {
  if (!this.salt) return false
  return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', function (next) {
  this.salt = bcrypt.genSaltSync(10)
  this.password = this.hashPassword(this.password)
  next()
})


module.exports = mongoose.model('User', userSchema)
