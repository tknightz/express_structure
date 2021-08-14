const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tourPlaceSchema = new Schema({
  id_tour: {
    type: Schema.Types.ObjectId,
    ref: 'Tour'
  },
  id_place: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },
  number_order: Number, 
})

module.exports = mongoose.model('TourPlace', tourPlaceSchema)
