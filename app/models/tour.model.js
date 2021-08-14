const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tourSchema = new Schema({
  id_tour_area: {
    type: Schema.Types.ObjectId,
    ref: 'TourArea'
  },
  name: String, 
  price: Number,
  avatar: String,
  list_images: [
    {
      type: String,
    }
  ]
})

module.exports = mongoose.model('Tour', tourSchema)
