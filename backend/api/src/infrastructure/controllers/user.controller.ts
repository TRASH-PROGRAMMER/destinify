import { Request, Response } from "express";

import { CreateUserUseCase } from "../../domain/use-case/CreateUserUseCase";
import { GetAllUsersUseCase } from "../../domain/use-case/GetAllUsersUseCase";
// definicion de la clase controller
export class UserController {
  constructor( private readonly createUser: CreateUserUseCase, 
    private readonly getAllUsersUseCase: GetAllUsersUseCase) {}
// metodo para crear usuario
  create = async (req: Request, res: Response) => {
    const result = await this.createUser.execute(req.body);
    res.json(result);
  };
  // metodo para obtener todos los usuarios
  getAll = async (_req:any,res:any) => {
    try{
      const users = await this.getAllUsersUseCase.execute();
      res.status(200).json(users);
    }catch(error){
      res.status(500).json({message:"Error al obtener los usuarios"});
    }
  }
}
// exportacion de la clase controller
export default UserController;