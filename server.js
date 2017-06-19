const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  database.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('error', { error: error })
    } else {
      res.render('index', { albums: albums })
    }
  })
})

app.get('/users/:userID/albums/:albumID', (req, res) => {
  res.send('hello')
})

app.get('/albums/:albumID', (req, res) => {
  const albumID = req.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      res.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      res.render('album', { album: album })
    }
  })
})

app.get('/reviews', (req, res) => {
  database.getReviews((error, reviews) => {
    if (error) {
      res.status(500).send(error)
    } else {
      res.send(reviews)
    }
  })
})

app.post('/reviews' )
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 