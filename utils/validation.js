// utils/validation.js

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const validatePassword = (password) => {
  // Add your password validation logic here
  // For example, you can check for minimum length or specific character requirements
  return password.length >= 8;
};

// Export validation functions
module.exports = {
  validateEmail,
  validatePassword,
};
