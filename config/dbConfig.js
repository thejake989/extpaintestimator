const mysql = require("mysql");

// MySQL connection setup
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Jake0609!",
  database: "users",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Connected to the database.");
});

module.exports = connection;
