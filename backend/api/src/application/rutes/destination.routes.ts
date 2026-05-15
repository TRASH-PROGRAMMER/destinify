import { Router } from "express";
import { DestinationController } from "../../infrastructure/controllers/Destination.controller";
import { CreateDestinationUseCase } from "../../domain/use-case/CreateDestinationUseCase";
import {PgDestinationRepository} from "../../infrastructure/repositories/PgDestinationRepository";
import {GetAllDestinationUseCase} from "../../domain/use-case/GetAllDestinationUseCase";
// definicion del router
const router = Router();
const repo = new PgDestinationRepository();
const useCase = new CreateDestinationUseCase(repo);
const getAllUseCase = new GetAllDestinationUseCase(repo);
const controller = new DestinationController(useCase,getAllUseCase);

// ruta para obtener todos los destinos
router.get("/all", (req, res) => controller.getAll(req, res));
router.post("/", (req, res) => controller.create(req, res));

export default router;