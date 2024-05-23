import * as userService from "../services/user.service.js";
import logger from "../utils/logger.js";
import Joi from "joi";

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
    const user = await userService.updateUserById(req.params.id);
    if (!user) {
      res.status(402).send({ message: "user id not exists." });
    }
    res.status(200).send({ data: user });
  } catch (error) {}
};
