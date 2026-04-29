import { Router } from "express";
// definicion del router
const router = Router();
// ruta para obtener todos los destinos
router.get("/destinations", (_req, res) => {
  res.json({
    ok: true,
    message: "Destinations endpoint works 🚀"
  });
});

export default router;