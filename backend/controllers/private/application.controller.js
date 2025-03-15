import prisma from "../../config/prisma";
import * as applicationModel from "../../models/private/application.model";


export const createApplication = async(req,res) =>{
    try {
        const { jobId, userId } = req.body;
        const application = await applicationModel.createApplication(jobId, userId);
        res.status(200).json({ message: "Application created successfully", application });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const deleteApplicationWithRecruiter = async(req, res) => {

    try {
        const { recruiterId, applicationId } = req.params;
        const application = await applicationModel.deleteApplicationWithRecruiter(recruiterId, applicationId);
        res.status(200).json({ message: "Application deleted successfully", applicationId: application.id });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
export const getApplicationsCountByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      // Fetch count from model
      const count = await applicationModel.getApplicationsCountByUserId(userId);
  
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching application count:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  };

  export const getAllApplications = async(req,res)=>{
    try{
      const applications = await applicationModel.getAllApplications();
      res.status(200).json(applications);
    }
    catch(error){
      res.status(500).json({ error: "Something went wrong" });
    }
  }