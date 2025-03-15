import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("USER", "RECRUITER").required(),
  bio: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  status: Joi.string().required(),
    
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
