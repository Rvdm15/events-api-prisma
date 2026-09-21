import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
} from "../services/eventsService.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Alle events ophalen, evt met zoekterm
router.get("/", (req, res) => {
  const { title } = req.query;
  const events = getEvents(title);
  res.json(events);
});

// Eén Event ophalen
router.get("/:id", (req, res) => {
  const event = getEventById(req.params.id);
  if (!event) {
    res.status(404).json({
      message: "Event not found",
    });
  } else {
    res.json(event);
  }
});

// Nieuwe Event toevoegen
router.post("/", authMiddleware, (req, res) => {
  const newEvent = createEvent(req.body);
  res.status(201).json(newEvent);
});

// Event wijzigen
router.put("/:id", authMiddleware, (req, res) => {
  const event = updateEventById(req.params.id, req.body);
  if (!event) {
    res.status(404).json({
      message: "Event not found",
    });
  } else {
    res.json({ message: "Event updated", ...event });
  }
});

// Event verwijderen
router.delete("/:id", authMiddleware, (req, res) => {
  const id = deleteEventById(req.params.id);
  if (!id) {
    res.status(404).json({
      message: "Event not found",
    });
  } else {
    res.json({ message: "Event deleted" });
  }
});

export default router;
