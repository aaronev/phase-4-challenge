const DB = require('../models/database')

const albums = new DB('albums', ['title','artist'])

const all = () => 
  albums.all()
  .then(albums => albums)
  .catch(error => error)

const byID = (albumID) =>
  albums.rowsByColumn('id', albumID)
  .then(album => album[0])
  .catch(error => error)

module.exports = {
  all,
  byID
}