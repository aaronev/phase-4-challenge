const getReviewsTable = require('../../domain/reviews')
const router = require('express').Router()

router.post('/add/review/:albumID', (req, res, next) => {
 getReviewsTable.toAdd(
  req.user.id, 
  req.params.albumID, 
  req.body.review
  ).then( reviews => {
    res.redirect(`/albums/${req.params.albumID}`)
  }).catch(next)
})

router.delete('/delete/:reviewID', (req, res, next) => {
 getReviewsTable.toDelete(req.params.reviewID)
 .then( deletedReview => {
    if(deletedReview) {
    res.redirect(`/users/${req.user.id}`)
    }
  }).catch(next)
})

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router