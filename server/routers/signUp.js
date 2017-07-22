const { express, users } = require('../config')
const router = express.Router()

router.route('/')
.get((req, res) => {
  res.render('sign-up')
})
.post((req, res) => {
  const {name, email, password} = req.body
  defaultImg = '/img/no-dj.png'
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