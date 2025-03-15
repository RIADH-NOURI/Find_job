import prisma from "../../config/prisma";

export const createJob = (jobData) => {
  return prisma.job.create({
    data: {
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      salary: jobData.salary,
      jobType: jobData.jobType,
      experienceLevel: jobData.experienceLevel,
      recruiterId: jobData.recruiterId,
      technologies: jobData.technologies?.length
        ? {
            connectOrCreate: jobData.technologies.map((tech) => ({
              where: { name: tech.name },
              create: { name: tech.name },
            })),
          }
        : undefined,
    },
    include: {
      technologies: true, // Ensure related technologies are included in the response
    },
  });
};
export const deleteJob = (jobId, recruiterId) =>
  prisma.job.delete({
    where: { id: parseInt(jobId), recruiterId },
  });
export const getJobsByRecruiter = (recruiterId) =>
  prisma.job.findMany({
    where: { recruiterId },
    include: {
      recruiter: { select: { name: true } },
      technologies: { select: { name: true } },
    },
  });
export const getJobById = (jobId) =>
  prisma.job.findUnique({ where: { id:jobId } });
export const getAllJobs = (filters, skip, take) =>
  prisma.job.findMany({ where: filters, skip, take ,
    orderBy: {
      createdAt: 'desc',
    },
    include:{
      recruiter: { select: { companyType: true, company: true ,image: true,city: true,companySize: true} },
      technologies: { select: { name: true } },
    },
  },
  );
export const countJobs = (filters) => prisma.job.count({ where: filters });

export const deleteJobById = (id)=>{
  // code for deleting job by id
  return prisma.job.delete({ where: { id } });
}