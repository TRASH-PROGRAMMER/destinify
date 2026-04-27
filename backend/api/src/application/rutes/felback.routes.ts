import { Router } from "express";

const router = Router();

router.get("/felback", (_req, res) => {
  res.json({
    ok: true,
    message: "Felback endpoint works 🚀"
  });
});

export default router;