const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/user.model')

module.exports = function(passport) {
  passport.use('local',
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      User
        .findOne({username: username})
        .then(user => {
          if (!user) {
            return done(null, false, {message: 'Username not found!'})
          }
          if (!user.authenticate(password)) {
            return done(null, false, {message: 'Password incorrect!'})
          }
          return done(null, user)
        })
        .catch(err => done(err))
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById({_id: id}, (err, user) => {
      done(err, user)
    })
  })
}
