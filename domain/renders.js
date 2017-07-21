const users = require('./users')
const albums = require('./albums')
const reviews = require('./reviews')

const render = {}

render.homePage = (req, res, next) => {
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

render.albumsPage = (req, res, next) => {
  albums.byID(req.params.id)
  .then( albums => {
    users.all()
    .then( users => {
      reviews.byAlbumID(req.params.id)
      .then( reviews => {
        res.render('albums', {albums, reviews, users})
      })
    })
  }).catch(next)
}

render.usersPage = (req, res, next) => {
  albums.all()
  .then( albums => {
    users.byID(req.params.id)
    .then( users => {
       console.log(users)
      reviews.byUserID(req.params.id)
      .then( reviews => {
        res.render('profile', {albums, reviews, users})
      })
    })
  }).catch(next)
} 

render.test = (req, res, next) => {
  users.all()
  .then(users => {
    res.send(users)
  }).catch(next)
}

module.exports = render