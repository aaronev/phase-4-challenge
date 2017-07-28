const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DatabaseGenericTableFunctions {
  constructor(tableName, columnsForAdding) {
    this.table = tableName
    this.columns = columnsForAdding
  }

  generate_$Nums() {
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
        (${this.generate_$Nums()})
      RETURNING 
        *`, values
    )
  }
  
  deleteByColumn(column, value) {
    return db.any(`
      DELETE FROM 
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
        timestamp
      DESC`
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
      timestamp
    DESC`, value
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
        timestamp
      DESC`, values
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
      DESC
      LIMIT $1
      `, limit
    )
  }
}
