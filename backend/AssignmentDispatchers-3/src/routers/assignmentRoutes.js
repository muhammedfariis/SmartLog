import assignmentComposers from "../composers/assignComposers.js";
import express from "express"
import Role from "../../../middlewares/roleMiddleware.js"
import Auth from "../../../middlewares/authMiddleware.js"


const composer = assignmentComposers()

const Router = express.Router()


Router.get("/assignmentShedule" , Auth , Role("dispatcher" , "admin"), composer.readAssignedDetails)

Router.post("/assignment" , Auth , Role("dispatcher" , "admin") , composer.assignDriversTrip)


export default Router
