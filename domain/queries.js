const db = require('../models/database')

const select = {
  allUsers: db.getAllFromTable('users'),
  allAlbums:  db.getAllFromTable('albums'),
  allReviews: db.getAllFromTable('reviews'),
  latestThreeReviews: db.getWithLimits('reviews', '3'),
  userByID: id => db.getRowsByColumn('users', 'id', id),
  albumByID: id => db.getRowsByColumn('albums', 'id', id),
  reviewsByID: id => db.getRowsByColumn('reviews', 'id', id),
  reviewsByUserID: id => db.getRowsByColumn('reviews', 'user_id', id),
  reviewsByAlbumID: id => db.getRowsByColumn('reviews', 'album_id', id)
}

const add = {
  user: values => db.insertInto('users', '(name, email, password, image)', values),
  review: values => db.insertInto('reviews', '(user_id, album_id, review)', values)
}

const del = {
  reviewsByID: id => db.deleteRowsByID('reviews', 'id', id)
}

module.exports = {select, del, add}