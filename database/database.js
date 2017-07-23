const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DatabaseGenericFunctions {
  constructor(tableName, columnsForAdding) {
    this.table = tableName
    this.columns = columnsForAdding
  }

  gen_$Num() {
    let col = []
    for (let i = 1; i <= this.columns.length; i++) {
      col.push('$'+ i)
    }
    return col.join()
  } 

  addRow(values) {
    return db.any(`
      INSERT INTO 
        ${this.table} 
        (${this.columns}) 
      VALUES 
        (${this.gen_$Num()})
      RETURNING 
        *`, values
    )
  }
  
  deleteByColumn(column, value) {
    return db.any(`
      DELELTE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1
      RETURNING 
        *`, value
    )
  }

  getAllRows() {
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp`
    )
  }

 getRowsByColumn(column, value) { 
  return db.any(`
    SELECT 
      * 
    FROM 
      ${this.table} 
    WHERE 
      ${column} = $1
    ORDER BY 
      timestamp`, value
    )
  }

  getRowsBytwoColumns(col1, col2, values){
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${col1} = $1 
      AND 
        ${col2} = $2
      ORDER BY 
        timestamp`, values
    )
  } 

  getByLimit(limit){
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      LIMIT $1
      `, limit
    )
  }
}
