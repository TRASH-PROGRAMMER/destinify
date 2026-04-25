import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/use-case/CreateUserUseCase";

export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  create = async (req: Request, res: Response) => {
    const result = await this.createUser.execute(req.body);
    res.json(result);
  };
}
export default UserController;