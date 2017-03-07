// Require in the Database method from the sqlite3 module
// verbose execution mode helps with debugging errors.
const { Database } = require('sqlite3').verbose();

// Returns a new database object and automatically opens the database
// Database method accepts a callback function for successful connection
const myDB = new Database('example.sqlite', () => console.log('Connected!'));

// errorHandler is a function which accepts an error object
const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};

//deletes table
const dropEmployees = () => {
  myDB.run(`DROP TABLE employees`)
}
// dropEmployees()

// Passing in IF NOT EXISTS after CREATE TABLE will check to make sure there are no tables named 'employees'
// If it does exist, this line will not run
myDB.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, dept TEXT)");


const populateEmployees = () => {
  const { list } = require('./employees.json');
  list.forEach((each) => {
    myDB.run(`INSERT INTO employees VALUES (
      ${each.id},
      '${each.firstName}',
      '${each.lastName}',
      ${each.salary},
      '${each.dept}'
      )`)
  })
}
populateEmployees()
/*


myDB.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')", errorHandler);
// employees TABLE
// id |  first    |   last
//  1 | 'Michael' | 'Scott'
//  2 | 'Jim'     | 'Halpert'


// const employeeArray = [
//   { id: 3, firstName: 'Dwight', lastName: 'Schrute' },
//   { id: 4, firstName: 'Andy', lastName: 'Bernard' },
//   { id: 5, firstName: 'Pam', lastName: 'Beesly' }
// ];


// db.all() first runs the query
// then calls a callback function which it passes all resulting rows
myDB.all("SELECT * FROM employees", (err, allRows) => {
  // allRows is an array containing each row from the query
  allRows.forEach(each => {
    console.log(each.id, each.first + ' ' + each.last);
  });
});
// OUTPUT =>
// 1, 'Michael Scott'
// 2, 'Jim Halpert'
// 3, 'Dwight Schrute'
// 4, 'Andy Bernard'
// 5, 'Pam Beesly'

myDB.close(err => {
  errorHandler(err); // Use custom error handling function
  process.stdout.write('Database closed'); // Will only log on successful close
})

*/
