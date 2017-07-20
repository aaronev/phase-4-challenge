const users = require('./users')
const albums = require('./albums')
const reviews = require('./reviews')

const render = {}

render.homePageAsThe = response => 
  albums.all()
  .then( albums => {
    users.all()
    .then( users => {
      reviews.byLatestThree()
      .then( reviews => {
        response.render('home', {albums, reviews, users})
      }).catch(error => error)
    })
  })

render.albumsPageAsThe = (response, albumID) =>
  albums.byID(albumID)
  .then( albums => {
    users.all()
    .then( users => {
      reviews.byAlbumID(albumID)
      .then( reviews => {
        response.render('albums', {albums, reviews, users})
      })
    })
  })

render.usersPageAsThe = (response, userID) => 
  albums.all()
  .then( albums => {
    users.byID(userID)
    .then( users => {
       console.log(users)
      reviews.byUserID(userID)
      .then( reviews => {
        response.render('profile', {albums, reviews, users})
      })
    })
  })

render.test = res => 
  users.all()
  .then(users => {
    res.send(users)
  })
module.exports = render