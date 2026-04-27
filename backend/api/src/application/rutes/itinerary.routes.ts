import { Router } from "express";

const router = Router();

router.get("/itineraries", (_req, res) => {
  res.json({
    ok: true,
    message: "Itineraries endpoint works 🚀"
  });
});

export default router;  