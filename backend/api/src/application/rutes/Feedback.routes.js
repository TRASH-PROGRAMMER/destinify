"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Feedback_controller_1 = require("../../infrastructure/controllers/Feedback.controller");
const CreateFeedbackUseCase_1 = require("../../domain/use-case/CreateFeedbackUseCase");
const PgFeedbackRepository_1 = require("../../infrastructure/repositories/PgFeedbackRepository");
const GetAllFeedbackUseCase_1 = require("../../domain/use-case/GetAllFeedbackUseCase");
// definicion del router
const router = (0, express_1.Router)();
const repo = new PgFeedbackRepository_1.pgFeedbackRepository();
const useCase = new CreateFeedbackUseCase_1.CreateFeedbackUseCase(repo);
const getAllUseCase = new GetAllFeedbackUseCase_1.GetAllFeedbackUseCase(repo);
const controller = new Feedback_controller_1.FeedbackController(useCase, getAllUseCase);
router.get("/all", controller.getAll);
// ruta para crear feedback
router.post("/", controller.create);
exports.default = router;
