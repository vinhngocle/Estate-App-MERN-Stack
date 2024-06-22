import mongoose from "mongoose";
const { Schema } = mongoose;
import IRole from "../model/role.model";

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      require: [true, "Name is required."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRole>("Role", roleSchema);
