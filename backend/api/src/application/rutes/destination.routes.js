"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Destination_controller_1 = require("../../infrastructure/controllers/Destination.controller");
const CreateDestinationUseCase_1 = require("../../domain/use-case/CreateDestinationUseCase");
const PgDestinationRepository_1 = require("../../infrastructure/repositories/PgDestinationRepository");
const GetAllDestinationUseCase_1 = require("../../domain/use-case/GetAllDestinationUseCase");
// definicion del router
const router = (0, express_1.Router)();
const repo = new PgDestinationRepository_1.PgDestinationRepository();
const useCase = new CreateDestinationUseCase_1.CreateDestinationUseCase(repo);
const getAllUseCase = new GetAllDestinationUseCase_1.GetAllDestinationUseCase(repo);
const controller = new Destination_controller_1.DestinationController(useCase, getAllUseCase);
// ruta para obtener todos los destinos
router.get("/all", (req, res) => controller.getAll(req, res));
router.post("/", (req, res) => controller.create(req, res));
exports.default = router;
