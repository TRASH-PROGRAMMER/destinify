import { Request, Response } from "express";
import { Rol } from "../../domain/entities/Rol";
import {CreateRolUseCase } from "../../domain/use-case/CreateRolUseCase"
import { GetAllRolUseCase } from "../../domain/use-case/GetAllRolUseCase";
// definicion de la clase controller
export class RolController {
    // constructor
    constructor(private createUseCase: CreateRolUseCase, private getAllUseCase: GetAllRolUseCase) {}
    // metodo para obtener todos los roles
    getAll = async (_req: Request, res: Response) => {
        try {
            const roles = await this.getAllUseCase.execute();
            res.json(roles);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    // metodo para crear rol
   create = async (req: Request, res: Response) => {
        try {
            const rol = await this.createUseCase.execute(req.body);
            res.json(rol);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
