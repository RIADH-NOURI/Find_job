import express from 'express';
import {getAllRecruiters,getApplicationsByRecruiterId,getRecruiterById,searchRecruiters,updateRecruiter,deleteRecruiter,updateApplicationStatus, uploadRecruiterImage} from '../../controllers/private/recruiter.controller';
import { uploadMiddleware } from '../../middlewares/uploadMiddleware';
import { uploadRateLimiter } from '../../middlewares/uploadRateLimit';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';

const router = express.Router();

router.get('/recruiters', getAllRecruiters);
router.get('/recruiter/:recruiterId/applications', getApplicationsByRecruiterId);
router.get('/recruiter/:id', getRecruiterById);
router.get('/companies', searchRecruiters);
router.put('/recruiter/:id',rateLimitMiddelware, updateRecruiter);
router.delete('/recruiter/:id', deleteRecruiter);
router.put('/application/:applicationId/status',rateLimitMiddelware, updateApplicationStatus);
router.post('/recruiter/:id/upload',uploadRateLimiter,  uploadMiddleware, uploadRecruiterImage);

export default router;
