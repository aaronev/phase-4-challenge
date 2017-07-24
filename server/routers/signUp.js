const { express, getUsersTable } = require('../config')
const router = express.Router()

router.route('/')
.get((req, res) => {
  res.render('sign-up')
})
.post((req, res) => {
  const {name, email, password} = req.body
  defaultImg = '/img/no-dj.png'
  getUsersTable.toAdd(name, email, password, defaultImg)
  .then(users => {
    console.log('in the sign-up route', users)
    if (users.error) {
      res.redirect('/sign-up')
    } else {
      res.redirect('/sign-in') 
    }
  })
})

module.exports = router