const getAlbumsTable = require('../../domain/albums')
const getReviewsTable = require('../../domain/reviews')
const getUsersTable = require('../../domain/users')

const renders = {}

renders.homePage = (req, res, next) => {
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
}

renders.albumsPage = (req, res, next) => {
  getAlbumsTable.byID(req.params.id)
  .then( albums => {
    if (!albums[0]) res.render('./errors/not-found')
    getUsersTable.all()
    .then( users => {
      getReviewsTable.byAlbumID(req.params.id)
      .then( reviews => {
        res.render('albums', { albums, reviews, users })
      })
    })
  }).catch(next)
}

renders.usersPage = (req, res, next) => {
  getAlbumsTable.all()
  .then( albums => {
    getUsersTable.byID(req.params.id)
    .then( users => {
      if (!users[0]) res.render('./errors/not-found')
      getReviewsTable.byUserID(req.params.id)
      .then( reviews => {
        res.render('profile', {
          albums, reviews, users
        })
      })
    })
  }).catch(next)
}

renders.signUpPage = (req, res) => {
  res.render('sign-up', { 
    errorSignUp: req.flash('errorSignUp')
  })
}

renders.signInPage = (req, res) => {
  res.render('sign-in', { 
    errorLogin: req.flash('errorLogin') 
  })
}

module.exports = renders