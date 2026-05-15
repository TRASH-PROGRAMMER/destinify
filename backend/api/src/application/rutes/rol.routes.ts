import { Router } from "express";
import { RolController } from "../../infrastructure/controllers/Rol.controller";
import { PgRolRepository } from "../../infrastructure/repositories/PgRolRepository";
import { CreateRolUseCase } from "../../domain/use-case/CreateRolUseCase";
import { GetAllRolUseCase } from "../../domain/use-case/GetAllRolUseCase";



// creacion del router
const router = Router();
// instanciacion de las dependencias
const rolRepository = new PgRolRepository();
const createRolUseCase = new CreateRolUseCase(rolRepository);
const getAllRolUseCase = new GetAllRolUseCase(rolRepository);
const rolController = new RolController(createRolUseCase, getAllRolUseCase);
// definicion de las rutas
router.get("/all", rolController.getAll);
router.post("/", rolController.create);
// exportacion del router
export default router;
