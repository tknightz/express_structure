const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tourAreaSchema = new Schema({
    name: String, 
    description: String
})

module.exports = mongoose.model('TourArea', tourAreaSchema)
