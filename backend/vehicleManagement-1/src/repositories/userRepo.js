import { BaseRepository } from "./baseRepo.js";
import vehicles from "../models/vehicle.js";

export class UserRepository extends BaseRepository {

  create(data) {
    return vehicles.create(data);
  }

  find(query) {
    return vehicles.find(query);
  }

  findByIdAndUpdate(id, data) {
    return vehicles.findByIdAndUpdate(id, data, { new: true });
  }

  findByIdAndDelete(id) {
    return vehicles.findByIdAndDelete(id);
  }

  findOne(query) {
    return vehicles.findOne(query);
  }
  findBySearch(plate){
    return vehicles.find({
      NumberPlate : {$regex : plate , $options : "i"}
    }).limit(50)
  }



}


