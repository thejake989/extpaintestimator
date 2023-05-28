document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to the login and signup forms
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  // Add event listener to the logout button
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  // Add event listener to the login button in success.html
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", goToLogin);
  }
});

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Create an object with the user's credentials
  const credentials = {
    email,
    password,
  };

  // Make a POST request to the /login endpoint
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to the index.html page upon successful login
        window.location.href = "/index.html";
      } else {
        // Display an error message if login is unsuccessful
        displayMessage("Invalid credentials. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayMessage("An error occurred while logging in.");
    });
}

// Handle signup form submission
function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Perform signup validation and redirection
  if (password === confirmPassword) {
    // Save the user to the database
    const user = {
      name,
      email,
      password,
    };

    // Make a POST request to the /signup route
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/success.html";
        } else {
          displayMessage("An error occurred while signing up.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        displayMessage("An error occurred while signing up.");
      });
  } else {
    displayMessage("Passwords do not match. Please try again.");
  }
}

// Handle logout button click
function handleLogout() {
  // Make a POST request to the logout endpoint
  fetch("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to the login.html page upon successful logout
        window.location.href = "/login.html";
      } else {
        // Display an error message if logout is unsuccessful
        displayMessage("An error occurred while logging out.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayMessage("An error occurred while logging out.");
    });
}

// Go to the login.html page
function goToLogin() {
  window.location.href = "/login.html";
}

// Display a message on the page
function displayMessage(message) {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = message;
  }
}
