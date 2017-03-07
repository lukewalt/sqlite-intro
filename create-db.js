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


// Passing in IF NOT EXISTS after CREATE TABLE will check to make sure there are no tables named 'employees'
// If it does exist, this line will not run
myDB.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, dept TEXT)");

//definition : pulls list from json file
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
// populateEmployees()

//gets only a row
// myDB.get(`SELECT * FROM employees`, (err, row) => {
//   console.log(row);
// })


// db.all() first runs the query
// then calls a callback function which it passes all resulting rows
myDB.all("SELECT * FROM employees", (err, allRows) => {
  //WHERE salary > 5000
  // GROUP BY first

  //takes full db query and sorts all rows firstname
  const alpha = allRows.sort((a, b) => (a.first > b.first) ? 1 : -1)
    //filter creates a new array out of all rows sorted
    .filter(each => each.salary > 50000)
    //map runs a
    .map(each => `${each.first} ${each.last}s salary: ${each.salary}`)
  console.log(alpha);
  console.log("milliseconds :", new Date().getMilliseconds());

  // allRows is an array containing each row from the query
  // allRows.forEach(( { id, first, last, salary, dept } ) => {
    // console.log( `${id} : ${first} ${last}, ${salary}, ${dept}` )
  // });
});

/*

myDB.each(`SELECT * FROM employees`, (err, { id, first, last, salary, dept }) => {
  console.log(`${id} : ${first} ${last}, ${salary}, ${dept}`);
  console.log(new Date().getMilliseconds());

})

myDB.close(err => {
  errorHandler(err); // Use custom error handling function
  process.stdout.write('Database closed'); // Will only log on successful close
})

*/
