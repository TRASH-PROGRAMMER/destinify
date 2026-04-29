import { Router } from "express";
// definicion del router
const router = Router();
// ruta para obtener todas las ia
router.get("/ia", (_req, res) => {
  res.json({
    ok: true,
    message: "IA endpoint works 🚀"
  });
});

export default router;