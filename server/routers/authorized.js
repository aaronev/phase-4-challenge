const { express, renders, getReviews } = require('../config') 
const router = express.Router()

router.post('/add/review/:id', (req, res, next) => {
  getReviews.toAdd(req.user.id, req.params.id, req.body.review)
  .then(() => {
    res.redirect(`/albums/${req.params.id}`)
  })
  .catch(next)
})

router.post('/delete/review/:id',(req, res, next) => {
  getReviews.toDelete(req.params.id)
  .then(() => {
    res.redirect(`/users/${req.user.id}`)
  })
  .catch(next)
})

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router