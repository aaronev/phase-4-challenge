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

const byEmail = value => {
console.log('3. it verifies the email first')
 return DBUsers.rowsByColumn('email', value)
  .then(users => users[0] )
  .catch(error => error)
}
const add = values =>
  byEmail(values[1])
  .then(users => {
       return DBUsers.add([
        values[0], 
        values[1], 
        encrypt(values[2]), 
        values[3]
      ])
      .then(users => users)
      .catch(error => error) 
  }).catch(error => error)

const verifyAuth = (email, plainTextPassword) => {
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
  add,
  byEmail,
  verifyAuth
}