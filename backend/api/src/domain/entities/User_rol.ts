export class UserRol {
    constructor(
        public id: number,
        public user_id: number,
        public rol_id: number
    ) {}
}
export type CreateUserRolDTO = {
    user_id: number;
    rol_id: number;
}
export type UpdateUserRolDTO = {
    user_id?: number;
    rol_id?: number;
}
