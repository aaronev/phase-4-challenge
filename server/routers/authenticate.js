const { express, passport, LocalStrategy, users } = require('../config')
const router = express.Router()

passport.serializeUser((users, done) => { 
  console.log('6. it then gets into the serialized usersuser user.id', users.id)
  done(null, users.id) 
})

passport.deserializeUser((id, done) => {
  users.byID(id)
    .then(users => done(null, users)) 
})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, plainTextPassword, done) => {
    console.log('1. logging in with email and password')
    users.verifyAuth(email, plainTextPassword)
    .then(users => { 
      if (users) {
        console.log('in the verifyAuth then:::', users)
        done(null, users) 
      } else { 
        console.log('in the verifyAuth else then:::', users)
        done(null, false)
      }
    })
    .catch(error => error)
  }
))

router.route('/')
.get((req, res) => {
  res.render('sign-in')
})
.post( passport.authenticate('local')
  , (req, res) => {
    req.user
    ? res.redirect(`/authorized/users/${req.user.id}`)
    : res.redirect('/sign-in')
  }
)


module.exports = router