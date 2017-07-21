require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const renders = require('./domain/renders')
const signUpRoutes = require('./routers/signUp')
const authRoutes = require('./routers/auth')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: process.env.SECRET}))
app.use((req, res, next) => {
  res.locals.query = ''
  res.locals.user = req.user
  next()
})

app.get('/', renders.homePage)
app.get('/albums/:id', renders.albumsPage)
app.get('/users/:id', renders.usersPage)
app.use('/sign-up', signUpRoutes)
app.use('/sign-in', authRoutes)
app.get('/sign-out', (req, res) => {
  req.logout()
  res.redirect('/')
})
app.use((req, res) => {res.render('not_found')})

app.get('/test', renders.test)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})