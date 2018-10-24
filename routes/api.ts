import { ApiController } from "../controllers/api";

export class Api {

  public apiController: ApiController = new ApiController();

  public routes(endpoint: string, app: any): void {

    app.get(`${endpoint}`, this.apiController.isAuthenticated, this.apiController.getData);
  }
}