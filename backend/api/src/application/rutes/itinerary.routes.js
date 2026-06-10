"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/itineraries", (_req, res) => {
    res.json({
        ok: true,
        message: "Itineraries endpoint works 🚀"
    });
});
exports.default = router;
