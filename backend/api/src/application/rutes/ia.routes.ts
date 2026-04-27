import { Router } from "express";

const router = Router();

router.get("/ia", (_req, res) => {
  res.json({
    ok: true,
    message: "IA endpoint works 🚀"
  });
});

export default router;