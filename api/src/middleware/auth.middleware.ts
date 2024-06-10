import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const secretKey = process.env.JWT_SECRET_KEY || 'superSecretKey'

const getTokenFromHeaders = (req: Request): string | undefined => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = verifyToken(token);
    req.user = { email: (decodedToken as any).email };
    return token;
  }
  return undefined;
}

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

const auth = {
  require: expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  })
}

export default auth;