"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_local_1 = require("passport-local");
var user_1 = __importDefault(require("../models/user"));
function config(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        user_1.default.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use("signup", new passport_local_1.Strategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        user_1.default.findOne({ "username": username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, { message: "User with the same username/email exists" });
            }
            else {
                var newUser = new user_1.default(req.body);
                newUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser, { message: "User was added successfully" });
                });
            }
        });
    }));
    passport.use("signin", new passport_local_1.Strategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        user_1.default.findOne({ "username": username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "No user found" });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: "Wrong password" });
            }
            return done(null, user, { message: "User logged in successfully" });
        });
    }));
}
exports.default = config;
