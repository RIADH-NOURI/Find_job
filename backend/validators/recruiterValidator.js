import Joi from "joi";

export const recruiterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("USER", "RECRUITER").required(),
  image: Joi.string().uri().optional(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  companyType: Joi.string().required(),
  company : Joi.string().required(),    
  companySize : Joi.string().required(),
});

