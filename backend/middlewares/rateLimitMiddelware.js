import rateLimit from "express-rate-limit";


export const rateLimitMiddelware = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10,
    message: 'Too many requests from this IP, please try again after an hour',
    standardHeaders: true, 
    legacyHeaders: false, 
  });
