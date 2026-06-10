"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./application/rutes/user.routes"));
const destination_routes_1 = __importDefault(require("./application/rutes/destination.routes"));
const itinerary_routes_1 = __importDefault(require("./application/rutes/itinerary.routes"));
const service_routes_1 = __importDefault(require("./application/rutes/service.routes"));
const reservation_routes_1 = __importDefault(require("./application/rutes/reservation.routes"));
const ia_routes_1 = __importDefault(require("./application/rutes/ia.routes"));
const Feedback_routes_1 = __importDefault(require("./application/rutes/Feedback.routes"));
const rol_routes_1 = __importDefault(require("./application/rutes/rol.routes"));
const User_rol_routes_1 = __importDefault(require("./application/rutes/User_rol.routes"));
// configuracion de variables de entorno
dotenv_1.default.config();
// configuracion del servidor
const app = (0, express_1.default)();
// configuracion de middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// configuracion de rutas
app.use("/api/users", user_routes_1.default);
app.use("/api/destinations", destination_routes_1.default);
app.use("/api/itineraries", itinerary_routes_1.default);
app.use("/api/services", service_routes_1.default);
app.use("/api/reservations", reservation_routes_1.default);
app.use("/api/ia", ia_routes_1.default);
app.use("/api/felback", Feedback_routes_1.default);
app.use("/api/rol", rol_routes_1.default);
app.use("/api/user_rol", User_rol_routes_1.default);
// salud del api
app.get("/api/health", (_req, res) => {
    res.json({
        status: "success",
        message: "Destinify API is running smoothly",
        timestamp: new Date().toISOString(),
    });
});
// exportacion del servidor
exports.default = app;
