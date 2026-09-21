import fs from "fs";
import { v4 as uuid } from "uuid";

// Data inlezen uit het JSON bestand
const categoriesData = JSON.parse(
  fs.readFileSync("./src/data/categories.json"),
);

//Alle categories ophalen
export const getCategories = () => {
  return categoriesData.categories;
};

// Eén category ophalen op id
export const getCategoryById = (id) => {
  return categoriesData.categories.find((category) => category.id === id);
};

// Nieuwe category toevoegen
export const createCategory = (newCategory) => {
  const category = {
    ...newCategory,
    id: uuid(),
  };
  categoriesData.categories.push(category);
  return category;
};

// Category wijzigen
export const updateCategoryById = (id, updatedData) => {
  const category = categoriesData.categories.find(
    (category) => category.id === id,
  );

  if (!category) {
    return null;
  }
  Object.assign(category, updatedData);
  return category;
};

// Category verwijderen
export const deleteCategoryById = (id) => {
  const index = categoriesData.categories.findIndex(
    (category) => category.id === id,
  );
  if (index === -1) {
    return null;
  }
  categoriesData.categories.splice(index, 1);
  return id;
};
