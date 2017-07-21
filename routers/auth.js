const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../domain/users')
const express = require('express')
const router = express.Router()

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
  console.log('in the serialize')
  console.log(user.id)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('in the deserialize')
  console.log(id)
  users.byID(id)
    .then(users => done(null, users))
    .catch(error => done(error, null))
})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, plainTextPassword, done) => {
    users.verifyAuth(email, plainTextPassword)
    .then(users => {
      if (users.error) {
        return done(null, false)
      } else {
        return done(null, users)
      }
    })
  }
))

router.route('/')
.get((req, res) => {
  res.render('sign-in', {error: null})
})
.post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in'
}))

module.exports = router