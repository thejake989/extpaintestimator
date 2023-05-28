const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jake0609!",
  database: "users",
});

// Connect to MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL server");
  }
});

// Handle signup form submission
app.post("/signup", (req, res) => {
  // Extract user data from the request body
  const { name, email, password } = req.body;

  // Perform signup validation and redirection
  if (name && email && password) {
    // Create a new user object with the extracted data
    const user = {
      username: name,
      email,
      password,
    };

    // Insert the user into the 'users' table
    connection.query("INSERT INTO users SET ?", user, (error, results) => {
      if (error) {
        console.error("Error during signup:", error);
        res.sendStatus(500); // Send a server error response
      } else {
        console.log("User signed up:", user);
        res.sendStatus(200); // Send a success response
      }
    });
  } else {
    res.status(400).send("Invalid signup data"); // Send an error response
  }
});

// Handle login form submission
app.post("/login", (req, res) => {
  // Extract user credentials from the request body
  const { email, password } = req.body;

  console.log("Received login request:", email, password); // Debug statement

  // Perform login validation using MySQL
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      console.error("Error during login:", error);
      res.sendStatus(500); // Send a server error response
    } else {
      console.log("Login results:", results); // Debug statement

      if (results.length > 0) {
        res.sendStatus(200); // Send a success response
      } else {
        res.sendStatus(401); // Send an unauthorized response
      }
    }
  });
});

// Handle logout request
app.post("/logout", (req, res) => {
  // Perform logout logic here, such as clearing the session or removing authentication tokens

  // Send a success response
  res.sendStatus(200);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Gracefully terminate MySQL connection when the server is shut down
process.on("SIGINT", () => {
  connection.end();
  process.exit();
});
