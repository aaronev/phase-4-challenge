const express = require('express')
const passport = require('./config/authentication')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
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

app.use('/', require('./routers'))

app.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})

app.use((req, res) => { 
  res.render('./errors/not-found') 
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})