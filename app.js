const express = require('express')
const flash = require('connect-flash')
const routerManager = require('./app/routes/routerManager.route')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const configPassport = require('./config/passport')
const path = require('path')


const app = express()


app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

// Cors
app.use(cors())

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(session({
  secret: 'thisissecret',
  resave: true,
  saveUninitialized: false
}))

// connect flash
app.use(flash())

// Passport config
configPassport(passport)
app.use(passport.initialize())
app.use(passport.session())


// Router
app.use('/', routerManager)



app.listen(8000, () => {
  console.log('Running in 8000...')
})

module.exports = app
