require('dotenv').config()
const User = require('./../models/user.model.js')
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

exports.all = (_, res) => {
  User
    .find({})
    .then((users) => {
      res.json(users)
    })
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username: username})
  if (!user) return res.json({err: 'User not found!'})
  if (!user.authenticate(password)) return res.json({err: 'Wrong password!'})

  const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET)
  const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
}


exports.logout = (req, _) => {
  req.logout()
}


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
