const DB = require('../database/database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const DBUsers = new DB('users', ['name', 'email', 'password', 'image'])

const encrypt = plainText => {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainText, salt)
}

const compareEncryption = (plainText, hashedText) =>
  bcrypt.compareSync(plainText, hashedText)
  
const all = () =>
  DBUsers.all()
  .then(users => users)
  .catch(error => error)

const byID = userID => 
  DBUsers.rowsByColumn('id', userID)
  .then(users => users[0])
  .catch(error => error)

const byEmail = value => 
  DBUsers.rowsByColumn('email', value)
  .then(users => users[0])
  .catch(error => error)

const add = values =>
  byEmail(values[1])
  .then(users => {
    if(users) {
      return {error: 'Email already exist!'}
    } else {
      return DBUsers.add([
        values[0], 
        values[1], 
        encrypt(values[2]), 
        values[3]
      ])
      .then(users => users)
      .catch(error => error)
    } 
  }).catch(error => error)

const verifyAuth = (email, plainTextPassword) =>
  byEmail(email)
  .then( users => {
    if(compareEncryption(plainTextPassword, users.password)) {
      return users
    } else {
      return {error: 'Incorrect email or password!'}
    }
  }).catch(error => error)

module.exports = {
  all,
  byID,
  add,
  byEmail,
  verifyAuth
}