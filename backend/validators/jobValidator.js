import Joi from "joi";

export const jobSchema = Joi.object({
  recruiterId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number().optional(),
  jobType: Joi.string().optional(),
  experienceLevel: Joi.string().optional(),
  technologies: Joi.array()
    .items(Joi.object({ id: Joi.number().optional(), name: Joi.string().optional() }))
    .optional(),
});