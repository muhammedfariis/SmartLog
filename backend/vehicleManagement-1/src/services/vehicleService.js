import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";
import logger from "../../../log/logger.js";
import vehicles from "../models/vehicle.js";

class VehicleServices {
  constructor(VehicleRepository) {
    this.VehicleRepository = VehicleRepository;
  }

  async createVehicles({
    vehicle,
    NumberPlate,
    brand,
    status,
    CurrentKm,
    Service,
    insurance,
    polution,
  }) 
  
  {
    if (
      !vehicle ||
      !NumberPlate||
      !brand ||
      !status||
      Service == null ||
      !insurance||
      !polution ||
      CurrentKm == null
    ) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VALIDATION_ERROR);
    }

    const existing = await this.VehicleRepository.findOne({ NumberPlate });
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.VEHICLE_ALREADY_FOUND);
    }
    
    const insertvehicle = await this.VehicleRepository.create({
    vehicle,
    NumberPlate,
    brand,
    status,
    CurrentKm,
    Service,
    insurance,
    polution,
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
    vehicle,
    NumberPlate,
    brand,
    status,
    CurrentKm,
    Service,
    insurance,
    polution,
  
  }) {
    const data = {
      id,
    vehicle,
    NumberPlate,
    brand,
    status,
    CurrentKm,
    Service,
    insurance,
    polution,
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


  async addRunningKm(vehicleId , totalKm){
    return this.VehicleRepository.findByIdAndUpdate(
      vehicleId,
      {$inc : {CurrentKm : totalKm}},
      {new : true}
    )
  }

   async searchByRegex(plate){

     if(!plate || plate.trim()===""){
      return{
        message : "empty search",
        vehicles : []
      }
     }

     const search = await this.VehicleRepository.findBySearch(plate)

     return{
      Messege : "search completed and getted",
      count : search.lenght ,
      search,
     }


   }

}

export default VehicleServices;
