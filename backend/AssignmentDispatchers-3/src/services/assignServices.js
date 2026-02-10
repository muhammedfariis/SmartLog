import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";

class AssignmentServices {
  constructor(UserRepository , vehicleRepository) {
    this.UserRepository = UserRepository;
    this.vehicleRepository = vehicleRepository
  }

  async assignDriversTrip({
    vehicle,
    driver,
    scheduledDate,
    fromLocation,
    toLocation,
    status,
    load,
  }) {
    if (
      !vehicle ||
      !driver ||
      !scheduledDate ||
      !fromLocation ||
      !toLocation ||
      !status ||
      !load
    ) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }

    const vehicleData = await this.vehicleRepository.findById(vehicle);

    if (!vehicleData) {
      throw new ApiError(Status.NOT_FOUND, "Vehicle not found");
    }

    if (vehicleData.status !== "Active") {
      throw new ApiError(Status.BAD_REQUEST, "Vehicle is not active");
    }

    const existing = await this.UserRepository.findOne({ 
      driver , 
      status : {$in : ["assigned" , "in-progress"]}
     });

    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.DRIVER_ALREADY_EXIST);
    }

    const createAssign = await this.UserRepository.create({
      vehicle,
      driver,
      scheduledDate,
      fromLocation,
      toLocation,
      status,
      load,
    });

    if (!createAssign) {
      throw new ApiError(Status.NOT_FOUND, Messege.DELIVERY_NOT_FOUND);
    }

    return {
      Messege: Messege.DELIVERY_ASSIGNED,
      Id: createAssign._id,
      assignation: createAssign,
    };
  }

  async readAssignedDetails() {
    const getassign = await this.UserRepository.findByPopulate();
    if (!getassign) {
      throw new ApiError(Status.NOT_FOUND, Messege.DELIVERY_NOT_FOUND);
    }

    return {
      Messege: Messege.DELIVERY,
      Assignments: getassign,
    };
  }
}

export default AssignmentServices;
