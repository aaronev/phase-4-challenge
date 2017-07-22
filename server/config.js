const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')
const renders = require('../domain/renders')
const users = require('../domain/users')

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

module.exports = { 
	app, 
	passport, 
	users,
	router, 
	LocalStrategy, 
	renders
}