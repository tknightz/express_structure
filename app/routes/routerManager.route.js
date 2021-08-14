const router = require('express').Router()
const user = require('../controllers/user.controller')
const userRouter = require('./user.route')

router
  .route('/')
  .get((_, res) => {
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
