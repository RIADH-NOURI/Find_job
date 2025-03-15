import express from 'express';
import register from '../../controllers/public/register.controller';
import login from '../../controllers/public/login.controller';
import { forgotPassword, resetPassword } from '../../controllers/public/auth.controller';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password',rateLimitMiddelware, forgotPassword);
router.post('/reset-password', resetPassword);


export default router;