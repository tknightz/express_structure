const express = require('express')
const flash = require('connect-flash')
const routerManager = require('./app/routes/routerManager.route')
const session = require('express-session')
const cors = require('cors')
// const passport = require('passport')


const app = express()


// Passport config
// require('./config/passport')(passport)
app.use(cors())

app.use(expres.json())
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(session({
  secret: 'thisissecret',
  resave: true,
  saveUninitialized: false
}))

// connect flash
app.use(flash())

// Passport session
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', routerManager)

app.use(express.static(__dirname + '/public'))


app.listen(8000, () => {
  console.log('Running in 8000...')
})

module.exports = app
