const express = require('express')
const router = express.Router()
const users = require('../domain/users')

router.route('/')
.get((req, res) => {
  res.render('sign-up')
})
.post((req, res) => {
  const {name, email, password} = req.body
  console.log(name, email, password)
  defaultImg = '../public/img/no-dj.png'
  users.add([name, email, password, defaultImg])
    .then( () => { res.redirect('/sign-in') })
})

module.exports = router