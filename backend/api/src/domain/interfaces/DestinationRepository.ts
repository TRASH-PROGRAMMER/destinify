import { Destination } from "../entities/Destination";
// definicion de la interfaz repository
export interface DestinationRepository {
    // metodo para crear destino
    create(destination: Destination): Promise<Destination>;
    // metodo para obtener todos los destinos
    findAll(): Promise<Destination[]>;
}
// exportacion de la interfaz
export default DestinationRepository;