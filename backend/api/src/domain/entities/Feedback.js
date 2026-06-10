"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
class Feedback {
    id_felback;
    user_id;
    service_id;
    rating;
    comentario;
    constructor(id_felback, user_id, service_id, rating, comentario) {
        this.id_felback = id_felback;
        this.user_id = user_id;
        this.service_id = service_id;
        this.rating = rating;
        this.comentario = comentario;
    }
}
exports.Feedback = Feedback;
