const getAlbums = require('./albums')
const getReviews = require('./reviews')
const getUsers = require('./users')

const render = {}

render.homePageAsTheResponse = (req, res, next) => {
  req.user
  ? res.redirect(`/users/${req.user.id}`)
  : getAlbums.all()
  .then( albums => {
    getUsers.all()
    .then( users => {
      getReviews.byLatestThree()
      .then( reviews => {
        res.render('home', {albums, reviews, users})
      })
    })
  }).catch(next)
}

render.albumsPageAsTheResponse = (req, res, next) => {
  getAlbums.byID(req.params.id)
  .then( albums => {
    getUsers.all()
    .then( users => {
      getReviews.byAlbumID(req.params.id)
      .then( reviews => {
        res.render('albums', { albums, reviews, users })
      })
    })
  }).catch(next)
}

render.usersPageAsTheResponse = (req, res, next) => {
  getAlbums.all()
  .then( albums => {
    getUsers.byID(req.params.id)
    .then( users => {
      getReviews.byUserID(req.params.id)
      .then( reviews => {
        res.render('profile', {
          albums, reviews, users
        })
      })
    })
  }).catch(next)
} 

module.exports = render