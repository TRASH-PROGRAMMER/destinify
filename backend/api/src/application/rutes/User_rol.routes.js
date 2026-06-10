"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_rol_controller_1 = require("../../infrastructure/controllers/User_rol.controller");
const CreateUserRolUseCase_1 = require("../../domain/use-case/CreateUserRolUseCase");
const GetAllUserRolUseCase_1 = require("../../domain/use-case/GetAllUserRolUseCase");
const PgUserRolRepository_1 = require("../../infrastructure/repositories/PgUserRolRepository");
// definicion del router
const router = (0, express_1.Router)();
const repo = new PgUserRolRepository_1.pgUserRolRepository();
const useCase = new CreateUserRolUseCase_1.CreateUserRolUseCase(repo);
const getAllUseCase = new GetAllUserRolUseCase_1.GetAllUserRolUseCase(repo);
const controller = new User_rol_controller_1.UserRolController(useCase, getAllUseCase);
// ruta para obtener todos los roles de usuario
router.get("/all", (req, res) => controller.getAll(req, res));
// ruta para crear rol de usuario
router.post("/", (req, res) => controller.create(req, res));
exports.default = router;
