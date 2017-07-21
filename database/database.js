const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class DBGenericFunction {
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

  add(values) {
    return db.none(`
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
    return db.none(`
      DELELTE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1
      RETURNING 
        *`, value
    )
  }

  all() {
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp`
    )
  }

 rowsByColumn(column, value) { 
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

  rowsBytwoColumns(col1, col2, values){
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

  limitQuery(limit){
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
