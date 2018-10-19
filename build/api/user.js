"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var User = /** @class */ (function () {
    function User() {
        this.userController = new user_1.UserController();
    }
    User.prototype.routes = function (endpoint, app) {
        // endpoint for new unique random usernames
        app.route(endpoint + "/generate_new")
            .get(this.userController.generateNew);
        // endpoint for registration
        app.route(endpoint + "/register")
            .post(this.userController.register);
        // endpoint for login
        app.route(endpoint + "/login")
            .post(this.userController.login);
    };
    return User;
}());
exports.User = User;
