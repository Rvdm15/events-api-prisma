/* import fs from "fs";
 import { v4 as uuid } from "uuid";

Data inlezen uit JSON bestand
const usersData = JSON.parse(fs.readFileSync("./src/data/users.json"));


Alle users ophalen
export const getUsers = () => {
return usersData.users;
};

Eén user ophalen op id
export const getUserById = (id) => {
return usersData.users.find((user) => user.id === id);
};

/* Nieuwe user toevoegen
export const createUser = (newUser) => {
  const user = {
    ...newUser,
    id: uuid(),
  };
  usersData.users.push(newUser);
  return user;
};

// ** User wijzigen
export const updateUserById = (id, updatedData) => {
  const user = usersData.users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  Object.assign(user, updatedData);
  return user;
};

// ** User verwijderen
export const deleteUserById = (id) => {
  const index = usersData.users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  usersData.users.splice(index, 1);
  return id;
};

// ** User zoeken op gebruikersnaam en wachtwoord (voor het inloggen)
export const getUserByCredentials = (username, password) => {
  return usersData.users.find(
    (user) => user.username === username && user.password === password,
  );
};



*/

import { PrismaClient } from "@prisma/client";

// Verbinding met de database (één keer per bestand)
const prisma = new PrismaClient();

// Alle users ophalen
export const getUsers = async () => {
  return await prisma.user.findMany();
};

// Eén user ophalen op id
export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

// Nieuwe user toevoegen
export const createUser = async (newUser) => {
  return await prisma.user.create({ data: newUser });
};

// User wijzigen
export const updateUserById = async (id, updatedData) => {
  // Eerst checken of de user bestaat
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return null;
  }
  return await prisma.user.update({ where: { id }, data: updatedData });
};

// User verwijderen
export const deleteUserById = async (id) => {
  // Eerst checken of de user bestaat
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return null;
  }
  await prisma.user.delete({ where: { id } });
  return id;
};

// User zoeken op gebruikersnaam en wachtwoord (voor het inloggen)
export const getUserByCredentials = async (username, password) => {
  return await prisma.user.findFirst({ where: { username, password } });
};
