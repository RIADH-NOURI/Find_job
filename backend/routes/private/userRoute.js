import express from 'express';
import {getAllUsers,getUserByName,getApplicationByUserId,updateUser,deleteUser, uploadProfileImage,getUserById,getApplicationByUserName} from '../../controllers/private/user.controller';
import { uploadMiddleware } from '../../middlewares/uploadMiddleware';
import { uploadRateLimiter } from '../../middlewares/uploadRateLimit';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';

const router = express.Router();
router.get('/users', getAllUsers);
router.get('/user/name/:name', getUserByName);
router.get('/user/:name/applications', getApplicationByUserName);
router.get('/user/id/:id', getUserById);
router.put('/user/:id',rateLimitMiddelware, updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user/:id/upload', uploadRateLimiter, uploadMiddleware, uploadProfileImage);
export default router;