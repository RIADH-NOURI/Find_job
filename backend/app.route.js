import express from "express";
import appRoutes from "./routes/private/applicationRoute";
import usersRoutes from "./routes/private/userRoute";
import authRoutes from "./routes/public/authRoutes";
import jobRoutes from "./routes/private/jobRouts";
import recruiterRoutes from "./routes/private/recruiterRoute";
import experienceRoutes from "./routes/private/experienceRoute";
import notificationRoutes from "./routes/private/notificationRoute";
import { authantication } from "./middlewares/authanticate";

const app = express();



app.use("/api/v1",authantication, appRoutes);
app.use("/api/v1",authantication, usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1",authantication, jobRoutes);
app.use("/api/v1",authantication, recruiterRoutes);
app.use("/api/v1",authantication, experienceRoutes);
app.use("/api/v1",authantication, notificationRoutes);

export default app;