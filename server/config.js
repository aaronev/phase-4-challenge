const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')
const renders = require('../domain/renders')
const getUsersTable = require('../domain/users')
const getAlbumsTable = require('../domain/albums')
const getReviewsTable = require('../domain/reviews')
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
  passport, 
  LocalStrategy, 
  renders,
  getUsersTable,
  getAlbumsTable,
  getReviewsTable,
  app 
}