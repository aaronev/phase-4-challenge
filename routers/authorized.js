const { router, renders } = require('../server/config')

console.log('it gets in the authorized routes******************')

router.use('/', (req, res, next) => { //authorizing
  console.log('req.user in the authorized route', req.user)
  next()
})

router.route('/users/:id').get(renders.usersPageAsTheResponse)
router.get('/albums/:id', renders.albumsPageAsTheResponse)

app.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router