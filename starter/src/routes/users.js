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
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Eén user ophalen
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

// Nieuwe user toevoegen
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// User wijzigen
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json({ message: "User updated", ...user });
    }
  } catch (error) {
    next(error);
  }
});

// User verwijderen
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = await deleteUserById(req.params.id);
    if (!id) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json({ message: "User deleted" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

// OUDE CODE VÓÓR PRISMA

/*
// Alle users ophalen
router.get("/", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Eén user ophalen
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

// User wijzigen
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

// User verwijderen
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
*/
