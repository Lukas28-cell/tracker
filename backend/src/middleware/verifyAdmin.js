const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "defaultSecretKey";

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  const token = authHeader.split(" ")[1];
 
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("✅ Admin verified:", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Not an admin" });
    }
    req.admin = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};
