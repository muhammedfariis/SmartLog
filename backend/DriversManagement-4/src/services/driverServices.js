
import {ApiError} from "../../../Errors/Error.js"
import {Messege , Status} from "../../../constants/httpResponse.js"

class DriverServices {
    constructor( DriverRepo ,vehicleRepo , assignmentRepo){
        this.vehicleRepo = vehicleRepo
        this.DriverRepo = DriverRepo
        this.assignmentRepo = assignmentRepo
    }

   async updateKm({assignmentId , startKm , endKm}){

      if(!assignmentId || startKm == null || endKm == null){
        throw new ApiError(Status.CONFLICT , Messege.VALIDATION_ERROR)
      }
      
      if(endKm<=startKm){
        throw new ApiError(Status.BAD_REQUEST , "km is less than when you started")
      }

      const assignment = await this.assignmentRepo
        .findById(assignmentId)
        .populate("vehicle")

        if (!assignment) {
      throw new ApiError(Status.NOT_FOUND, "Assignment not found")
    }

       
      const vehicleId = assignment.vehicle._id

      const total = endKm - startKm

      const updating = await this.DriverRepo.create({
        vehicleId,
        assignmentId,
        startKm,
        endKm
      })

     if(!updating){
        throw new ApiError(Status.NOT_FOUND , "not created")
     }

     const finding = await this.vehicleRepo.findByIdAndUpdate(
        vehicleId,
        {$inc : {CurrentKm : total}}
     )

     return {
        Messege : "kilometers created" ,
        total,
        updating
     }
       


   }

}

export default DriverServices

