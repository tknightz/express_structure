const mongoose = require('mongoose')
const Schema = mongoose.Schema

let placeSchema = new Schema({
    name: String, 
    description: String,
})

module.exports = mongoose.model('Place', placeSchema)
