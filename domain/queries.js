const db = require('../models/database')

const del = {
  reviewsByID: id => db.deleteRowsByID('reviews', 'id', id)
}

const get = {
  allAlbums:  db.getAllFromTable('albums').then(albums => albums),
  allUsers: db.getAllFromTable('users').then(albums => albums),
  allReviews: db.getAllFromTable('reviews').then(albums => albums),
  albumByID: id => db.getRowsByColumn('albums', 'id', id).then(albums => albums[0]),
  userByID: id => db.getRowsByColumn('users', 'id', id).then(users => users[0]),
  reviewsByID: id => db.getRowsByColumn('reviews', 'id', id).then(reviews => reviews[0])
}

const add = {
  user: values => db.insertInto('users', '(name, email, password, image)', values),
  review: values => db.insertInto('reviews', '(user_id, album_id, review)', values)
}

module.exports = {get, del, add}