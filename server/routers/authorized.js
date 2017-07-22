const { express, renders } = require('../config')
const router = express.Router()

router.route('/users/:id')
  .get(renders.usersPageAsTheResponse)
  .post()

router.route('/albums/:id')
  .get(renders.albumsPageAsTheResponse)
  .post()

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

module.exports = router