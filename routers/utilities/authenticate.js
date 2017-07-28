const passport = require('../../config/authentication')
const authenticates = {}

authenticates.LocalStrategy = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true
})

module.exports = authenticates