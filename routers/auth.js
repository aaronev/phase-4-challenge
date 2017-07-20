const users = require('../domain/users')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const localStrategy = require('passport-local')

router.route('/')
.get((req, res) => {
  res.render('sign-in')
})
.post((req, res) => {
  const {email, password} = req.body
  
})

module.exports = router