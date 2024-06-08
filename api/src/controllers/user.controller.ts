import { Router, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { UserQueryParams } from "../types/query-params";
import { User } from "../types/response";

const router = Router();

export function getUsers(req: Request, res: Response) {
  res.send([]);
}

export function getUserById(req: Request, res: Response) {
  res.send("get user by id");
}

export function CreatUser(
  req: Request<{}, {}, UserModel, UserQueryParams>,
  res: Response<User>
) {
  req.session;
  return res.status(201).send({
    id: 1,
    username: "vinh",
    email: "vinh@gmail.com",
  });
}

export default router;
