import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./application/rutes/user.routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "success",
    message: "Destinify API is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

export default app;