import { BaseRepository } from "./baserepo";
import driver from "../models/driver";

export class UserRepository extends BaseRepository {
    find(user){
        return driver.find(user)
    }

    findOne(one){
        return driver.findOne(one)
    }

    create(creat){
        return driver.create(creat)
    }
}
