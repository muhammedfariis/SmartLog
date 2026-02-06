import { UserRepository } from "../repositories/userRepo";
import DriverController from "../controllers/driverControllers";
import DriverServices from "../services/driverServices";

import {UserRepository as VehicleRepository} from "../../../vehicleManagement-1/src/repositories/userRepo.js"


const driverComposer = ()=>{
   
    const driverRepo = new UserRepository()
    const vehicleRepo = new VehicleRepository()
    const driverService = new DriverServices(driverRepo , vehicleRepo)
    const driverController = new DriverController(driverService)

    return driverController

}

export default driverComposer