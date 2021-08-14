const User = require('./../models/user.model.js')
const passport = require('passport')

exports.create = (req, res) => {
  let user = new User(req.body)
  user.save().then((user) => {
    res.json(user)
  })
}

exports.find = (req, res) => {
  User
    .findOne({"firstName": req.query.firstName})
    .then((user) => {
      res.json(user)
    })
}

exports.all = (_, res) => {
  User
    .find({})
    .then((users) => {
      res.json(users)
    })
}

exports.login = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register'
  })(req, res)
}

exports.logout = (req, _) => {
  req.logout()
}

exports.requireLogin = (req, res, next) => {
  if(req.isAuthenticated()){
    return next()
  }

  res.json({err: 'Access denial!'})
}
