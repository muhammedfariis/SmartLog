import { UserRepository as DriverRepository } from "../repositories/userRepo.js";
import DriverController from "../controllers/driverControllers.js";
import DriverServices from "../services/driverServices.js";

import { UserRepository as VehicleRepository } 
from "../../../vehicleManagement-1/src/repositories/userRepo.js";

import { UserRepository as AssignmentRepository } 
from "../../../AssignmentDispatchers-3/src/repositories/userRepository.js";

const driverComposer = () => {

    const driverRepo = new DriverRepository();
    const vehicleRepo = new VehicleRepository();
    const assignmentRepo = new AssignmentRepository();   

    const driverService = new DriverServices(
        driverRepo,
        vehicleRepo,
        assignmentRepo   
    );

    const driverController = new DriverController(driverService);

    return driverController;
};

export default driverComposer;
