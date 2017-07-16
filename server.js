const express = require('express')
const bodyParser = require('body-parser')
const {select, add, del} = require('./domain/queries')
const app = express()

require('ejs')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  select.allAlbums
  .then(albums => {
    select.allUsers
    .then( users => {
      select.latestThreeReviews
      .then( reviews => {
        res.render('home', {albums, reviews, users})
      })
    })
  }).catch(next)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 