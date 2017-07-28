const getAlbumsTable = require('../../domain/albums')
const getReviewsTable = require('../../domain/reviews')
const getUsersTable = require('../../domain/users')

const adds = {}
const deletes = {}

const authorizedOnly = (req, res, next) => { 
  req.user 
  ? next() 
  : res.redirect('/')
}

adds.newUser = (req, res) => {
  const {name, email, password} = req.body
  defaultImg = '/img/no-dj.png'
  getUsersTable.byEmail(email)
  .then(foundEmail => {
    if (foundEmail) {
      req.flash('errorSignUp', 'Email already exist!')
      res.redirect('/sign-up')
    } else {
      getUsersTable.toAdd(name, email, password, defaultImg)
      .then(addedUsers => { res.redirect('/sign-in') })
    }
  })
}

adds.newReview = (req, res, next) => {
  getReviewsTable.toAdd(
    req.user.id, 
    req.params.id, 
    req.body.review
    ).then( reviews => {
      res.redirect(`/albums/${req.params.id}`)
  }).catch(next)
} 

deletes.review = (req, res, next) => {
  getReviewsTable.toDelete(req.params.id)
  .then( deletedReview => {
    if(deletedReview) {
    res.redirect(`/users/${req.user.id}`)
    }
  }).catch(next)
}


module.exports = {adds, deletes, authorizedOnly}