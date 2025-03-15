import express from 'express';
import {getNotificationsByUserId,createNotification,deleteNotification,readNotification} from "../../controllers/private/notifications.controller";
const router = express.Router();

router.get("/user/notifications/:userId", getNotificationsByUserId);

router.post("/create/notification", createNotification);

router.delete("/delete/notification/:id", deleteNotification);

router.get("/read/notifications/:userId", readNotification);

export default router;