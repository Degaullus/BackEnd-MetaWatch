const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  // Fixed function declaration
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You are not authorized. Shoo!" }); // Corrected syntax error in the string
  }

  // Auth in headers is structured like so: 'Bearer <token>'
  const token = authorization.split(" ")[1];
  // This is to take the token out of the header

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized. Go away" });
  }
};

module.exports = requireAuth;
