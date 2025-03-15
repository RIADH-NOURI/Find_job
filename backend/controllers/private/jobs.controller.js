import * as jobModel from "../../models/private/job.model.js";
import { jobSchema } from "../../validators/jobValidator.js";
import { applyPagination } from "../../utils/pagination.js";

export const createJob = async (req, res) => {
  try {
    const { error, value } = jobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = await jobModel.createJob(value);
    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    console.error("Error creating job:", err); 
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteJobByRecruiterId = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params;
    const job = await jobModel.deleteJob(jobId, recruiterId);
    res.status(200).json({ message: "Job deleted successfully", jobId: job.id });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getJobByRecruiterId = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const jobs = await jobModel.getJobsByRecruiter(recruiterId);
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { filters, skip, take } = applyPagination(req.query);
    const [jobs, totalJobs] = await Promise.all([
      jobModel.getAllJobs(filters, skip, take),
      jobModel.countJobs(filters),
    ]);

    res.status(200).json({
      pagination: { 
        totalPages: Math.ceil(totalJobs / take),
        limit: take,
        page: Math.floor(skip / take) + 1,
       },
      jobs,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await jobModel.getJobById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteJobById = async(req,res)=>{
     try {
      const {id} = req.params
      if (!id) {
        return res.status(400).json({ error: "Invalid job ID" });
      }
       const deletedJob = await jobModel.deleteJobById(id);
       res.status(200).json({ message: "Job deleted successfully", jobId: deletedJob.id });
     } catch (error) {
       console.error("Error deleting job:", error);
       res.status(500).json({ error: "Failed to delete job" });

     }
}