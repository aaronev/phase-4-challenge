const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAlbums = function() {
  return db.any("SELECT * FROM albums")
}

const getAlbumsByID = function(albumID) {
  return db.any("SELECT * FROM albums WHERE id = $1", [albumID])
}

const getReviews = function() {
  return db.any(
    `SELECT * FROM reviews 
    JOIN users on users.id = reviews.user_id 
    JOIN albums on albums.id = reviews.album_id
    ORDER BY reviews.timestamp DESC LIMIT 3;`)
}

const getUsers = function() {
  return db.any("SELECT * FROM users")
}

const getUserByEmailPassword = function(email, password) {
  return db.any(`SELECT * FROM users 
    WHERE email = $1 
    AND password = $2`, [email, password])
}

const getUserById = function(id) {
  return db.any(`SELECT * FROM users WHERE id = $1`, [id])
}

const addUser = function(name, email, password, image) {
  return db.none(
    `INSERT INTO 
    users (name, email, password, image) 
    VALUES
    ($1, $2, $3, $4)`,
     [name, email, password, image])
}

const getReviewsByAlbumId = function(albumId) {
  return db.any(`SELECT * FROM reviews WHERE album_id = $1 ORDER BY timestamp DESC`, [albumId])
} 

module.exports = {
  getAlbums,
  getAlbumsByID,
  getReviews,
  getUsers,
  getUserByEmailPassword,
  getUserById,
  addUser,
  getReviewsByAlbumId
}
