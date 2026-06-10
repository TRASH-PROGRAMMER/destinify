"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../infrastructure/controllers/user.controller");
const CreateUserUseCase_1 = require("../../domain/use-case/CreateUserUseCase");
const PgUserRepository_1 = require("../../infrastructure/repositories/PgUserRepository");
const GetAllUsersUseCase_1 = require("../../domain/use-case/GetAllUsersUseCase");
const router = (0, express_1.Router)();
// 🔗 Inyección de dependencias
const repo = new PgUserRepository_1.PgUserRepository();
const useCase = new CreateUserUseCase_1.CreateUserUseCase(repo);
const getAllUsersUseCase = new GetAllUsersUseCase_1.GetAllUsersUseCase(repo);
const controller = new user_controller_1.UserController(useCase, getAllUsersUseCase);
// rutas para el usuario
router.get("/", (_req, res) => {
    res.json({
        ok: true,
        message: "Users endpoint works 🚀"
    });
});
// ruta para crear usuario
router.post("/", controller.create);
// ruta para obtener todos los usuarios
router.get("/all", controller.getAll);
exports.default = router;
