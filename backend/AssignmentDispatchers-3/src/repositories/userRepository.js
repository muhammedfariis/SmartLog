import Assignment from "../models/assignment.js";
import { BaseRepository } from "./baseRepository.js";

export class UserRepository extends BaseRepository{

  find(query = {}){
    return Assignment.find(query)
  }

  findOne(unique){
    return Assignment.findOne(unique)
  }

  create(user){
    return Assignment.create(user)
  }

  findById(id){
    return Assignment.findById(id)
  }

  findByPopulate(){
    return Assignment.find()
    .populate("vehicle")
    .populate("driver")
  }

  findByIdAndUpdate(id){
    return Assignment.findByIdAndUpdate(id)
  }



}

