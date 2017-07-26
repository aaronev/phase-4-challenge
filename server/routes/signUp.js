const router = require('express').Router()
const getUsersTable = require('../../domain/users')

router.route('/')
.get((req, res) => {
  res.render('sign-up', { 
    errorSignUp: req.flash('errorSignUp')
  })
})
.post((req, res) => {
  const {name, email, password} = req.body
  defaultImg = '/img/no-dj.png'
  getUsersTable.byEmail(email)
  .then(foundEmail => {
    if (foundEmail) {
      req.flash('errorSignUp', 'Email already exist!')
      res.redirect('/sign-up')
    } else {
      getUsersTable.toAdd(name, email, password, defaultImg)
      .then(addedUsers => { res.redirect('/sign-in') })
    }
  })
})

module.exports = router