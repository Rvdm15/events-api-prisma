import jwt from "jsonwebtoken";

// Controleert of er een geldige token is meegestuurd
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }
  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token provided!" });
    }
    next();
  });
};

export default authMiddleware;
