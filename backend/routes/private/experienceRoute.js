import express from 'express';
import { createExperience ,getExperiencesByUserId,deleteExperience,updateExperience,getExperienceById,getAllExperiences,getExperiencesCountByUserId} from '../../controllers/private/experience.controller.js';
import { validateExperience } from '../../validators/experienceValidator.js';
import { rateLimitMiddelware } from '../../middlewares/rateLimitMiddelware.js';
const router = express.Router();

router.post('/create/experience',validateExperience,rateLimitMiddelware, createExperience);
router.get('/user/:userId/experiences', getExperiencesByUserId);
router.delete('/experience/:id',rateLimitMiddelware, deleteExperience);

router.get('/experience/:id', getExperienceById);
router.put('/experience/:experienceId',rateLimitMiddelware, updateExperience);

router.get('/experiences', getAllExperiences);

router.get('/experiences/count/:userId', getExperiencesCountByUserId);


export default router;

