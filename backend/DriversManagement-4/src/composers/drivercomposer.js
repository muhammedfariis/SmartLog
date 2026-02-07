import { UserRepository } from "../repositories/userRepo.js";
import DriverController from "../controllers/driverControllers.js";
import DriverServices from "../services/driverServices.js";

import {UserRepository as VehicleRepository} from "../../../vehicleManagement-1/src/repositories/userRepo.js"


const driverComposer = ()=>{
   
    const driverRepo = new UserRepository()
    const vehicleRepo = new VehicleRepository()
    const driverService = new DriverServices(driverRepo , vehicleRepo)
    const driverController = new DriverController(driverService)

    return driverController

}

export default driverComposer