import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import database from "../Logistics-Management-System/backend/config/database.js"
import spinner from "../Logistics-Management-System/backend/design/ora.js"
import authRouter from "./backend/authentication/src/routers/authRouter.js"
import vehicleRouter from "./backend/vehicleManagement-1/src/routers/vehicleRoute.js"
import errorHandler from "./backend/middlewares/errorHandler.js"
import path from "path"
import helmet from "helmet"
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
app.use(errorHandler)

database()

app.listen(PORT ,()=>{
    console.log("~");
      
    spinner.start()
    console.log("=====>>>");

})