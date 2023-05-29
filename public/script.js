//LOGIN FUNCTION

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

// SIGN UP FUNCTION
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

//LOGOUT BUTTON FUNCTION
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

//PAINT ESTIMATING FUNCTION
function calculatePaintEstimate() {
  // Estimation Constants
  const coverageRate = 350; // Typical paint coverage in sq ft per gallon.

  // DOM Elements
  const sqftEl = document.getElementById("sqft");
  const coatsEl = document.getElementById("coats");
  const ppgEl = document.getElementById("ppg");
  const laborEl = document.getElementById("labor");
  const outputEl = document.getElementById("output");

  const sqft = parseInt(sqftEl.value);
  const coats = parseInt(coatsEl.value);
  const ppg = parseFloat(ppgEl.value);
  const labor = parseFloat(laborEl.value);

  // Calculate paint needed (gallons)
  const paintNeeded = (sqft / coverageRate) * coats;

  // Calculate costs
  const costOfPaint = paintNeeded * ppg;
  const laborCost = sqft * labor;
  const totalCost = costOfPaint + laborCost;

  // Display output
  outputEl.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-900">Estimation:</h3>
      <p>Paint needed: ${paintNeeded.toFixed(2)} gallons</p>
      <p>Cost of paint: $${costOfPaint.toFixed(2)}</p>
      <p>Labor cost: $${laborCost.toFixed(2)}</p>
      <p>Total cost: $${totalCost.toFixed(2)}</p>
  `;
}

// Add event listener to the Calculate button
document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  if (calculateButton) {
    calculateButton.addEventListener("click", calculatePaintEstimate);
  }
});

// Clear form function
function clearForm() {
  // DOM Elements
  const sqftEl = document.getElementById("sqft");
  const coatsEl = document.getElementById("coats");
  const ppgEl = document.getElementById("ppg");
  const laborEl = document.getElementById("labor");
  const outputEl = document.getElementById("output");

  // Clearing the values
  sqftEl.value = "";
  coatsEl.value = "";
  ppgEl.value = "";
  laborEl.value = "";
  outputEl.innerHTML = "";
}

// Add event listener to the Clear button
document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.getElementById("clear");
  if (clearButton) {
    clearButton.addEventListener("click", clearForm);
  }
});
