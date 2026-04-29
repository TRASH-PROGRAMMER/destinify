import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./application/rutes/user.routes";
import destinationRoutes from "./application/rutes/destination.routes";
import itineraryRoutes from "./application/rutes/itinerary.routes";
import serviceRoutes from "./application/rutes/service.routes";
import reservationRoutes from "./application/rutes/reservation.routes";
import iaRoutes from "./application/rutes/ia.routes";
import felbackRoutes from "./application/rutes/Feedback.routes";
// configuracion de variables de entorno
dotenv.config();
// configuracion del servidor
const app = express();
// configuracion de middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// configuracion de rutas
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/ia", iaRoutes);
app.use("/api/felback", felbackRoutes);
// salud del api
app.get("/api/health", (_req, res) => {
  res.json({
    status: "success",
    message: "Destinify API is running smoothly",
    timestamp: new Date().toISOString(),
  });
});
// exportacion del servidor
export default app;