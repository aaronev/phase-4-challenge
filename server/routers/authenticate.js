const { express, passport} = require('../config')
const router = express.Router()

router.route('/')
.get((req, res) => {
   res.render('sign-in', { 
    errorLogin: req.flash('errorLogin') 
  })
})
.post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: true
}))

module.exports = router