const router = require('express').Router()
const getAlbumsTable = require('../../domain/albums')
const getReviewsTable = require('../../domain/reviews')
const getUsersTable = require('../../domain/users')

router.get('/', (req, res, next) => {
  getAlbumsTable.all()
  .then( albums => {
    getUsersTable.all()
    .then( users => {
      getReviewsTable.byLatestThree()
      .then( reviews => {
        res.render('home', {albums, reviews, users})
      })
    })
  }).catch(next)
})

router.get('/users/:id', (req, res, next) => {
  getAlbumsTable.all()
  .then( albums => {
    getUsersTable.byID(req.params.id)
    .then( users => {
      if (!users) res.redirect('/')
      getReviewsTable.byUserID(req.params.id)
      .then( reviews => {
        res.render('profile', {
          albums, reviews, users
        })
      })
    })
  }).catch(next)
})

router.get('/albums/:id', (req, res, next) => {
  getAlbumsTable.byID(req.params.id)
  .then( albums => {
    if (!albums) res.redirect('/')
    getUsersTable.all()
    .then( users => {
      getReviewsTable.byAlbumID(req.params.id)
      .then( reviews => {
        res.render('albums', { albums, reviews, users })
      })
    })
  }).catch(next)
})

router.use('/sign-up', require('./signUp'))
router.use('/sign-in', require('./authenticate'))

router.use((req, res, next) => { 
  req.user 
  ? next() 
  : res.redirect('/')
}) 

router.use('/authorized', require('./authorized'))
router.use((req, res) => { res.render('not-found') })


module.exports = router