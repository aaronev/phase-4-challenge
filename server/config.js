const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')
const renders = require('../domain/renders')
const getUsers = require('../domain/users')
const getReviews = require('../domain/reviews')
const getAlbums = require('../domain/albums')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.set('trust proxy', 1)
app.use(session({secret: 'secret'}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

module.exports = { 
  express,
  app, 
  passport, 
  getUsers,
  LocalStrategy, 
  renders,
  getReviews,
  getAlbums
}