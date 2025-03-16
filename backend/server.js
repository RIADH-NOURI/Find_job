import express from "express";
import dotenv from "dotenv";
import routesApp from "./app.route";
import expressConfig from "./config/express.config";
import helemtSecretConfig from "./config/helmet.secrute.config"
import axios from "axios";
import compression from 'compression';
dotenv.config();

const app = express();
const PORT = 5000;
//for testing purposes and no sleep server
setInterval(async()=>{
  try{
         await axios.get('https://findjob-4vl9.onrender.com')
         console.log('Success response');
  }
  catch(error){
        console.log('error for get data:',error)
  }
},10*60*1000);


expressConfig(app);


helemtSecretConfig(app);

app.use("/", routesApp);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
