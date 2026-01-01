import "dotenv/config";

import express from "express"
import AutoController from "./DB/controller/AutoController.js";
import { limiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors"






import pkg from "@prisma/client";

const { PrismaClient } = pkg;









const prisma = new PrismaClient();











const app=express();

const PORT=process.env.PORT || 8000;

app.use(fileUpload());


//miggleware




app.use(express.static("Superb"));
app.use(express.json());

app.use(express.urlencoded({ extended:false}));
app.use(helmet()); //extra securtity
app.use(cors()); //condition
app.use(limiter) //api hit limiter












app.get("/",(req,res) =>

{

return res.json({message:"Hey babes its working"})

});



//import routes



import ApiRoutes from "./routes/api.js"
import logger from "./config/logger.js";








app.use("/api",ApiRoutes);



//Queue
import "./Jobs/index.js";











app.listen(PORT, ()=>

console.log(`server is runnning on http://localhost:${PORT}`)

);

console.log("🔥 APP STARTED");






