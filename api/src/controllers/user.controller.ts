import { Request, Response } from 'express'

export function getUsers(req: Request, res: Response) {
  res.send("get users")
}

export function getUserById(req: Request, res: Response) {
  res.send("get user by id")
}