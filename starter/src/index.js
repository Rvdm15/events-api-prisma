import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categories.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import eventsRouter from "./routes/events.js";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const app = express();
app.use(cors());
app.use(express.json());

const logMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`,
    );
  });
  next();
};
app.use(logMiddleware);

// TOKEN CONTROLE VERWIJDERD ===========================================

// ENDPOINTS EVENTS VERWIJDERD EN VERVANGEN DOOR ========================

app.use("/events", eventsRouter);

// ENDPOINTS USERS VERWIJDERD EN VERVANGEN DOOR ===========================

app.use("/users", usersRouter);

// ENDPOINTS CATEGORIES VERWIJDERD EN VERVANGEN DOOR ========================

app.use("/categories", categoriesRouter);

// ENDPOINT LOGIN VERWIJDERD  EN VERVANGEN DOOR ==============================

app.use("/login", loginRouter);

// ========================================================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  Sentry.captureException(err);
  res.status(500).json({ message: "An error occured on the server!" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
