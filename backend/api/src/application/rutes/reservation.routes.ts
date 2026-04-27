import { Router } from "express";

const router = Router();

router.get("/reservations", (_req, res) => {
  res.json({
    ok: true,
    message: "Reservations endpoint works 🚀"
  });
});

export default router;