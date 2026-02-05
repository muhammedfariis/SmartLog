import Users from "../models/users";
import { BaseRepository } from "./baserepo";

export class UserRepository extends BaseRepository {

   findOne(email){
    return Users.findOne(email)
   }

   find(query){
    return Users.find(query)
   }

   findByIdAndDelete(id){
    return Users.findByIdAndDelete(id)
   }
   
   create(data) {
    return Users.create(data)
   }


}


