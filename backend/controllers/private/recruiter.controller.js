import * as RecruiterModel from "../../models/private/recruiter.model";
import * as NotificationModel from "../../models/private/notification.model";
import { uploadImageToCloudinary } from "../../services/cloudinary.service";

// Get all recruiters
export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await RecruiterModel.getAllRecruiters();
    res.status(200).json({ message: "Recruiters fetched successfully", recruiters });
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ error: "Failed to fetch recruiters" });
  }
};

// Get recruiter by ID
export const getRecruiterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Recruiter ID is required" });
    }

    const recruiter = await RecruiterModel.getRecruiterById(id);

    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    console.error("Error fetching recruiter:", error);
    res.status(500).json({ error: "Failed to fetch recruiter" });
  }
};


// Update recruiter
export const updateRecruiter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
if (!id) {
  res.status(404).json({ error: "Recruiter ID is required" });
  return;
}

    const updatedRecruiter = await RecruiterModel.updateRecruiter(id, updateData);
    if (!updatedRecruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }
    res.status(200).json({ message: "Recruiter updated successfully", recruiter: updatedRecruiter });
  } catch (error) {
    console.error("Error updating recruiter:", error);
    res.status(500).json({ error: "Failed to update recruiter" });
  }
};

// Delete recruiter
export const deleteRecruiter = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid recruiter ID" });
    }

    await RecruiterModel.deleteRecruiter(id);
    res.status(200).json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    res.status(500).json({ error: "Failed to delete recruiter" });
  }
};

// Get applications by recruiter ID
export const getApplicationsByRecruiterId = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    let { page = 1, limit = 10 } = req.query;

    if (!recruiterId) {
      return res.status(400).json({ error: "Recruiter ID is required" });
    }

    // Check if the recruiter exists
    const recruiterExists = await RecruiterModel.getRecruiterById(recruiterId);
    if (!recruiterExists) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: "Invalid page or limit value" });
    }

    const skip = (page - 1) * limit;
    const { totalApplications, applications } = await RecruiterModel.getApplicationsByRecruiterId(recruiterId, skip, limit);

    const totalPages = Math.ceil(totalApplications / limit);

    res.status(200).json({
      message: "Applications fetched successfully",
      pagination: {
        limit,
        page,
        totalPages,
      },
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


// Update application status
// Update application status and create notification
// Update application status and create notification
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

   
    const updatedApplication = await RecruiterModel.updateApplicationStatus(applicationId, status);
    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    const { id: userId } = updatedApplication.user;
    const { id: recruiterId } = updatedApplication.job.recruiter;

    await NotificationModel.createNotification(
      userId,
      recruiterId,
      status
    );

    res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
};


// Search recruiters
export const searchRecruiters = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    const recruiters = await RecruiterModel.searchRecruiters(search);
    if (recruiters.length === 0) {
      return res.status(404).json({ message: "No recruiters found matching the search term" });
    }

    res.status(200).json(recruiters);
  } catch (error) {
    console.error("Error searching recruiters:", error);
    res.status(500).json({ error: "Failed to search recruiters" });
  }
};

export const uploadRecruiterImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imageUrl = await uploadImageToCloudinary(req.file.path);

    const userImage = await RecruiterModel.updateImageByRecruiterId(id, imageUrl);

    res.status(200).json(userImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


