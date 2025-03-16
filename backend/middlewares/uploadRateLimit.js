



import rateLimit from "express-rate-limit";

export const uploadRateLimiter = rateLimit({
    windowMs: 24*60*60 * 1000, 
    max: 10, 
    message: 'Too many uploads from this IP, please try again after a 24 hour period.',
    standardHeaders: true, 
    legacyHeaders: false, 
  });
  