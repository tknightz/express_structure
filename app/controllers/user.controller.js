require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./../models/user.model.js')
// const passport = require('passport')
const jwt = require('jsonwebtoken')

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

exports.all = (req, res) => {
  User
    .find({})
    .then((users) => {
      res.json(users)
    })
}

// exports.login = (req, res) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/register'
//   })(req, res)
// }
exports.login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username: username})
  if (!user) return res.json({err: 'User not found!'})
  if (!user.authenticate(password)) return res.json({err: 'Wrong password!'})

  const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET)
  const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

exports.logout = (req, res) => {
  req.logout()
}

// exports.requireLogin = (req, res, next) => {
//   if(req.isAuthenticated()){
//     return next()
//   }

//   res.json({err: 'Access denial!'})
// }
//

exports.requireLogin = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({err: 'Invalid Token'})
    req.user = user
    return next()
  })
}
