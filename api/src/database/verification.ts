import mongoose from "mongoose";
const { Schema } = mongoose;
import IVerification from "../model/verification.model";

const verificationSchema = new Schema<IVerification>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // code: {
    //   type: String,
    //   require: true,
    // },
    verify_token: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVerification>(
  "Verification",
  verificationSchema
);
