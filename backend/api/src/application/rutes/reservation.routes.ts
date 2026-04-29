import { Router } from "express";
// definicion del router
const router = Router();
// ruta para obtener todas las reservaciones
router.get("/reservations", (_req, res) => {
  res.json({
    ok: true,
    message: "Reservations endpoint works 🚀"
  });
});

export default router;