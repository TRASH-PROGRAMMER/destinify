import { Request, Response } from "express";
import { CreateDestinationUseCase } from "../../domain/use-case/CreateDestinationUseCase";
import { Destination } from "../../domain/entities/Destination";
import { GetAllDestinationUseCase } from "../../domain/use-case/GetAllDestinationUseCase";
// Definicion de la clase controller
export class DestinationController {
    constructor(
        private readonly createDestination: CreateDestinationUseCase,
        private readonly getAllUseCase: GetAllDestinationUseCase
    ) {}
    // metodo para crear destino
    async create(req: Request, res: Response) {
        try {
            const destination = await this.createDestination.execute(req.body);
            res.json(destination);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    // metodo para obtener todos los destinos
    async getAll(_req: Request, res: Response) {
        try {
            const destination = await this.getAllUseCase.execute();
            res.json(destination);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}