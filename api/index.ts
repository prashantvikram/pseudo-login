import { User } from "./user";

export class Routes {

  private user: User = new User();

  public allRoutes(app: any): void {
    this.user.routes("/user", app);
  }
}