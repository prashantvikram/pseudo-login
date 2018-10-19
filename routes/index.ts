import { User } from "./user";
import { Api } from "./api";

export class Routes {

  private user: User = new User();
  private api: Api = new Api();

  public allRoutes(app: any): void {
    this.user.routes("/user", app);
    this.api.routes("/api", app);
  }
}