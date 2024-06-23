import IUser from "../model/user.model";
import userModel from "../database/user";
import roleModel from "../database/role";
import verificationModel from "../database/verification";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const regiserUser = async (user: IUser) => {
  let { email, password, first_name, last_name } = user;
  email = email.trim();
  password = password.trim();
  first_name = first_name?.trim();
  last_name = last_name?.trim();

  const hashPassword = await bcrypt.hash(password.trim(), 10);
  const roleStudent = await roleModel.findOne({ name: "student" }).exec();

  const newUser = new userModel({
    email,
    password: hashPassword,
    first_name,
    last_name,
    role_id: roleStudent?._id,
  });
  await newUser.save();

  const verify = new verificationModel({
    user_id: newUser._id,
    verify_token: crypto.randomBytes(64).toString("hex"),
  });
  await verify.save();

  const { password: _, ...userWithoutPassword } = newUser.toObject();

  return {
    email: userWithoutPassword.email,
    verify_token: verify.verify_token,
  };
};

export const verifyEmail = async (email: any, emailToken: any) => {
  const user = await userModel.findOne({ email }).exec();
  const verify = await verificationModel
    .findOneAndUpdate(
      {
        user_id: user?._id.toString(),
        verify_token: emailToken,
      },
      {
        verify_token: null,
        verified: true,
      },
      {
        new: true,
      }
    )
    .exec();

  return verify;
};
