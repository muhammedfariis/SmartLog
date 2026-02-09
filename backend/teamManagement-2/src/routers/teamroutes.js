
import teamComposers from "../composers/teamcomposers.js";
import express from 'express'
import authValidation from "../../../middlewares/authMiddleware.js";
import roleMiddleware from "../../../middlewares/roleMiddleware.js";

const Router = express.Router()

const Team = teamComposers()

Router.get("/alldispatchers" , authValidation , roleMiddleware("admin"), Team.readDispatcher)
Router.get("/alldrivers" , authValidation , roleMiddleware("admin") , Team.readDriver)
Router.post("/createDrivers" , authValidation , roleMiddleware("admin"), Team.createDriver)
Router.post("/createDispatchers" , authValidation , roleMiddleware("admin") , Team.createDispatcher)
Router.delete("/deleteDrivers/:id" , authValidation , roleMiddleware("admin") , Team.deleteDriver)
Router.delete("/deleteDispatchers/:id" , authValidation , roleMiddleware("admin") , Team.deleteDispatcher)


export default Router