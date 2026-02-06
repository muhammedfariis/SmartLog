import { BaseRepository } from "./baserepo";
import driver from "../models/driver";

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
