import express from 'express';
import {getAllUsers,getUserByName,getApplicationByUserId,updateUser,deleteUser, uploadProfileImage} from '../../controllers/private/user.controller';
import { uploadMiddleware } from '../../middlewares/uploadMiddleware';
import { uploadRateLimiter } from '../../middlewares/uploadRateLimit';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';

const router = express.Router();
router.get('/users', getAllUsers);
router.get('/user/:name', getUserByName);
router.get('/user/:id/applications', getApplicationByUserId);
router.put('/user/:id',rateLimitMiddelware, updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user/:id/upload', uploadRateLimiter, uploadMiddleware, uploadProfileImage);
export default router;