import { Document, Schema, Model, model, HookNextFunction } from "mongoose";
import * as bcrypt from "bcryptjs";

// interface

export interface IUser extends Document {
  username: String;
  password: String;
  lastActive: Date;
  validatePassword: Function;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "username should be less than or equal to 20 characters"]
  },
  password: {
    type: String,
    required: true
  },
  lastActive: { type: Date, default: Date.now, expires: 1209600 }
}, { timestamps: true });

UserSchema.pre("save", function (this: Document, next: HookNextFunction): any {
  var user: Document = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function (error: Error, salt: any): any {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.get("password"), salt, function (error: Error, hash: string): any {
      if (error) {
        return next(error);
      }

      user.set("password", hash);
      next();
    });
  });
});

// remove documents 1209600 seconds (14 days) after the lastActive value.
// lastActive updates to current date on login
UserSchema.index({ lastActive: 1 }, { expireAfterSeconds: 0 });

// validate user's password during login
UserSchema.methods.validatePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;