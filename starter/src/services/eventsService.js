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
