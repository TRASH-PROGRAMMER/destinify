import { Router } from "express";
import { FeedbackController } from "../../infrastructure/controllers/Feedback.controller";
import { CreateFeedbackUseCase } from "../../domain/use-case/CreateFeedbackUseCase";
import { pgFeedbackRepository } from "../../infrastructure/repositories/PgFeedbackRepository";
import { GetAllFeedbackUseCase } from "../../domain/use-case/GetAllFeedbackUseCase";
// definicion del router
const router = Router();
const repo = new pgFeedbackRepository();
const useCase = new CreateFeedbackUseCase(repo);
const getAllUseCase = new GetAllFeedbackUseCase(repo);
const controller = new FeedbackController(useCase,getAllUseCase);   
router.get("/all", controller.getAll);
// ruta para crear feedback
router.post("/", controller.create);

export default router;