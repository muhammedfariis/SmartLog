
import {ApiError} from "../../../Errors/Error.js"
import {Messege , Status} from "../../../constants/httpResponse.js"

class DriverServices {
    constructor(vehicleRepo , DriverRepo){
        this.vehicleRepo = vehicleRepo
        this.DriverRepo = DriverRepo
    }

   async updateKm({ vehicleId,assignmentId , startKm , endKm}){

      if(!assignmentId || startKm == null || endKm == null || !vehicleId){
        throw new ApiError(Status.CONFLICT , Messege.VALIDATION_ERROR)
      }
      
      if(endKm<=startKm){
        throw new ApiError(Status.BAD_REQUEST , "km is less than when you started")
      }

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

