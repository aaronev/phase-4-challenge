const { app, renders } = require('./server/config')

app.use('/console', renders.console)
app.get('/', renders.homePageAsTheResponse)
app.get('/users/:id', renders.usersPageAsTheResponse)
app.get('/albums/:id', renders.albumsPageAsTheResponse)
app.use('/sign-up', require('./routers/signUp'))
app.use('/sign-in', require('./routers/authenticate'))

app.use((req, res, next) => {
  req.user 
  ? next() 
  : res.redirect('/') 
}) 

app.use('/authorized', require('./routers/authorized'))
app.use((req, res) => { res.render('not_found') })

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})