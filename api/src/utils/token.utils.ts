import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model';

const generateToken = (user: Partial<UserModel>): string => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY || 'superSecretKey', { expiresIn: '7d' })
}

export default generateToken;