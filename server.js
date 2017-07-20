require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const render = require('./domain/render')
const signUpRoutes = require('./routers/signUp')
const authenticationRoutes = require('./routers/auth')
const app = express()

require('ejs')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: process.env.SECRET }))

app.use((req, res, next) => {
  res.locals.query = ''
  res.locals.user = req.user
  next()
})

app.get('/', render.homePage)
app.get('/albums/:id', render.albumsPage)
app.get('/users/:id', render.usersPage)
app.use('/sign-up', signUpRoutes)
app.use('/sign-in', authenticationRoutes)

app.get('/sign-out', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

app.get('/test', render.test)

app.use((req, res) => {res.render('not_found')})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})