import { BaseRepository } from "./baserepo.js";
import driver from "../models/driver.js";

export class UserRepository extends BaseRepository {
    find(user){
        return driver.find(user)
    }

    findById(one){
        return driver.findById(one)
    }

    findByIdAndUpdate(id ,data){
        return driver.findByIdAndUpdate(id , data , {new : true})
    }

    create(data){
        return driver.create(data)
    }
}
