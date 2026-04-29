import { Router } from "express";
import { UserController } from "../../infrastructure/controllers/user.controller";
import { CreateUserUseCase } from "../../domain/use-case/CreateUserUseCase";
import { PgUserRepository } from "../../domain/interfaces/PgUserRepository";
import { GetAllUsersUseCase } from "../../domain/use-case/GetAllUsersUseCase";

const router = Router();

// 🔗 Inyección de dependencias
const repo = new PgUserRepository();
const useCase = new CreateUserUseCase(repo);
const getAllUsersUseCase = new GetAllUsersUseCase(repo);
const controller = new UserController(useCase,getAllUsersUseCase);
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


export default router;