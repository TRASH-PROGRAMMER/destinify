export class Rol {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string
    ) {}
}
// definicion de DTOs
export type CreateRolDTO = {
    nombre: string;
    descripcion: string;
}
// definicion de DTOs
export type UpdateRolDTO = {
    nombre?: string;
    descripcion?: string;
}
// exportacion de la clase Rol
export default Rol;