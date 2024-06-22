import { Schema } from "mongoose";
import IUser from "../model/user.model";
import userModel from "../database/user";

export const regiserUser = async (user: IUser) => {
  let { email, password, first_name, last_name, role_id } = user;
  email = email.trim();
  password = password.trim();
  first_name = first_name?.trim();
  last_name = last_name?.trim();
  role_id = new Schema.Types.ObjectId("6676ac0062c15c3b7f60097f");

  const newUser = new userModel(user);
  console.log("user", user);

  return await newUser.save();
};
