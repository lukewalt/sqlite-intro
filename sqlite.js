'use strict';

const { Database } = require('sqlite3').verbose();

const emplDB = new Database('exercise13.sqlite', () => console.log("Employee DB"))

const errorHandle = (err) => {
  if (err) {
    console.log(`Msg: ${err}`)
  }
};

// creates/names table {"employees-two"} as long as one with the same name doesnt already exist
emplDB.run("CREATE TABLE IF NOT EXISTS more_employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)");
