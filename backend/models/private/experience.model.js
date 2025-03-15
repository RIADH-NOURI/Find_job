import prisma from "../../config/prisma";

export const createExperience = (experienceData)=>{
    return prisma.experience.create({
        data: {
            ...experienceData,
        },
    });
}

export const getExperiencesByUserId = (userId) => {
    return prisma.experience.findMany({
        where: {
            userId,
        },
    });
}

export const deleteExperience = (experienceId) => {
    return prisma.experience.delete({
        where: {
            id: experienceId,
        },
    });
}

export const updateExperience = (experienceId, experienceData) => {
    return prisma.experience.update({
        where: {
            id: experienceId,
        },
        data: {
            ...experienceData,
        },
    });
}
export const getExperienceById = (experienceId) =>
    prisma.experience.findUnique({
        where: {
            id: experienceId,
        },
    });


export const getAllExperiences = () => prisma.experience.findMany();


export const getExperiencesCountByUserId = async (userId) => {
    return await prisma.experience.count({
      where: {
        userId: userId, // Ensure you match the userId field in the database
      },
    });
  };