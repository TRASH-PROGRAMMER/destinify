import { Router } from "express";

const router = Router();

router.get("/destinations", (_req, res) => {
  res.json({
    ok: true,
    message: "Destinations endpoint works 🚀"
  });
});

export default router;