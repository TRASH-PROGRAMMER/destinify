import { Request, Response } from "express";
import { CreateFeedbackUseCase } from "../../domain/use-case/CreateFeedbackUseCase";
// Definicion de la clase controller
export class FeedbackController {
    constructor(private readonly createFeedback: CreateFeedbackUseCase) {}
    private readonly getAllUseCase: CreateFeedbackUseCase;
      // metodo para crear feedback
      async create(req: Request, res: Response) {
        try {
          const feedback = await this.createFeedback.execute(req.body);
          res.json(feedback);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }else{
                res.status(500).json({ error: "Internal server error" });
            }
        }
      }
      // metodo para obtener todos los felbacks
      async getAll(_req: Request, res: Response) {
        try {
          const feedback = await this.getAllUseCase.execute();
          res.json(feedback);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }else{
                res.status(500).json({ error: "Internal server error" });
            }
        }
      }
}


