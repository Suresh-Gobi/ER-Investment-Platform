const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  // Generate a JWT token with the user ID as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h' // Token expires in 1 hour
  });

  return token;
};

module.exports = generateToken;
