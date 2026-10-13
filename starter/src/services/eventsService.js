import { PrismaClient } from "@prisma/client";

// Verbinding met de database (één keer per bestand)
const prisma = new PrismaClient();

// Hulpfunctie: zet de categories om naar een lijstje met id's
const withCategoryIds = (event) => {
  const { categories, ...rest } = event;
  return { ...rest, categoryIds: categories.map((category) => category.id) };
};

// Alle events ophalen (eventueel gefilterd op title)
export const getEvents = async (title) => {
  const events = await prisma.event.findMany({
    where: { title: { contains: title } },
    include: { categories: true },
  });
  return events.map(withCategoryIds);
};

// Eén event ophalen op id
export const getEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { categories: true },
  });
  return event ? withCategoryIds(event) : null;
};

// Nieuwe event toevoegen
export const createEvent = async (newEvent) => {
  // categoryIds apart halen, de rest (title, createdBy, enz.) blijft in eventData
  const { categoryIds, ...eventData } = newEvent;

  const event = await prisma.event.create({
    data: {
      ...eventData,

      // Koppel de categories via hun id's (alleen als ze zijn meegestuurd)
      categories: categoryIds
        ? { connect: categoryIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { categories: true },
  });
  return withCategoryIds(event);
};

// Event wijzigen
export const updateEventById = async (id, updatedData) => {
  // Eerst checken of het event bestaat
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return null;
  }

  // categoryIds apart halen, de rest blijft in eventData
  const { categoryIds, ...eventData } = updatedData;

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: {
      ...eventData,
      // Vervang de categorieën door de nieuwe lijst (alleen als die is meegestuurd)
      categories: categoryIds
        ? { set: categoryIds.map((id) => ({ id })) }
        : undefined,
    },
    include: { categories: true },
  });
  return withCategoryIds(updatedEvent);
};

// Event verwijderen
export const deleteEventById = async (id) => {
  // Eerst checken of het event bestaat
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return null;
  }
  await prisma.event.delete({ where: { id } });
  return id;
};

/*
// OUDE CODE VÓÓR PRISMA
import fs from "fs";
import { v4 as uuid } from "uuid";

// Data inlezen vanuit JSON bestand
const eventsData = JSON.parse(fs.readFileSync("./src/data/events.json"));

//Alle events ophalen
export const getEvents = (title) => {
  if (title) {
    const filtered = eventsData.events.filter((event) =>
      event.title.toLowerCase().includes(title.toLowerCase()),
    );
    return filtered;
  }
  return eventsData.events;
};

// Eén event ophalen op id
export const getEventById = (id) => {
  return eventsData.events.find((event) => event.id === id);
};

// Nieuwe event toevoegen
export const createEvent = (newEvent) => {
  const event = {
    ...newEvent,
    id: uuid,
  };
  eventsData.events.push(event);
  return event;
};

// Event wijzigen
export const updateEventById = (id, updatedData) => {
  const event = eventsData.events.find((event) => event.id === id);

  if (!event) {
    return null;
  }
  Object.assign(event, updatedData);
  return event;
};

// Event verwijderen
export const deleteEventById = (id) => {
  const index = eventsData.events.findIndex((event) => event.id === id);
  if (index === -1) {
    return null;
  }
  eventsData.events.splice(index, 1);
  return id;
};
*/
