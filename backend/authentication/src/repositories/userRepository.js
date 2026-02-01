import { BaseRepository } from "./baseRepository.js";
import UserModel from "../models/userModel.js"


export class UserRepository extends BaseRepository{
   async create(user){
      return await  UserModel.create(user)
    }
   async  findOne(email){
      return await UserModel.findOne({email})
    }
    async find(users){
        return await UserModel.find(users)
    }

}