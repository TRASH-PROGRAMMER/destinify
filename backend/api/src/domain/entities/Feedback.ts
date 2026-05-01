export class Feedback {
    constructor(
        public id_felback: number,
        public user_id: number,
        public service_id: number,
        public rating: number,
        public comentario: string,
       
    ){}
}
export type CreateFelbackDTO = {
    user_id: number;
    service_id: number;
    rating: number;
    comentario: string;
}
export type UpdateFelbackDTO = {
    id_felback: number;
    user_id?: number;
    service_id?: number;
    rating?: number;
    comentario?: string;
}
