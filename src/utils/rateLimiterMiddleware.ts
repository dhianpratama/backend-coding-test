import httpStatus from "http-status";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

export const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      return res.error({
        status: httpStatus.TOO_MANY_REQUESTS,
        error: {
          message: "Too many request. You are not allowed to do this"
        }
      });
    });
};