"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// definicion del router
const router = (0, express_1.Router)();
// ruta para obtener todos los servicios
router.get("/services", (_req, res) => {
    res.json({
        ok: true,
        message: "Services endpoint works 🚀"
    });
});
exports.default = router;
