import prisma from "../../config/prisma.js";

// Fetch all users
export const findAllUsers = () => prisma.user.findMany({});

// Fetch user by ID
export const findUserByName = (name) =>
   prisma.user.findFirst({
    where: { name },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      image: true,
      country: true,
      city: true,
      dateOfBirth: true,
      status: true,
    },
  });

// Update user by ID
export const updateUserById = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
  });

// Delete user by ID
export const deleteUserById = (id) =>
  prisma.user.delete({
    where: { id },
  });

// Get applications by user ID
export const getUserApplications = (id) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      applications: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          job: {
            select: {
              title: true,
              recruiter: {
                select: { company: true ,
                  image: true
                },
              },
            },
          },
        },
      },
    },
  });
  export const getUserApplicationsByName = async (userName) => {
    return prisma.user.findFirst({
      where: { name: userName }, 
      select: {
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            job: {
              select: {
                title: true,
                recruiter: {
                  select: {
                    company: true,
                    image: true
                  },
                },
              },
            },
          },
        },
      },
    });
  };
  
 export const updateImageByUserId = async (id, imageUrl) => {
    try {
      const userImage = await prisma.user.update({
        where: { id },
        data: { image: imageUrl },
      });
      return userImage;
    } catch (error) {
      throw new Error('Error updating user image: ' + error.message);
    }
  };
 export const getUserByIdQuery = (id)=>{
   return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      bio: true,
      image: true,
      country: true,
      city: true,
    },
  });
 }