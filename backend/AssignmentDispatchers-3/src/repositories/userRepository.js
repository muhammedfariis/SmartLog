import Assignment from "../models/assignment.js";
import { BaseRepository } from "./baseRepository.js";

export class UserRepository extends BaseRepository{

  find(query = {}){
    return Assignment.find(data)
  }

  findOne(unique){
    return Assignment.findOne(unique)
  }

  create(user){
    return Assignment.create(user)
  }

  findByPopulate(){
    return Assignment.find()
    .populate("vehicle")
    .populate("driver")
  }

}

