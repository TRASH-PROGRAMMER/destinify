"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
class Rol {
    id;
    nombre;
    descripcion;
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
exports.Rol = Rol;
// exportacion de la clase Rol
exports.default = Rol;
