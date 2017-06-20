const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Non Users

app.get('/', (req, res, next) => {
  database.getAlbums()
  .then(albums => {
    res.render('index', { albums: albums })
  })
  .catch(next)
})

app.get('/logIn', (req, res) => {
  res.render('user-login')
})

app.get('/signUp', (req, res) => {
  res.render('non-signUpForm')
})

app.get('/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID
  database.getAlbumsByID(albumID)
    .then(album => {
      res.render('non-album', { album: album[0] })
    })
    .catch(next)
})

app.get('/user/:userId', (req, res, next) => {
  if (isNaN(req.params.userId)) {
    res.redirect('/login')
  }
  database.getUserById(req.params.userId)
    .then(user => {
      res.render('non-profile', {user: user[0]})
    })
    .catch(next)
})

//Authenticated Users

app.post('/user', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  console.log(email, password)
  database.getUserByEmailPassword(email, password)
    .then(user => {
      if (!user[0]) {res.redirect('/logIn')}
      const id = user[0].id
      res.redirect(`/user/${email+password}/${id}`)
    })
    .catch(next)
})

app.get('/user/:emailPassword/:userId', (req, res, next) => {
  if (isNaN(req.params.userId)) {
    res.redirect('/login')
  }
  database.getUserById(req.params.userId)
    .then(user => {
      res.render('user-profile', {user: user[0]})
    })
    .catch(next)
})

app.get('/users/:userID/albums/:albumID', (req, res) => {
  res.send('hello')
})



//APIs

app.get('/reviews', (req, res) => {
  database.getReviews()
  .then(reviews => {
    res.send(reviews)
  })
})

app.get('/users', (req, res) => {
  database.getUsers()
  .then(users => {
    res.send(users)
  })
})

app.post('/users', (req, res) => {
  const user = req.body
  console.log(user)
  database.addUser(user.name, user.email, user.password, user.image)
  .then(users => {

    res.redirect('/logIn')
  })

})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 