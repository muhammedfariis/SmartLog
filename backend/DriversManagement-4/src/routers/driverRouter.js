import express from "express"
import driverComposer from "../composers/drivercomposer.js"
import roleMiddleware from "../../../middlewares/roleMiddleware.js"
import authValidation from "../../../middlewares/authMiddleware.js"

const Router = express.Router()

const composer = driverComposer()

Router.post("/updateKm" , authValidation , roleMiddleware("driver" , "admin") , composer.updateKm)

export default Router

