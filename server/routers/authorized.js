const { express, renders, getReviewsTable } = require('../config')
const router = express.Router()

router.post('/add/review/:albumID', (req, res, next) => {

 getReviewsTable.toAdd(
  req.user.id, 
  req.params.albumID, 
  req.body.review
  ).then(reviews => {
    console.log('consolelogging reivews', reviews)
    res.redirect(`/albums/${req.params.albumID}`)
  }).catch(next)
})

router.get('/delete/review/:reviewID',(req, res, next) => {
  console.log('in the delete routes reviewID', req.params.reviewID)
 getReviewsTable.toDelete(req.params.reviewID)
 .then( deletedReview => {
  console.log(deletedReview, '**&(YOIBOSKDL:FJDELETD REVIEW')
    if(deletedReview) {
    res.redirect(`/users/${req.user.id}`)
    }
  })
  .catch(next)
})

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router