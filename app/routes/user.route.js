const express = require('express')
const router = express.Router()
const user = require('./../controllers/user.controller.js')

router
  .route('/')
  .get(user.requireLogin, user.find)

router
  .route('/create')
  .post(user.create)

router
  .route('/all')
  .get(user.requireLogin, user.all)

module.exports = router
