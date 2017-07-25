const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')
const renders = require('../domain/renders')
const flash = require('connect-flash')
const getUsersTable = require('../domain/users')
const getAlbumsTable = require('../domain/albums')
const getReviewsTable = require('../domain/reviews')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({secret: 'secret'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

passport.serializeUser((users, done) => { 
  done(null, users.id) 
})

passport.deserializeUser((id, done) => {
  getUsersTable.byID(id)
    .then(users => done(null, users)) 
})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
  }, 
  (req, email, plainTextPassword, done) => {
    getUsersTable.byEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, req.flash(
          'errorLogin', 
          'Email not found, please sign up!'
          ))
      } else {
        return getUsersTable.toVerifyPassword(
          plainTextPassword, user.password
        )
        ? done(null, user)
        : done(null, false, req.flash(
            'errorLogin', 
            'Incorrect password!'
        ))
      }
    })
  }
))

module.exports = { 
  express,
  passport,
  renders,
  getUsersTable,
  getAlbumsTable,
  getReviewsTable,
  app 
}