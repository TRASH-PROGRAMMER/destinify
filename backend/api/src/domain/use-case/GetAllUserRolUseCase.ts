 import { UserRol } from "../entities/User_rol";
 import { UserRolRepository } from "../interfaces/IARepository";
 
 export class GetAllUserRolUseCase {
     constructor(private readonly repository: UserRolRepository) {}
     async execute(): Promise<UserRol[]> {
         return await this.repository.findAll();
     }
 }
 export default GetAllUserRolUseCase;