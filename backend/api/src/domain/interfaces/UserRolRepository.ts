import { UserRol } from "../entities/User_Rol";

export interface UserRolRepository {
  create(userRol: UserRol): Promise<UserRol>;
  findAll(): Promise<UserRol[]>;
}

export default UserRolRepository;
