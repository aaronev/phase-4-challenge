const DBTable = require('../database/database')
const AlbumsTable = new DBTable('albums', ['title','artist'])

const all = () => 
  AlbumsTable.getAllRows()
  .then(albums => albums)
  .catch(error => error)

const byID = (albumID) =>
  AlbumsTable.getRowsByColumn('id', albumID)
  .then(album => album[0])
  .catch(error => error)

module.exports = {
  all,
  byID
}