import { BaseRepository } from "./baseRepository.js";
import UserModel from "../models/userModel.js"


export class UserRepository extends BaseRepository{
   async create(user){
      return await  UserModel.create(user)
    }
   async  findOne(userName){
      return await UserModel.findOne({userName})
    }
    async find(users){
        return await UserModel.find(users)
    }
    async findByAdmin(admin){
      return await UserModel.findOne({role : "admin"})
    }

}