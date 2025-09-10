import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    // console.log(user)
    req.user = user; // { id, role }
    next();
  });
};

export const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient role." });
      }
      next();
    };
  };
  