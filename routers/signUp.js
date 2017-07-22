const express = require('express')
const router = express.Router()
const users = require('../domain/users')

router.route('/')
.get((req, res) => {
  res.render('sign-up', {error: null, userSess: req.user})
})
.post((req, res) => {
  const {name, email, password} = req.body
  defaultImg = '"/img/no-dj.png"'
  users.add([name, email, password, defaultImg])
  .then(users => {
    if (users.error) {
      res.render('sign-up', {error: users.error})
    } else {
      res.redirect('/sign-in') 
    }
  })
})

module.exports = router