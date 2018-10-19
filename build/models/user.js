"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = __importStar(require("bcryptjs"));
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: [20, "username should be less than or equal to 20 characters"]
    },
    password: {
        type: String,
        required: true
    },
    lastActive: { type: Date, default: Date.now }
}, { timestamps: true });
exports.UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, function (error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.get("password"), salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.set("password", hash);
            next();
        });
    });
});
// validate user's password during login
exports.UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
var User = mongoose_1.model("User", exports.UserSchema);
exports.default = User;
