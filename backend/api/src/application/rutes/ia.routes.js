"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IA_controller_1 = require("../../infrastructure/controllers/IA.controller");
const GetRecommendationsUseCase_1 = require("../../domain/use-case/GetRecommendationsUseCase");
const IAService_1 = __importDefault(require("../../infrastructure/external-services/IAService"));
const router = (0, express_1.Router)();
// 1. Instanciamos el Caso de Uso pasándole el servicio externo de IA
const getRecommendationsUseCase = new GetRecommendationsUseCase_1.GetRecommendationsUseCase(IAService_1.default);
// 2. Instanciamos el controlador
const controller = new IA_controller_1.IAController(getRecommendationsUseCase);
// 3. Definimos la ruta para pedir recomendaciones a la IA (Flask)
router.post("/recommend", controller.getRecommendations);
exports.default = router;
