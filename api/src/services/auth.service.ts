import IUser from "../model/user.model";
import userModel from "../database/user";
import roleModel from "../database/role";
// import verificationModel from "../database/verification";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateToken from "../utils/token.utils";

export const regiserUser = async (user: IUser) => {
  let { email, password, first_name, last_name, verify_token } = user;
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
    verify_token: crypto.randomBytes(64).toString("hex"),
  });
  await newUser.save();

  const { password: _, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword;
};

export const verifyEmail = async (email: any, verifyToken: any) => {
  const verify = await userModel
    .findOneAndUpdate(
      {
        email,
        verify_token: verifyToken,
      },
      {
        verify_token: null,
        verified: true,
      },
      {
        new: true,
      }
    )
    .select(["email", "verify_token", "verified"])
    .exec();

  console.log("verify", verify);

  return verify;
};

export const loginUser = async (email: any, password: any) => {
  const user = await userModel.findOne({ email }).exec();

  if (user && user.verified === true) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = {
        id: user._id.toString(),
      };
      
      return {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        verified: user.verified,
        token: generateToken(payload),
      };
    }
  }

  return null;
};
