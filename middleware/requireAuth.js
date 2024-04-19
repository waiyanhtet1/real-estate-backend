const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ message: "Authorization token required" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) res.status(403).json({ message: "Token is not valid" });
    req.userId = payload.id;

    next();
  });
};

module.exports = requireAuth;
