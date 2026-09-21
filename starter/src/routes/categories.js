import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../services/categoriesService.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Alle categories ophalen
router.get("/", (req, res) => {
  const categories = getCategories();
  res.json(categories);
});

// Eén category ophalen
router.get("/:id", (req, res) => {
  const category = getCategoryById(req.params.id);
  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });
  } else {
    res.json(category);
  }
});

// Nieuwe category toevoegen
router.post("/", authMiddleware, (req, res) => {
  const newCategory = createCategory(req.body);
  res.status(201).json(newCategory);
});

// Category wijzigen
router.put("/:id", authMiddleware, (req, res) => {
  const category = updateCategoryById(req.params.id, req.body);
  if (!category) {
    res.status(404).json({
      message: "Category not found",
    });
  } else {
    res.json({ message: "Category updated", ...category });
  }
});

// Category verwijderen
router.delete("/:id", authMiddleware, (req, res) => {
  const id = deleteCategoryById(req.params.id);
  if (!id) {
    res.status(404).json({
      message: "Category not found",
    });
  } else {
    res.json({ message: "Category deleted" });
  }
});

export default router;
