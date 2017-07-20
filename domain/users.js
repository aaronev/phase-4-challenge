const DB = require('../database/database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const DBUsers = new DB('users', ['name', 'email', 'password', 'image'])

const encrypt = plainText => {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainText, salt)
}

const compareHash = (plainText, hashedText) =>
  bcrypt.compareSync(plainText, hashedText)
  
const all = () =>
  DBUsers.all()
  .then(users => users)
  .catch(error => error)

const byID = userID => 
  DBUsers.rowsByColumn('id', userID)
  .then(users => users[0])
  .catch(error => error)

const getEmail = value => 
  DBUsers.rowsByColumn('email', value)
  .then(users => users[0])
  .catch(error => error)

const add = values =>
  getEmail(values[1])
  .then(users => {
    if(users) {
      return {error: 'Email already exist!'}
    } else {
      return DBUsers.add([
        values[0], values[1], encrypt(values[2]), values[3]
      ])
      .then(users => users)
      .catch(error => error)
    } 
  })
  .then(users => users)
  .catch(error => error)


const verifyAuth = (email, plainPassword) =>
  getEmail(email)
  .then( users => {
    if(compareHash(plainPassword, DBUsers.password)) {
      return users
    } else {
      return {error: 'Incorrect email or password!'}
    }
  }).catch(error => error)

module.exports = {
  all,
  byID,
  add,
  getEmail,
  verifyAuth
}