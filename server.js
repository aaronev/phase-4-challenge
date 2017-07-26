const express = require('express')
const passport = require('./config/authentication')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const routes = require('./server/routes')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({secret: 'secret'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.userSess = req.user
  next()
})

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})