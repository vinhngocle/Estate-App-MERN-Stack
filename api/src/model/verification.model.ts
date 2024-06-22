import { Schema } from "mongoose";

export default interface IVerification {
  user_id: Schema.Types.ObjectId;
  code: string;
  verify_token: string;
  verified: boolean;
}
