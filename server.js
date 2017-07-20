const express = require('express')
const bodyParser = require('body-parser')
const render = require('./domain/render')
const auth = require('./routers/auth')
const signUp = require('./routers/signUp')
const app = express()

require('ejs')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.locals.query = ''
  res.locals.user = req.user
  next()
})

app.get('/', (req, res, next) => { 
  render.homePageAsThe(res)
  .catch(next)
})

app.get('/albums/:id', (req, res, next) => {
  render.albumsPageAsThe(res, req.params.id)
  .catch(next)
})

app.get('/users/:id', (req, res, next) => {
  render.usersPageAsThe(res, req.params.id)
  .catch(next)
})

app.use('/sign-up', signUp)

app.use('/sign-in', auth)

app.get('/sign-out', (req, res, next) => {
  //req.logout()
  res.redirect('/')
})

app.use( ( req, res ) => { res.render( 'not_found' ) } )

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
 