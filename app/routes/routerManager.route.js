const router = require('express').Router()
const user = require('../controllers/user.controller')
const userRouter = require('./user.route')
const path = require('path')

router
  .route('/')
  .get((req, res) => {
      res.json({name: 'tknightz'})
  })

router
  .route('/login')
  .post(user.login)

router
  .route('/logout')
  .get(user.requireLogin, user.logout)

router.use('/user', userRouter)


module.exports = router
