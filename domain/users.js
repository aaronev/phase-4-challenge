const bcrypt = require('bcrypt')
const DB = require('../models/database')

const users = new DB('users', ['name', 'email', 'password', 'image'])

const all = () =>
  users.all()
  .then(users => users)
  .catch(error => error)

const byID = userID => 
  users.rowsByColumn('id', userID)
  .then(users => users[0])
  .catch(error => error)

const add = values => 
  users.add(values)
  .then(users => users[0])
  .catch(error => error)
 
const emailPass = values =>
  users.rowsByTwoColumns('email', 'password', values)
  .then(users => users[0])
  .catch(error => error)

module.exports = {
  all,
  byID,
  add,
  emailPass
}