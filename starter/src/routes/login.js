import express from "express";
import jwt from "jsonwebtoken";
import { getUserByCredentials } from "../services/usersService.js";

const router = express.Router();

// Inloggen en een token teruggeven
router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByCredentials(username, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET_KEY);
      res.json({ message: "Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

/* 
// OUDE CODE VÓÓR PRISMA

// Inloggen en een token teruggeven
router.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = getUserByCredentials(username, password);
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
  } else {
    const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET_KEY);
    res.json({ message: "Successfully logged in!", token });
  }
});


export default router;
*/
