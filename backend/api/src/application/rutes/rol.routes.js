"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rol_controller_1 = require("../../infrastructure/controllers/Rol.controller");
const PgRolRepository_1 = require("../../infrastructure/repositories/PgRolRepository");
const CreateRolUseCase_1 = require("../../domain/use-case/CreateRolUseCase");
const GetAllRolUseCase_1 = require("../../domain/use-case/GetAllRolUseCase");
// creacion del router
const router = (0, express_1.Router)();
// instanciacion de las dependencias
const rolRepository = new PgRolRepository_1.PgRolRepository();
const createRolUseCase = new CreateRolUseCase_1.CreateRolUseCase(rolRepository);
const getAllRolUseCase = new GetAllRolUseCase_1.GetAllRolUseCase(rolRepository);
const rolController = new Rol_controller_1.RolController(createRolUseCase, getAllRolUseCase);
// definicion de las rutas
router.get("/all", rolController.getAll);
router.post("/", rolController.create);
// exportacion del router
exports.default = router;
