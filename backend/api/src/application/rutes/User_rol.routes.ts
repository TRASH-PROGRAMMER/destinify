import { Router } from "express";
import { UserRolController } from "../../infrastructure/controllers/User_rol.controller";
import { CreateUserRolUseCase } from "../../domain/use-case/CreateUserRolUseCase";
import { GetAllUserRolUseCase } from "../../domain/use-case/GetAllUserRolUseCase";
import { PgUserRolRepository } from "../../infrastructure/repositories/PgUserRolRepository";

const router = Router();
const repo = new PgUserRolRepository();
const useCase = new CreateUserRolUseCase(repo);
const getAllUseCase = new GetAllUserRolUseCase(repo);
const controller = new UserRolController(useCase,getAllUseCase);

// ruta para obtener todos los roles de usuario
router.get("/all", (req, res) => controller.getAll(req, res));
// ruta para crear rol de usuario
router.post("/", (req, res) => controller.create(req, res));

export default router;
