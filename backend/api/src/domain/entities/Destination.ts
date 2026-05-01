export class Destination {
    constructor(
        public id_destination: number,
        public name: string,
        public description: string,
        public image: string,
        public ubicacion: string,
        public duracion: number,
    ) {}
}
export type CreateDestinationDTO = {
    name: string;
    description: string;
    image: string;
    ubicacion: string;
    duracion: number;
}
export type UpdateDestinationDTO = {
    name?: string;
    description?: string;
    image?: string;
    ubicacion?: string;
    duracion?: number;
}