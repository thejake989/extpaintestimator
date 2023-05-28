const db = require("../dbConfig");

class User {
  static login(email, password, callback) {
    // Perform login validation and redirection
    if (email === "example@example.com" && password === "password") {
      callback(null, "/index.html");
    } else {
      callback("Invalid credentials. Please try again.", null);
    }
  }

  static signup(name, email, password, confirmPassword, callback) {
    // Perform signup validation and redirection
    if (password === confirmPassword) {
      // Save the user to the database
      const user = {
        name,
        email,
        password,
      };

      db.query("INSERT INTO users SET ?", user, (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          callback("An error occurred while signing up.", null);
          return;
        }

        console.log("User inserted successfully:", result);
        callback(null, "/success.html");
      });
    } else {
      callback("Passwords do not match. Please try again.", null);
    }
  }
}

module.exports = User;
