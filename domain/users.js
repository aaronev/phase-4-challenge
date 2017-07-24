const DBTable = require('../database/database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const UsersTable = new DBTable('users', ['name', 'email', 'password', 'image'])

function encrypt(plainText) {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainText, salt)
}

const toVerifyPassword = (plainText, hashedText) =>
  bcrypt.compareSync(plainText, hashedText)
  
const all = () =>
 UsersTable.getAllRows()
  .then(users => users)
  .catch(error => error)

const byID = userID => 
 UsersTable.getRowsByColumn('id', userID)
  .then(users => users[0])
  .catch(error => error)

const byEmail = value => 
  UsersTable.getRowsByColumn('email', value)
  .then(users => users[0])
  .catch(error => error)

const toAdd = (name, email, password, img) =>
  UsersTable.addRow([
    name, email, encrypt(password), img
  ])
  .then(users =>  users[0])
  .catch(error => error) 

module.exports = {
  all,
  byID,
  toAdd,
  byEmail,
  toVerifyPassword
}