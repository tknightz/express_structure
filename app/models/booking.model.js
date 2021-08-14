const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookingSchema = new Schema({
  id_customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  id_tour: {
    type: Schema.Types.ObjectId,
    ref: 'Tour'
  },
  booking_date: Date,
  total_number_ticket: Number, 
  total_money: Number
})

module.exports = mongoose.model('Booking', bookingSchema)
