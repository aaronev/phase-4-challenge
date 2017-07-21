const DB = require('../database/database')

const DBAlbums = new DB('albums', ['title','artist'])

const all = () => 
  DBAlbums.all()
  .then(albums => albums)
  .catch(error => error)

const byID = (albumID) =>
  DBAlbums.rowsByColumn('id', albumID)
  .then(album => album[0])
  .catch(error => error)

module.exports = {
  all,
  byID
}