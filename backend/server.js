import express from "express";
import dotenv from "dotenv";
import routesApp from "./app.route";
import expressConfig from "./config/express.config";
import helemtSecretConfig from "./config/helmet.secrute.config"
dotenv.config();

const app = express();
const PORT = 5000;


expressConfig(app);


helemtSecretConfig(app);

app.use("/", routesApp);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
