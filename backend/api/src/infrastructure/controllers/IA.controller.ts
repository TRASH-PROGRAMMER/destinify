import { Request, Response } from "express";
import { GetRecommendationsUseCase } from "../../domain/use-case/GetRecommendationsUseCase";

export class IAController {
    constructor(private readonly getRecommendationsUseCase: GetRecommendationsUseCase) {}

    // Metodo para pedir recomendaciones a la IA
    getRecommendations = async (req: Request, res: Response) => {
        try {
            // Se asume que req.body contiene los datos del usuario/preferencias
            const recommendations = await this.getRecommendationsUseCase.execute(req.body);
            res.json(recommendations);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error connecting to AI" });
            }
        }
    }
}