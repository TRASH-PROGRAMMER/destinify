export class IA {
    constructor(
        public id_ia: number,
        public prompt: string,
        public createdAt: Date
    ) {}
}

export type CreateIADTO = {
    prompt: string;
    createdAt: Date;
};
export type UpdateIADTO = {
    prompt?: string;
    createdAt?: Date;
};