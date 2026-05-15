import { Request, Response } from "express";
import { CreateFeedbackUseCase } from "../../domain/use-case/CreateFeedbackUseCase";
import { GetAllFeedbackUseCase } from "../../domain/use-case/GetAllFeedbackUseCase";
// Definicion de la clase controller
export class FeedbackController {
    constructor(private readonly createFeedback: CreateFeedbackUseCase,
      private readonly getAllUseCase: GetAllFeedbackUseCase
    ) {
  }
   
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
          console.log("ESTO ES LO QUE TRAE ",feedback);
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


