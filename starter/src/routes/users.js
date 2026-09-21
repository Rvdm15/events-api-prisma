import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "../services/usersService.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Alle users ophalen
router.get("/", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Eén category ophalen
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.json(user);
  }
});

// Nieuwe user toevoegen
router.post("/", authMiddleware, (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json(newUser);
});

// Category wijzigen
router.put("/:id", authMiddleware, (req, res) => {
  const user = updateUserById(req.params.id, req.body);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.json({ message: "User updated", ...user });
  }
});

// Category verwijderen
router.delete("/:id", authMiddleware, (req, res) => {
  const id = deleteUserById(req.params.id);
  if (!id) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.json({ message: "User deleted" });
  }
});

export default router;
