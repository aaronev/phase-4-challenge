const Table = require('../database/database')
const DBAlbums = new Table('albums', ['title','artist'])

const all = () => 
  DBAlbums.getAllRows()
  .then(albums => albums)
  .catch(error => error)

const byID = (albumID) =>
  DBAlbums.getRowsByColumn('id', albumID)
  .then(album => album[0])
  .catch(error => error)

module.exports = {
  all,
  byID
}