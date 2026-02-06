import express from "express"
import driverComposer from "../composers/drivercomposer"
import roleMiddleware from "../../../middlewares/roleMiddleware"
import authValidation from "../../../middlewares/authMiddleware"

const Router = express.Router()

const composer = driverComposer()

Router.post("/updateKm" , authValidation , roleMiddleware("driver" , "admin") , composer.updateKm)

export default Router

