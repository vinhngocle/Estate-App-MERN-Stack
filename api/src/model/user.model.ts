import { Schema } from "mongoose";

export default interface IUser {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  refresh_token?: string;
  // email_veried: boolean;
  role_id: Schema.Types.ObjectId;
  deleted_at?: Date;
}
