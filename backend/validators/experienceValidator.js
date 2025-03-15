import { ExperienceLevel } from "@prisma/client";
import Joi from "joi";


export const experienceSchema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    company: Joi.string().required(),
    experienceLevel:Joi.string().trim().optional(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
});

export const validateExperience = (req, res, next) => {
    const { error } = experienceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
}