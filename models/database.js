const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const queries = {}

quries.getAllFromTable = table => 
  db.any(`SELECT * FROM ${table}`)

quries.getRowsByID = (table, column, value) =>
  db.any(`SELECT * FROM ${table} WHERE ${column} = $1`, value)

queries.deleteByID = (table, column, value) => 
  db.none(`DELELTE FROM ${table} WHERE ${column} = $1`, value)

queries.getRowsWithTwoCondtions = (table, col1, col2, values) => 
  db.any(`SELECT * FROM ${table} WHERE ${col1} = $1 AND ${col2} = $2`, values)

queries.insertInto = (table, columns, values) =>
  db.none(`INSERT INTO ${table} ${columns} VALUES $1`, values)


// const addUser = function(name, email, password, image) {
//   return db.none(
//     `INSERT INTO 
//     users (name, email, password, image) 
//     VALUES
//     ($1, $2, $3, $4);`,
//      [name, email, password, image])
// } 

module.exports = queries
