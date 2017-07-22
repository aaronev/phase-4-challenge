const { router, passport, users, LocalStrategy } = require('../server/config')

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
.get((req, res) => {res.render('sign-in')})
.post( passport.authenticate('local', {
  successRedirect: '/authorized/',
  failureRedirect: '/sign-in'
}))


module.exports = router