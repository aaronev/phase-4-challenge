const Table = require('../database/database')
const DBReviews = new Table('reviews', ['user_id','album_id','review'])

const all = () => 
  DBReviews.getAllRows()
  .then(reviews => reviews)
  .catch(error => error)

const toAdd = (userID, albumID, review) => {
  DBReviews.addRow([userID, albumID, review])
  .then(reviews => reviews)
  .catch(error => error)
}

const byAlbumID = (albumID) => 
  DBReviews.getRowsByColumn('album_id', albumID)
  .then(reviews => reviews)
  .catch(error => error)

const byUserID = (userID) =>
  DBReviews.getRowsByColumn('user_id', userID)
  .then(reviews => reviews)
  .catch(error => error)

const byLatestThree = () =>
  DBReviews.getByLimit(3)
  .then(reviews => reviews)
  .catch(error => error)

const toDelete = (reviewID) => {
  DBReviews.deleteByColumn('id', reviewID)
  .then(reviews => reviews)
  .catch(error => error)
}

  module.exports = {
    all,
    byAlbumID,
    byUserID,
    byLatestThree
  }