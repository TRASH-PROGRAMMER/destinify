import { Rol } from "../entities/Rol";
// definicion de la interfaz para el repositorio
export interface RolRepository {
    // metodo para obtener todos los roles
    findAll(): Promise<Rol[]>;
    // metodo para crear un rol
    create(rol: Rol): Promise<Rol>;

}   
export default RolRepository;