"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var Routes = /** @class */ (function () {
    function Routes() {
        this.user = new user_1.User();
    }
    Routes.prototype.allRoutes = function (app) {
        this.user.routes("/user", app);
    };
    return Routes;
}());
exports.Routes = Routes;
