`use strict`;

const { Database } = require('sqlite3').verbose();
const emplDB = new Database('exercise13.sqlite', () => console.log("Drop Table"))

//deletes table
const dropEmployees = () => {
  emplDB.run(`DROP TABLE more_employees`)
}
dropEmployees()
