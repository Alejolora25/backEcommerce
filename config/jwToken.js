const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  return jwt.sign(
    { 
      id : user.id,
      id_role: user.id_role,
     },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return false
  }
}

module.exports = {tokenSign, verifyToken};