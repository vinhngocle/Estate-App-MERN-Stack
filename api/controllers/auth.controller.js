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
      return res.send({ message: error.details });
    }

    const newUser = await authService.create(req.body, { abortEarly: false });
    if (!newUser) {
      return res.status(402).send({ message: "User not created." });
    }

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
      return res.send({ message: error.details });
    }
    const expiresIn = 1000 * 60 * 60 * 24 * 7;
    const token = await authService.verifyUser(req.body, expiresIn);

    if (!token) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: expiresIn,
      })
      .status(200)
      .json({
        message: "Login Successfully.",
        data: { ...req.body, avatar: req.body.avatar || null, token },
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
