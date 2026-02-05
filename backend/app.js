import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import database from "./config/database.js"
import spinner from "./design/ora.js"
import authRouter from "./authentication/src/routers/authRouter.js"
import vehicleRouter from "./vehicleManagement-1/src/routers/vehicleRoute.js"
import {errorHandler} from "./middlewares/errorHandler.js"
import path from "path"
import helmet from "helmet"
import TeamRouters from "./teamManagement-2/src/routers/teamroutes.js"
dotenv.config({path: path.resolve(".env")})
// assigning server 

const app = express()
const PORT = process.env.PORT

// using middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/authentication" , authRouter)
app.use("/api/vehicleassignations" , vehicleRouter)
app.use("/api/addteamMembers" , TeamRouters)
app.use(errorHandler)

database()

app.listen(PORT ,()=>{
    console.log("~");
      
    spinner.start()
    console.log("=====>>>");

})

