const mongoose = require('mongoose')
const Schema = mongoose.Schema

let customerSchema = new Schema({
  id_account: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  name: String,
  phone: String,
  address: String
})

module.exports = mongoose.model('Customer', customerSchema)
