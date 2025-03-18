import * as ExperienceModel from '../../models/private/experience.model.js';
import { experienceSchema } from '../../validators/experienceValidator.js';

// Create a new experience
export const createExperience = async (req, res) => {
  try {
    const experienceData = req.body;
    console.log("Received experience data:", experienceData);

    // Validate the request body
    const { error } = experienceSchema.validate(experienceData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newExperience = await ExperienceModel.createExperience(experienceData);
    res.status(201).json({ message: "Experience created successfully", experience: newExperience });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get experiences by user ID
export const getExperiencesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is valid

    const experiences = await ExperienceModel.getExperiencesByUserId(userId);
    if (!experiences || experiences.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
};
export const getExperiencesByUserName = async (req, res) => {
  try {
    const { name } = req.params;

    // Check if userId is valid

    const experiences = await ExperienceModel.getExperiencesByUserName(name);
    if (!experiences || experiences.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
};

// Update an experience
export const updateExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const updateData = req.body;

    // Check if experienceId is valid
    if (isNaN(experienceId)) {
      return res.status(400).json({ error: "Invalid experience ID" });
    }


    // Check if the experience exists
    const existingExperience = await ExperienceModel.getExperienceById(experienceId);
    if (!existingExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    const updatedExperience = await ExperienceModel.updateExperience(Number(experienceId), updateData);
    res.status(200).json({ message: "Experience updated successfully", experience: updatedExperience });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: "Failed to update experience" });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if experienceId is valid
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid experience ID" });
    }

    // Check if the experience exists
    const existingExperience = await ExperienceModel.getExperienceById(parseInt(id));
    if (!existingExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    await ExperienceModel.deleteExperience(Number(id));
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Failed to delete experience" });
  }
};

export const getExperienceById = async(req, res) => {
  try{
    const {id} = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid experience ID" });
  }
  const experience = await ExperienceModel.getExperienceById(Number(id));
  if (!experience) {
    return res.status(404).json({ error: "Experience not found" });
  }
  res.status(200).json(experience);
  }
  catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({ error: "Failed to fetch experience" });
  }

};
  export const getAllExperiences = async(req, res)=>{

    try{
      const experiences = await ExperienceModel.getAllExperiences();
      res.status(200).json(experiences);
    }
    catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ error: "Failed to fetch experience" });
    }
  }

  export const getExperiencesCountByUserId = async (req, res) => {
      try {
        const { userId } = req.params;
    
        if (!userId) {
          return res.status(400).json({ error: "Invalid user ID" });
        }
    
        const count = await ExperienceModel.getExperiencesCountByUserId(userId);
    
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error fetching application count:", error);
        res.status(500).json({ error: "Something went wrong" });
      }
    };
