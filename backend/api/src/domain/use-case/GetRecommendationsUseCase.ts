export class GetRecommendationsUseCase {
    constructor(private readonly iaService: { getRecommendations: (data: any) => Promise<any> }) {}

    async execute(userData: any): Promise<any> {
        // Aquí llamas al servicio externo que se comunica con Flask
        return await this.iaService.getRecommendations(userData);
    }
}
