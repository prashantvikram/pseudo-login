import { UserController } from "../controllers/user";
import { PassportStatic } from "passport";

export class User {

  public userController: UserController;

  constructor(passport: PassportStatic) {
    this.userController = new UserController(passport);
  }

  public routes(endpoint: string, app: any): void {
    // endpoint for new unique random usernames
    app.route(`${endpoint}`)
      .get(this.userController.getUserSession);

    // endpoint for new unique random usernames
    app.route(`${endpoint}/generate_new`)
      .get(this.userController.generateNew);

    // endpoint for registration
    app.route(`${endpoint}/signup`)
      .post(this.userController.signup);

    // endpoint for login
    app.route(`${endpoint}/signin`)
      .post(this.userController.signin);

    // endpoint for logout
    app.route(`${endpoint}/logout`)
      .post(this.userController.logout);
  }
}