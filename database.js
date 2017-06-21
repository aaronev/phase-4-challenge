const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAlbums = function() {
  return db.any("SELECT * FROM albums;")
}

const getAlbumsByID = function(albumID) {
  return db.any("SELECT * FROM albums WHERE id = $1;", [albumID])
}

const getReviews = function() {
  return db.any(
    `SELECT * FROM reviews 
    JOIN users on users.id = reviews.user_id 
    JOIN albums on albums.id = reviews.album_id
    ORDER BY reviews.timestamp DESC LIMIT 3;`)
}

const getMoreReviews = function() {
  return db.any(
    `SELECT * FROM reviews 
    JOIN users on users.id = reviews.user_id 
    JOIN albums on albums.id = reviews.album_id
    ORDER BY reviews.timestamp DESC;`
    )
}
const getUsers = function() {
  return db.any("SELECT * FROM users;")
}

const getUserByEmailPassword = function(email, password) {
  return db.any(`SELECT * FROM users 
    WHERE email = $1 
    AND password = $2;`, [email, password])
}

const getUserById = function(id) {
  return db.any(`SELECT * FROM users WHERE id = $1;`, [id])
}

const addUser = function(name, email, password, image) {
  return db.none(
    `INSERT INTO 
    users (name, email, password, image) 
    VALUES
    ($1, $2, $3, $4);`,
     [name, email, password, image])
}

const getReviewsByAlbumId = function(albumId) {
  return db.any(`SELECT * FROM reviews 
    JOIN users on users.id = reviews.user_id 
    JOIN albums on albums.id = reviews.album_id
    WHERE album_id = $1 ORDER BY reviews.timestamp DESC;`, [albumId])
} 

const addReview = function(userID, albumID, review) {
   return db.none(
    `INSERT INTO reviews (user_id, album_id, review)
    VALUES ($1, $2, $3);`, 
    [userID, albumID, review])
}

const getReviewsByUserID = function(userID) {
    return db.any(`SELECT * FROM reviews 
    JOIN users on users.id = reviews.user_id 
    JOIN albums on albums.id = reviews.album_id
    WHERE user_id = $1 ORDER BY reviews.timestamp DESC;`, [userID])
}

const deleteReviewByID = function(id, userID) {
  return db.none(`DELETE FROM reviews WHERE id = $1 AND user_id = $2;`, [id, userID]);
}

const getReviewsById = function(id) {
  return db.any(`SELECT * FROM reviews WHERE id = $1`, [id])
}

const findUserByEmail = function(email) {
  return db.any(`SELECT * FROM users WHERE email = $1`, [email])

}
module.exports = {
  getAlbums,
  getAlbumsByID,
  getReviews,
  getUsers,
  getUserByEmailPassword,
  getUserById,
  addUser,
  getReviewsByAlbumId,
  addReview,
  getReviewsByUserID,
  deleteReviewByID,
  getReviewsById,
  findUserByEmail,
  getMoreReviews
}
