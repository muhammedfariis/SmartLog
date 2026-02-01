import VehicleControllers from "../controllers/vehicleControllers.js";
import VehicleServices from "../services/vehicleService.js";
import { UserRepository } from "../repositories/userRepo.js";


const vehicleComposer = () =>{
    const vehiclerepository = new UserRepository()
    const vehicleservices = new VehicleServices(vehiclerepository)
    const vehiclecontrollers = new VehicleControllers(vehicleservices)

    return vehiclecontrollers
}

export default vehicleComposer