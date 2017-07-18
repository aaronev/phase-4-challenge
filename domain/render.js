const {get, add, del} = require('./queries')

const render = {}

render.homePageAsThe = (response) => 
  get.allAlbums
  .then( albums => {
    get.allUsers
    .then( users => {
      get.latestThreeReviews
      .then( reviews => {
        response.render('home', {albums, reviews, users})
      })
    })
  })

render.albumsPageAsThe = (response, albumID) =>
  get.albumByID(albumID)
  .then( albums => {
    get.allUsers
    .then( users => {
      get.reviewsByAlbumID(albumID)
      .then( reviews => {
        response.render('albums', {albums, reviews, users})
      })
    })
  })

render.usersPageAsThe = (response, userID) => 
  get.allAlbums
  .then( albums => {
    get.userByID(userID)
    .then( users => {
      get.reviewsByUserID(userID)
      .then( reviews => {
        response.render('profile', {albums, reviews, users})
      })
    })
  })

module.exports = render