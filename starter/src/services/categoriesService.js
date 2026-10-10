/*
// OUDE CODE VÓÓR PRISMA 
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
*/

import { PrismaClient } from "@prisma/client";

// Verbinding met de database (één keer per bestand)
const prisma = new PrismaClient();

// Alle categories ophalen
export const getCategories = async () => {
  return await prisma.category.findMany();
};

// Eén category ophalen op id
export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({ where: { id } });
};

// Nieuwe category toevoegen
export const createCategory = async (newCategory) => {
  return await prisma.category.create({ data: newCategory });
};

// Category wijzigen
export const updateCategoryById = async (id, updatedData) => {
  // Eerst checken of de category bestaat
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return null;
  }
  return await prisma.category.update({ where: { id }, data: updatedData });
};

// Category verwijderen
export const deleteCategoryById = async (id) => {
  // Eerst checken of de category bestaat
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return null;
  }
  await prisma.category.delete({ where: { id } });
  return id;
};
