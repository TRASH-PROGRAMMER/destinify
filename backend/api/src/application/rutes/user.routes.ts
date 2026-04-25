import { Router } from "express";
import { UserController } from "../../infrastructure/controllers/user.controller";
import { CreateUserUseCase } from "../../domain/use-case/CreateUserUseCase";
import { PgUserRepository } from "../../domain/interfaces/PgUserRepository";

const router = Router();

// 🔗 Inyección de dependencias
const repo = new PgUserRepository();
const useCase = new CreateUserUseCase(repo);
const controller = new UserController(useCase);

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "Users endpoint works 🚀"
  });
});

router.post("/", controller.create);

router.get("/all", async (_req, res) => {
  const users = await repo.findAll();
  res.json(users);
});



export default router;