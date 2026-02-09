import Auth from "../../../authentication/src/models/userModel.js";
import { BaseRepository } from "./baserepo.js";

export class UserRepository extends BaseRepository {

   findOne(email){
    return Auth.findOne(email)
   }

   find(query){
    return Auth.find(query)
   }

   findByIdAndDelete(id){
    return Auth.findByIdAndDelete(id)
   }
   
   create(data) {
    return Auth.create(data)
   }


}


