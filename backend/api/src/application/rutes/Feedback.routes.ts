import { Router } from "express";
import { FeedbackController } from "../../infrastructure/controllers/Feedback.controller";
import { CreateFeedbackUseCase } from "../../domain/use-case/CreateFeedbackUseCase";
import { pgFeedbackRepository } from "../../infrastructure/repositories/PgFeedbackRepository";
// definicion del router
const router = Router();
const repo = new pgFeedbackRepository();
const useCase = new CreateFeedbackUseCase(repo);
const controller = new FeedbackController(useCase);   
router.get("/", controller.getAll);
// ruta para crear feedback
router.post("/", controller.create);

export default router;