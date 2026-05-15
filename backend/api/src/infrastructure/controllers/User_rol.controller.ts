import { Request, Response } from "express";
import { CreateUserRolUseCase } from "../../domain/use-case/CreateUserRolUseCase";
import { GetAllUserRolUseCase } from "../../domain/use-case/GetAllUserRolUseCase";

export class UserRolController {
    constructor(
        private readonly createUseCase: CreateUserRolUseCase,
        private readonly getAllUseCase: GetAllUserRolUseCase
    ) {}
   create = async (req: Request, res: Response) => {
        try {
            const user_rol = await this.createUseCase.execute(req.body);
            res.json(user_rol);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }else{
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    getAll = async (_req: Request, res: Response) => {
        try {
            const user_rol = await this.getAllUseCase.execute();
            res.json(user_rol);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }else{
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}   