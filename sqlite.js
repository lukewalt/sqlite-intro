'use strict';

const { Database } = require('sqlite3').verbose();

// definition : logs errors to console if err = true
const errorHandle = (err) => {
  if (err) {
    console.log(`Msg: ${err}`)
  }
};

// 1.) Create a database that is saved on disk.
const emplDB = new Database('exercise13.sqlite', () => console.log("Employee DB"))


// 2.) Create a table titled employees with the following columns: id, firstName, lastName, jobTitle, address

// creates/names table {"employees-two"} as long as one with the same name doesnt already exist
emplDB.run("CREATE TABLE IF NOT EXISTS more_employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)");


// 3.) Create an array of at least 6 objects. Each object should have a key value pair matching each column name in the employees table.
// <----------- stored in local JSON ---------------|


// 4.) Insert each of the employee objects into the database.

// definition : requests data from local json file and assigns values of obj to values in new rows of db
const populateNewDB = () => {
  // ES6 deconstr : calls employees obj from json file
  const { employees } = require('./employees.json')
  // assigns each value from each obj to a db value
  employees.forEach((each) => {
    emplDB.run(`INSERT INTO more_employees VALUES (
      ${each.id},
      '${each.firstName}',
      '${each.lastName}',
      '${each.jobTitle}',
      '${each.address}'
    )`)
  })
}
// calls function to populate the new database
// populateNewDB();


// 5.) Write a statement to query the database and console.log() all employee records.

// querys the entire database with a callback function that returns error first then the data
emplDB.all("SELECT * FROM more_employees", (err, allData) => {
  //call the error handling function defined above
  errorHandle(err)
  //logs all data to console
  console.log(allData);
})

// 6.) Write a statement to query the database and console.log() each employees jobTitle.

emplDB.each("SELECT * FROM more_employees", (err, { jobTitle }) => {
  //call the error handling function defined above
  errorHandle(err)
  //logs only jobTitle to console
  console.log("Job Title :", jobTitle);
})

// 7.) Write a statement to query the database and console.log() each employees firstName, lastName and address only.

emplDB.each("SELECT * FROM more_employees", (err, { firstName, lastName, address }) => {
  //call the error handling function defined above
  errorHandle(err)
  // logs only firstName, lastName and address
  console.log("First Name:", firstName, "Last Name:", lastName, "Address: ", address );

})


//BONUS
// 1.) Update the employees table so that is has a salary column
// Then update each employee record with a value for salary.
