import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";
import { passwordHash } from "../../../utils/passHash.js";
class TeamServices {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  // create drivers

  async createDriver({ Name, userName, password, LicenceInfo }) {
    if (!Name || !userName || !password || !LicenceInfo) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }

    const existing = await this.UserRepository.findOne(userName);
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_EXIST);
    }

    const hasingpass = await passwordHash(password);

    const createdrivers = await this.UserRepository.create({
      Name,
      userName,
      password: hasingpass,
      role : "driver" ,
      LicenceInfo,
    });

    if (!createdrivers) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_NOT_CREATED);
    }

    return {
      Messege: Messege.USER_CREATED,
      Id: createdrivers._id,
      driver: createdrivers,
    };
  }

  // create dispatchers

  async createDispatcher({ Name, userName, password  }) {

    
  console.log("DISPATCHER INPUT:", { Name, userName, password});
    if (!Name || !userName || !password ) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }
    const existing = await this.UserRepository.findOne(userName);
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_EXIST);
    }

    const hashingpass = await passwordHash(password);

    const createDisp = await this.UserRepository.create({
      Name,
      userName,
      role : "dispatcher",
      password: hashingpass,
    });

    if (!createDisp) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_NOT_CREATED);
    }

    return {
      Messege: Messege.USER_CREATED,
      Id: createDisp._id,
      dispatcher: createDisp,
    };
  }

  async readDispatcher() {
    const readdisp = await this.UserRepository.find({role : "dispatcher"});
    if (!readdisp) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_FOUND);
    }
    return {
      Messege: Messege.USER_FOUND,
      readdisp,
    };
  }

  async readDriver() {
    const readDriver = await this.UserRepository.find({role : "driver"});
    if (!readDriver) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_FOUND);
    }

    return {
      Messege: Messege.USER_FOUND,
      readDriver,
    };
  }

  async deleteDriver({ id }) {
    if (!id) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }

    const deletedDriver = await this.UserRepository.findByIdAndDelete(id);
    if (!deletedDriver) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_DELETED);
    }

    return {
      Messege: Messege.USER_DELETED,
      deletedDriver,
    };
  }

  async deleteDispatcher({ id }) {
    if (!id) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }

    const deleteDisp = await this.UserRepository.findByIdAndDelete(id);
    if (!deleteDisp) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_NOT_DELETED);
    }

    return {
      Messege: Messege.USER_DELETED,
      deleteDisp,
    };
  }

  async blockDispatcher({id , status}){
     if (!id || !status ) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }
     if (!["blocked", "un-blocked"].includes(status)) {
    throw new ApiError(Status.BAD_REQUEST, "Invalid status");
  }

    const blockUser = await this.UserRepository.findAndBlock(id , status)
    console.log("Blocked User",blockUser); 
       

    return{
      Message : Messege.ACCESS_DENIED,
      blockUser
    }
  }

}

export default TeamServices;
