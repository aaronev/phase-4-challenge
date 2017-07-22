const users = require('./users')
const albums = require('./albums')
const reviews = require('./reviews')

const render = {}

render.homePageAsTheResponse = (req, res, next) => {
 albums.all()
  .then( albums => {
    users.all()
    .then( users => {
      reviews.byLatestThree()
      .then( reviews => {
        res.render('home', {albums, reviews, users})
      })
    })
  }).catch(next)
}

render.albumsPageAsTheResponse = (req, res, next) => {
  albums.byID(req.params.id)
  .then( albums => {
    users.all()
    .then( users => {
      reviews.byAlbumID(req.params.id)
      .then( reviews => {
        res.render('albums', { albums, reviews, users })
      })
    })
  }).catch(next)
}

render.usersPageAsTheResponse = (req, res, next) => {
  console.log('domain renders file req.user see if it exits', req.user)
  albums.all()
  .then( albums => {
    users.byID(req.params.id)
    .then( users => {
      reviews.byUserID(req.params.id)
      .then( reviews => {
        res.render('profile', {
          albums, reviews, users
        })
      })
    })
  }).catch(next)
} 

module.exports = render