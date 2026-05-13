import { IA } from "../entities/ia";
import { UserRol } from "../entities/User_rol";
export interface IARepository {
    create(ia: IA): Promise<IA>;
    findAll(): Promise<IA[]>;
}   
export interface UserRolRepository {
    create(user_rol: UserRol): Promise<UserRol>;
    findAll(): Promise<UserRol[]>;
}
