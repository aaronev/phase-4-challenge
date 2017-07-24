const DBTable = require('../database/database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const UsersTable = new DBTable('users', ['name', 'email', 'password', 'image'])

function encrypt(plainText) {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainText, salt)
}

function compareEncryption(plainText, hashedText) {
  return bcrypt.compareSync(plainText, hashedText)
}
  
const all = () =>
 UsersTable.getAllRows()
  .then(users => users)
  .catch(error => error)

const byID = userID => 
 UsersTable.getRowsByColumn('id', userID)
  .then(users => users[0])
  .catch(error => error)

const byEmail = value => {
console.log('3. it verifies the email first')
 return UsersTable.getRowsByColumn('email', value)
  .then(users => { 
    console.log('users in the byEmal:&(*&(&::', users)
    return users[0] 
  })
  .catch(error => error)
}

const toAdd = (name, email, password, img) =>
  byEmail(email)
  .then(users => {
    console.log('in the to add funcitons users', users)
    if (users) { 
      return { error: 'Email already exist!'}
    } else {
       return UsersTable.addRow(
        [name, email, encrypt(password), img]
        )
      .then(users => {
        console.log('users has been added', users)
        return users
      })
      .catch(error => error) 
    }
  }).catch(error => error)

const toVerifyAuth = (email, plainTextPassword) => {
console.log('2. we verify the email')
  return byEmail(email)
  .then( users => {
    console.log('4. we see if there is a user with the email', users.email)
   if (compareEncryption(plainTextPassword, users.password)) {
    console.log('5. we see if the password maches the users password if it does it returns', users)
      return users
    } 
  }).catch(error => error)
}
module.exports = {
  all,
  byID,
  toAdd,
  byEmail,
  toVerifyAuth
}