"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// definicion de la clase controller
class UserController {
    createUser;
    getAllUsersUseCase;
    constructor(createUser, getAllUsersUseCase) {
        this.createUser = createUser;
        this.getAllUsersUseCase = getAllUsersUseCase;
    }
    // metodo para crear usuario
    create = async (req, res) => {
        const result = await this.createUser.execute(req.body);
        console.log(req.body);
        res.json(result);
    };
    // metodo para obtener todos los usuarios
    getAll = async (_req, res) => {
        try {
            const users = await this.getAllUsersUseCase.execute();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los usuarios" });
        }
    };
}
exports.UserController = UserController;
// exportacion de la clase controller
exports.default = UserController;
