import { IA } from "../entities/ia";
import { UserRol } from "../entities/User_Rol";
export interface IARepository {
    create(ia: IA): Promise<IA>;
    findAll(): Promise<IA[]>;
}   

export default IARepository;
