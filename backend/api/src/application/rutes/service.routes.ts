import { Router } from "express";

const router = Router();


router.get("/services", (_req, res) => {
  res.json({
    ok: true,
    message: "Services endpoint works 🚀"
  });
});

export default router;