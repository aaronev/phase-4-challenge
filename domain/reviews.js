const DB = require('../database/database')

const reviews = new DB('reviews', ['user_id','album_id','review'])

const all = () => 
  reviews.all()
  .then(reviews => reviews)
  .catch(error => error)

const byAlbumID = (albumID) => 
  reviews.rowsByColumn('album_id', albumID)
  .then(reviews => reviews)
  .catch(error => error)

const byUserID = (userID) =>
  reviews.rowsByColumn('user_id', userID)
  .then(reviews => reviews)
  .catch(error => error)

const byLatestThree = () =>
  reviews.limitQuery(3)
  .then(reviews => reviews)
  .catch(error => error)

  module.exports = {
    all,
    byAlbumID,
    byUserID,
    byLatestThree
  }