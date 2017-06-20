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
    database.getReviews() 
    .then(reviews => {
      res.render('index', { albums: albums, reviews: reviews})
    })
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
      database.getReviewsByAlbumId(albumID)
      .then(reviews => {
         res.render('non-album', { album: album[0], reviews: reviews})
      })
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
  database.getUserByEmailPassword(email, password)
    .then(user => {
      if (!user[0]) {res.redirect('/logIn')}
      const id = user[0].id
      res.redirect(`/user/${email+password}/${id}/`)
    })
    .catch(next)
})

app.get('/user/:auth/:userId', (req, res, next) => {
  if (isNaN(req.params.userId)) {
    res.redirect('/login')
  }
  database.getUserById(req.params.userId)
    .then(user => {
      database.getAlbums()
        .then(albums => {
           res.render('user-profile', {albums: albums, user: user[0]})
        })
    })
    .catch(next)
})

app.get('/user/:auth/:id/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID
  database.getAlbumsByID(albumID)
    .then(album => {
      database.getReviewsByAlbumId(albumID)
      .then(reviews => {
         res.render('user-album', { album: album[0], reviews: reviews})
      })
    })
    .catch(next)
})

//APIs

app.get('/reviews', (req, res) => {
  database.getReviews()
  .then(reviews => {
    res.send(reviews)
  })
})

app.post('/reviews', (req, res) => {
  database.getReviews()
  .then(reviews => {
    res.send(reviews)
  })
    res.redirect('/')
})

app.get('/users', (req, res) => {
  database.getUsers()
  .then(users => {
    res.send(users)
  })
})

app.post('/users', (req, res) => {
  const user = req.body
  database.addUser(user.name, user.email, user.password, user.image)
  .then(users => {
    res.redirect('/logIn')
  })

})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 