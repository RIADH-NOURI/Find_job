import express from 'express';
import {createJob,getJobById,getJobByRecruiterId,getAllJobs,deleteJobById} from '../../controllers/private/jobs.controller';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware';


const router = express.Router();

router.post('/create/job',rateLimitMiddelware, createJob);
router.get('/job/:jobId', getJobById);
router.get('/recruiter/jobs/:recruiterId', getJobByRecruiterId);
router.get('/jobs', getAllJobs);
router.delete('/delete/job/:id', deleteJobById);

export default router;