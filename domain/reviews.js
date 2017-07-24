const DBTable = require('../database/database')
const ReviewsTable = new DBTable('reviews', ['user_id','album_id','review'])

const all = () => 
  ReviewsTable.getAllRows()
  .then(reviews => reviews)
  .catch(error => error)

const toAdd = (userID, albumID, review) => 
  ReviewsTable.addRow([userID, albumID, review])
  .then(reviews => reviews[0])
  .catch(error => error)

const byAlbumID = (albumID) => 
  ReviewsTable.getRowsByColumn('album_id', albumID)
  .then(reviews => reviews)
  .catch(error => error)

const byUserID = (userID) =>
  ReviewsTable.getRowsByColumn('user_id', userID)
  .then(reviews => reviews)
  .catch(error => error)

const byLatestThree = () =>
  ReviewsTable.getByLimit(3)
  .then(reviews => reviews)
  .catch(error => error)

const toDelete = (reviewID) => 
  ReviewsTable.deleteByColumn('id', reviewID)
  .then(reviews => reviews)
  .catch(error => error)

  module.exports = {
    all,
    byAlbumID,
    byUserID,
    byLatestThree,
    toAdd,
    toDelete
  }