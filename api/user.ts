import { UserController } from "../controllers/user";

export class User {
  public userController: UserController = new UserController();

  public routes(endpoint: string, app: any): void {
    // endpoint for new unique random usernames
    app.route(`${endpoint}/generate_new`)
      .get(this.userController.generateNew);

    // endpoint for registration
    app.route(`${endpoint}/register`)
      .post(this.userController.register);

    // endpoint for login
    app.route(`${endpoint}/login`)
      .post(this.userController.login);
  }
}