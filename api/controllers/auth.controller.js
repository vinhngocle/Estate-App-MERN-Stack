import * as authService from "../services/auth.service.js";
import logger from "../utils/logger.js";
import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().required(),
});

export const register = async (req, res) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.json({ message: error.details });
    }

    const existUser = await authService.existUser(req.body.username);
    if (existUser) {
      logger.error("User already exists.");
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = await authService.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully.", data: newUser });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Error creating user!" });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.json({ message: error.details });
    }

    const existUser = await authService.existUser(req.body.username);
    if (!existUser) {
      return res.json("User not found.");
    }
    const { password: userPassword, ...userInfo } = existUser;

    const expiresTime = "7d";
    req.body.id = userInfo.id;
    const token = await authService.verifyUser(
      req.body,
      userPassword,
      expiresTime
    );

    if (!token) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    res.status(200).json({
      message: "Login Successfully.",
      data: { ...userInfo, token },
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successfully." });
};
