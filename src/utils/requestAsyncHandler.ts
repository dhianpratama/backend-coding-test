import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import logger from "./logger";

export default fn => (req: Request, res: Response, next: NextFunction) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch((err) => {
      logger.error(`[UNHANDLED ERROR] ${err.message}
        API: ${req.method} ${req.path}
        QueryString: ${JSON.stringify(req.query)}
        Body: ${JSON.stringify(req.body)}
        Headers: ${JSON.stringify(req.headers)}
        Error stack: ${JSON.stringify(err.stack)}
      `);
      res.error({
        status: httpStatus.BAD_GATEWAY,
        error: {
          message: "Something went wrong. Please contact our administator."
        }
      });
    });
};