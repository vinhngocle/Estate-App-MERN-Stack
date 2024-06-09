import { expressjwt } from 'express-jwt';
import { Request } from 'express';

const getTokenFromHeaders = (req: Request): string | undefined => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1]
  }
  return undefined;
}

const auth = {
  require: expressjwt({
    secret: process.env.JWT_SECRET_KEY || 'superSecretKey',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  })
}

export default auth;