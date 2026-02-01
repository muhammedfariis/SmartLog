import vehicleComposer from "../composers/vehiclesComposers.js";
import express from "express"
import roleMiddleware from "../../../middlewares/roleMiddleware.js";
import Validation from "../../../middlewares/authMiddleware.js" 
const vehicles = vehicleComposer()
const router = express.Router()
router.get("/allvehicles",Validation,roleMiddleware("admin") , vehicles.readVehicles);
router.post("/insertvehicle",Validation, roleMiddleware("admin"), vehicles.createVehicles);
router.put("/updatevehicles", Validation, roleMiddleware("admin"), vehicles.updateVehicles);
router.delete("/deletevehicles",Validation, roleMiddleware("admin"), vehicles.deleteVehicles);


export default router

