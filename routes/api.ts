import { ApiController } from "../controllers/api";

export class Api {
  public apiController: ApiController = new ApiController();

  public routes(endpoint: string, app: any): void {
    // endpoint for new unique random usernames
    app.route(`${endpoint}`)
      .get(this.apiController.getData);
  }
}