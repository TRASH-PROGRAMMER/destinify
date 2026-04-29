import { User } from "../entities/User";
// definicion de la interfaz para el repositorio
export interface UserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}