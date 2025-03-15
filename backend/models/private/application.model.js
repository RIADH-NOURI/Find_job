import prisma from "../../config/prisma";

export const createApplication = (jobId,userId) =>{
    return prisma.application.create({
        data: {
            jobId,
            userId,
        },
    });
}

export const deleteApplicationWithRecruiter = (recruiterId,applicationId) =>{
    return prisma.application.delete({
        where: {
            id: applicationId,
            job: {
                recruiterId,
            },
        },
    });
}

export const getApplicationsCountByUserId = async (userId) => {
    return await prisma.application.count({
      where: {
        userId: userId, // Ensure you match the userId field in the database
      },
    });
  };

 export const  getAllApplications =()=>{
    return prisma.application.findMany();
 }
  