const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Helpers

renAlb = (albums, reviews, auth) =>  {
  return  {
    albums: albums,
    reviews: reviews,
    auth: auth
  }
}

renRev = (user, reviews, auth) =>  {
  return  {
      user: user,
      reviews: reviews,
      auth: auth
  }
}

// Non Users Accessibility

app.get('/', (req, res, next) => {
  database.getAlbums()
  .then(albums => {
    database.getReviews() 
    .then(reviews => {
      res.render('index', 
        renAlb(albums, reviews, null))
    })
  })
  .catch(next)
})

app.get('/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID
  database.getAlbumsByID(albumID)
  .then(albums => {
    database.getReviewsByAlbumId(albumID)
    .then(reviews => {
      res.render('non-album', 
        renAlb(albums[0], reviews, null))
    })
  })
  .catch(next)
})

app.get('/user/:userID', (req, res, next) => {
  const {userID} = req.params
  database.getUserById(userID)
  .then(user => {
    database.getReviewsByUserID(userID)
    .then(reviews => {
      res.render('non-profile', 
        renRev(user[0], reviews, null))            
    })
  })
  .catch(next)
})

app.get('/sign-up', (req, res) => {
  res.render('non-signUpForm', {auth: null})
})

app.post('/email-availabilty', (req, res, next) => {
  const user = req.body
  const email = user.email || null
  const password = user.password || null
  database.verifyEmail(req.body.email)
  .then(anEmail => {
    if (anEmail.length !== 0) {
      res.render('error-signup', 
        {auth: null})}
    else if (email && password) {
      database.addUser(
        user.name, 
        user.email, 
        user.password, 
        user.image
        )
      .then(users => {
        res.redirect('/verify-user')
      })
    }
    else res.redirect('/sign-up')
  })
})

app.post('/users', (req, res) => {
  const user = req.body
  const email = user.email || null
  const password = user.password || null
  if (user.email && password) {
    database.addUser(user.name, user.email, user.password, user.image)
    .then(users => {
      res.redirect('/verify-user')
    })
  }
  else res.redirect('/sign-up')
})

app.get('/verify-user', (req, res) => {
  res.render('user-new-verify', {auth: null})
})

app.get('/login', (req, res) => {
  res.render('user-login', {auth: null})
})

//Authenticated Users

app.post('/user', (req, res, next) => {
  const logEmail = req.body.email
  const logPassword = req.body.password
  database.getUserByEmailPassword(logEmail, logPassword)
  .then(user => {
    if (!user[0]) {res.redirect('/login')}
    const id = user[0].id
    res.redirect(`/user/${logEmail+logPassword}/${id}/`)
  })
  .catch(next)
})

app.get('/user/:auth/:userID/', (req, res, next) => {
  if (isNaN(req.params.userID)) {res.redirect('/login')}
  database.getUserById(req.params.userID)
  .then(user => {
    database.getAlbums()
    .then(albums => {
      database.getReviewsByUserID(req.params.userID)
      .then(reviews => {
        res.render('user-profile', {
        albums: albums, 
        user: user[0],
        reviews: reviews,
        auth: req.params.auth,
        userID: req.params.userID
        })            
      })
    })
  })
  .catch(next)
})

app.get('/user/:auth/:id/albums/:albumID', (req, res, next) => {
  const albumID = req.params.albumID
  const auth = req.params.auth
  const userID = req.params.id
  database.getAlbumsByID(albumID)
  .then(album => {
    database.getReviewsByAlbumId(albumID)
    .then(reviews => {
     database.getMoreReviews()
     .then(reviewID => {
        res.render('user-album', { 
        album: album[0], 
        reviews: reviews, 
        albumID: albumID,
        userID: userID,
        auth: auth
      })
     })
    })
  })
  .catch(next)
})

app.post('/user/:auth/:userID/delete', (req, res, next) => {
  database.getUserById(req.params.userID)
  .then(user => {
    database.getAlbums()
    .then(albums => {
      database.getReviewsByUserID(req.params.userID)
      .then(reviews => {
        res.render('verify-delete', {
        albums: albums, 
        user: user[0],
        reviews: reviews,
        auth: req.params.auth,
        userID: req.params.userID,
        deleteReview: req.body.reviewID
        })            
      })
    })
  })
  .catch(next)
})

app.get('/user/:auth/:userId/view/:Id', (req, res, next) => {
  if (isNaN(req.params.userId)) {
    res.redirect('/login')
  }
  database.getUserById(req.params.Id)
  .then(user => {
    database.getReviewsByUserID(req.params.Id)
    .then(reviews => {
      res.render('user-view-profile', {
      user: user[0],
      reviews: reviews,
      auth: req.params.auth,
      userID: req.params.userId
      })            
    })
  })
  .catch(next)
})

//APIs

app.get('/user/:auth/:userID/delete/:reviewID', (req, res) => {
  const reviewID = req.params.reviewID
  const auth = req.params.auth
  const userID = req.params.userID
  database.deleteReviewByID(reviewID)
  .then(() => {
    res.redirect(`/user/${auth}/${userID}/`)
  })
})

app.get('/reviews', (req, res) => {
  database.getMoreReviews()
  .then(reviews => {
    res.send(reviews)
  })
})

app.post('/reviews', (req, res) => {
  const auth = req.body.auth
  const userID = req.body.user_id
  const albumID = req.body.album_id
  const review = req.body.review || null
  if (review !== null) {
    database.addReview(userID, albumID, review)
    .then(reviews => {
      res.redirect(`/user/${auth}/${userID}/albums/${albumID}`)
    })
  }
  res.redirect(`/user/${auth}/${userID}/albums/${albumID}`)
})

app.get('/reviews/:id', (req, res) => {
  const id = req.params.id
  database.getReviewsById(id)
  .then(review => {
    res.send(review)
  })
})

app.get('/users', (req, res) => {
  database.getUsers()
  .then(users => {
    res.send(users)
  })
})

app.get('/users', (req, res) => {
  database.verifyEmail(req.body.email)
  .then(email => {
    res.render('error-signup')
  })  
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 