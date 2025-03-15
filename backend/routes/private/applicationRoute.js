import express from 'express';
import {createApplication,deleteApplicationWithRecruiter,getApplicationsCountByUserId,getAllApplications} from '../../controllers/private/application.controller';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';

const router = express.Router();
router.post('/create/application',rateLimitMiddelware, createApplication);
router.delete('/delete/application/:recruiterId/:applicationId', deleteApplicationWithRecruiter);
router.get('/applications/count/:userId', getApplicationsCountByUserId);

router.get('/applications', getAllApplications);
export default router;