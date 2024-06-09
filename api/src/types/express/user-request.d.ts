import * as express from "express-serve-static-core";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        username?: string;
      };
    }
  }
}

