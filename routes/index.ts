import { User } from "./user";
import { Api } from "./api";
import { PassportStatic } from "passport";

export class Routes {

  private user: User;
  private api: Api;

  constructor(passport: PassportStatic) {
    this.user = new User(passport);
    this.api = new Api();
  }

  public allRoutes(app: any): void {
    this.user.routes("/user", app);
    this.api.routes("/api", app);
  }
}