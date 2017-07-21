const DB = require('../database/database')
const DBReviews = new DB('reviews', ['user_id','album_id','review'])

const all = () => 
  DBReviews.all()
  .then(reviews => reviews)
  .catch(error => error)

const byAlbumID = (albumID) => 
  DBReviews.rowsByColumn('album_id', albumID)
  .then(reviews => reviews)
  .catch(error => error)

const byUserID = (userID) =>
  DBReviews.rowsByColumn('user_id', userID)
  .then(reviews => reviews)
  .catch(error => error)

const byLatestThree = () =>
  DBReviews.limitQuery(3)
  .then(reviews => reviews)
  .catch(error => error)

  module.exports = {
    all,
    byAlbumID,
    byUserID,
    byLatestThree
  }