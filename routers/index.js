const router = require('express').Router()
const renders = require('./utilities/renders')
const authenticate = require('./utilities/authenticate')
const { authorizedOnly
        , adds
        , deletes } = require('./utilities/authorized')

router.get('/', renders.homePage)
router.get('/users/:id', renders.usersPage)

router.route('/albums/:id')
  .get(renders.albumsPage)
  .post(authorizedOnly, adds.newReview)

router.route('/reviews/:id')
  .delete(authorizedOnly, deletes.review)

router.route('/sign-up')
  .get(renders.signUpPage)
  .post(adds.newUser)

router.route('/sign-in')
  .get(renders.signInPage)
  .post(authenticate.LocalStrategy)

module.exports = router