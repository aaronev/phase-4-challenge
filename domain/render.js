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
  get.albumByID(id)
  .then( albums => {
    get.allUsers
    .then( users => {
      get.ReviewsByAlbumID(id)
      .then( reviews => {
        response.render('albums', {albums, reviews, users})
      })
    })
  })

render.usersPageAsThe = (response, userID) => 
  get.albumByID(id)
  .then( albums => {
    get.usersByID(userID)
    .then( users => {
      get.ReviewsByUserID(userID)
      .then( reviews => {
        response.render('albums', {albums, reviews, users})
      })
    })
  })

module.exports = render