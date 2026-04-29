export class Felback {
    constructor(
        public id_felback: number,
        public feedback: string
    ){}
}
export type CreateFelbackDTO = {
    feedback: string;
}