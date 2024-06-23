import mongoose from "mongoose";
const { Schema } = mongoose;
import IUser from "../model/user.model";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      require: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required."],
    },
    first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    // email_veried: {
    //   type: Boolean,
    //   default: false,
    // },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
