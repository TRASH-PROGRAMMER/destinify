import { Router } from "express";
import { IAController } from "../../infrastructure/controllers/IA.controller";
import { GetRecommendationsUseCase } from "../../domain/use-case/GetRecommendationsUseCase";
import IAService from "../../infrastructure/external-services/IAService"; 

const router = Router();

// 1. Instanciamos el Caso de Uso pasándole el servicio externo de IA
const getRecommendationsUseCase = new GetRecommendationsUseCase(IAService);

// 2. Instanciamos el controlador
const controller = new IAController(getRecommendationsUseCase);

// 3. Definimos la ruta para pedir recomendaciones a la IA (Flask)
router.post("/recommend", controller.getRecommendations);

export default router;