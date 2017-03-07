`use strict`;

const { Database } = require('sqlite3').verbose();
const emplDB = new Database('employees.sqlite', () => console.log("Drop Table");)

//deletes table
const dropEmployees = () => {
  myDB.run(`DROP TABLE employees`)
}
dropEmployees()
