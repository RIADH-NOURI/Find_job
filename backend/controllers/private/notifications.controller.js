import prisma from "../../config/prisma";



export const getNotificationsByUserId = async (req, res) => {
    try {
        const {userId}= req.params
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
            
        }
        const notifications = await prisma.notification.findMany({
            where: { userId: userId,
               
             },
             orderBy: {
                 createdAt:'desc'
             },
            select: {
                id: true,
                message: true,
                isRead: true,
                createdAt: true,
                recruiter: {
                    select: {
                        company: true,
                        image: true,
                    }
                }
            },
           
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
export const createNotification = async (req, res) => {
    try {
        const { userId,recruiterId,message,isRead} = req.body;
        const notification = await prisma.notification.create({
            data: {
            userId: userId,
            recruiterId: recruiterId,
            message: message,
            isRead: isRead
            }
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
export const deleteNotification = async (req, res) => {
    try {
        const {id} = req.params;

        const notification = await prisma.notification.delete({
            where: { id:parseInt(id) },
        });

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
export const readNotification = async (req, res) => {
    try {
      const { userId } = req.params;
  
     
  
      const updatedNotifications = await prisma.notification.updateMany({
        where: { userId: userId, isRead: false },
        data: { isRead: true },
      });
  
      
  
      res.status(200).json(updatedNotifications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  