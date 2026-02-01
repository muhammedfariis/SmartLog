import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";
import logger from "../../../log/logger.js";

class VehicleServices {
  constructor(VehicleRepository) {
    this.VehicleRepository = VehicleRepository;
  }

  async createVehicles({
    vehiclesNo,
    vehiclesType,
    brand,
    year,
    status,
    currentMilage,
    nextServiceMilage,
    insuranceExpiry,
    polutionExpiry,
    addedBy,
  }) {
    if (
      !vehiclesNo ||
      !vehiclesType ||
      !brand ||
      year == null ||
      nextServiceMilage == null ||
      !insuranceExpiry ||
      !polutionExpiry ||
      !addedBy
    ) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VALIDATION_ERROR);
    }

    const existing = await this.VehicleRepository.findOne({ vehiclesNo });
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VEHICLE_ALREADY_FOUND);
    }

    const insertvehicle = await this.VehicleRepository.create({
      vehiclesNo,
      vehiclesType,
      brand,
      year,
      status,
      currentMilage,
      nextServiceMilage,
      insuranceExpiry,
      polutionExpiry,
      addedBy,
    });

    logger.debug("Vehicle insertion completed");

    if (!insertvehicle) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VEHICLE_NOT_CREATED);
    }

    return {
      message: Messege.VEHICLE_CREATED,
      id: insertvehicle._id,
      vehicle: insertvehicle,
    };
  }

  // upadation

  async updateVehicles({
    id,
    vehiclesType,
    brand,
    year,
    status,
    currentMilage,
    nextServiceMilage,
    insuranceExpiry,
    polutionExpiry,
    isActive,
  }) {
    const data = {
      id,
      vehiclesType,
      brand,
      year,
      status,
      currentMilage,
      nextServiceMilage,
      insuranceExpiry,
      polutionExpiry,
      isActive,
    };

    const updatevehicle = await this.VehicleRepository.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    if (!updatevehicle) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VEHICLE_NOT_UPDATED);
    }

    return {
      message: Messege.VEHICLE_UPDATED,
      id: updatevehicle._id,
      vehicle: updatevehicle,
    };
  }

  async deleteVehicles({ id }) {
    if (!id) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VALIDATION_ERROR);
    }

    const deletevehicle = await this.VehicleRepository.findByIdAndDelete(id);

    if (!deletevehicle) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VEHICLE_NOT_DELETED);
    }

    return {
      message: Messege.VEHICLE_DELETED,
      deletedVehicle: deletevehicle,
    };
  }

  async readVehicles() {
    const vehicles = await this.VehicleRepository.find();

    if (!vehicles) {
      throw new ApiError(Status.NOT_FOUND, Messege.VEHICLE_NOT_FOUND);
    }

    return {
      message: Messege.VEHICLE_FOUND,
      vehicles,
    };
  }
}

export default VehicleServices;
