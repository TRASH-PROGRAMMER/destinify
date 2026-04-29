import { Router } from "express";
// definicion del router
const router = Router();
// ruta para obtener todos los servicios
router.get("/services", (_req, res) => {
  res.json({
    ok: true,
    message: "Services endpoint works 🚀"
  });
});

export default router;