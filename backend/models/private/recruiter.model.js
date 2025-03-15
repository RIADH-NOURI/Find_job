import prisma from "../../config/prisma";

// Get all recruiters
export const getAllRecruiters = async () => {
  return prisma.recruiter.findMany({
    include: {
      jobs: true,
    },
  });
};

// Get recruiter by ID
export const getRecruiterById = async (id) => {
  return await prisma.recruiter.findUnique({
    where: { id },
  });
};

// Update recruiter
export const updateRecruiter = async (id, updateData) => {
  return prisma.recruiter.update({
    where: { id },
    data: updateData,
  });
};

// Delete recruiter
export const deleteRecruiter = async (id) => {
  return prisma.recruiter.delete({
    where: { id },
  });
};

// Get applications by recruiter ID
export const getApplicationsByRecruiterId = async (recruiterId, skip, limit) => {
  const totalApplications = await prisma.application.count({
    where: {
      job: { recruiterId },
    },
  });

  const applications = await prisma.application.findMany({
    where: {
      job: { recruiterId },
    },
    orderBy:{
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      job: {
        select: { title: true },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    skip,
    take: limit,
  });

  return { totalApplications, applications };
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  return prisma.application.update({
    where: { id: applicationId },
    data: { status },
    select: {
      id: true,
      status: true,
      job: {
        select: {
          recruiter: {
            select: {
              id: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
        },
      },
    },
  });
};



// Search recruiters
export const searchRecruiters = async (search) => {
  return prisma.recruiter.findMany({
    where: {
      company: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      company: true,
    },
  });
};

export const updateImageByRecruiterId = async (id, imageUrl) => {
  try {
    const userImage = await prisma.recruiter.update({
      where: { id },
      data: { image: imageUrl },
    });
    return userImage;
  } catch (error) {
    throw new Error('Error updating user image: ' + error.message);
  }
};