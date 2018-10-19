"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rug = require("random-username-generator");
var passport_1 = __importDefault(require("passport"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.generateNew = function (_, res) {
        rug.setSeperator("_");
        var username = rug.generate().toLowerCase();
        return res.status(200).send(username);
    };
    UserController.prototype.register = function (req, res, next) {
        passport_1.default.authenticate("signup", function (err, user, info) {
            if (err) {
                return next(err);
            }
            return res.json(info);
        })(req, res, next);
    };
    UserController.prototype.login = function (req, res, next) {
        passport_1.default.authenticate("signin", function (err, user, info) {
            if (err) {
                return next(err);
            }
            return res.json(info);
        })(req, res, next);
    };
    return UserController;
}());
exports.UserController = UserController;
