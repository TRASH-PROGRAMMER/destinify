import { Router } from "express";
// definicion del router
const router = Router();
// ruta para obtener todos los felbacks
router.get("/felback", (_req, res) => {
  res.json({
    ok: true,
    message: "Felback endpoint works 🚀"
  });
});

export default router;