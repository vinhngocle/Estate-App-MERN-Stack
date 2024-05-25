import * as userService from "../services/user.service.js";
import logger from "../utils/logger.js";
import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export const getListUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send({ data: users });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to get users." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      res.status(402).send({ message: "user id not exists." });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to get user." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = await schema.validate(req.body);
    if (error) {
      return res.send({ message: error.details });
    }

    const user = await userService.updateUserById(req.params.id, req.body);
    if (!user) {
      res.status(402).send({ message: "user id not exists." });
    }
    res.status(200).send({ message: "Update user successfully", data: user });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to update user." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      res.status(402).send({ message: "user id not exists." });
    }

    res.status(200).send({ message: "Delete user successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "Failed to delete user." });
  }
};
