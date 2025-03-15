import prisma from "../../config/prisma";


export const createNotification = (userId,recruiterId,message,isRead=false)=>{
    return prisma.notification.create({
        data: {
            userId: userId,
            recruiterId: recruiterId,
            message: message,
            isRead: isRead
        }
    });
}