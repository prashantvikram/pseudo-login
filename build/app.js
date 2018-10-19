"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var morgan_1 = __importDefault(require("morgan"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var express_session_1 = __importDefault(require("express-session"));
var passport_config_1 = __importDefault(require("./config/passport-config"));
var winston_config_1 = __importDefault(require("./config/winston-config"));
var env_config_1 = require("./config/env-config");
var api_1 = require("./api");
var App = /** @class */ (function () {
    function App() {
        this.routes = new api_1.Routes();
        this.mongoUrl = env_config_1.config.mongoUrl;
        this.app = express_1.default();
        this.config();
        this.routes.allRoutes(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        // middleware for parsing requests
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // setting the port
        this.app.set("port", env_config_1.config.port);
        passport_config_1.default(passport_1.default);
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express_session_1.default({
            secret: env_config_1.config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(morgan_1.default("combined", {
            stream: {
                write: function (message) {
                    winston_config_1.default.info(message);
                },
            }
        }));
    };
    App.prototype.mongoSetup = function () {
        mongoose_1.default.connect(this.mongoUrl, { useNewUrlParser: true }, function (err) {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log("Database connected");
            }
        });
    };
    return App;
}());
exports.default = new App().app;
