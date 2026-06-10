"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// definicion del router
const router = (0, express_1.Router)();
// ruta para obtener todas las reservaciones
router.get("/reservations", (_req, res) => {
    res.json({
        ok: true,
        message: "Reservations endpoint works 🚀"
    });
});
exports.default = router;
