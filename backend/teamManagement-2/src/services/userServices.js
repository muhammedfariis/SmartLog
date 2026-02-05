import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";
import { passwordHash } from "../../../utils/passHash.js";
class TeamServices {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  // create drivers

  async createDriver({ Name, UserName, Password,role, LicenceInfo }) {
    if (!Name || !UserName || !Password ||!role|| !LicenceInfo) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }

    const existing = await this.UserRepository.findOne(UserName);
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_EXIST);
    }

    const hasingpass = await passwordHash(Password);

    const createdrivers = await this.UserRepository.create({
      Name,
      UserName,
      Password: hasingpass,
      role ,
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

  async createDispatcher({ Name, UserName, Password , role }) {
    if (!Name || !UserName || !Password || !role) {
      throw new ApiError(Status.CONFLICT, Messege.VALIDATION_ERROR);
    }
    const existing = await this.UserRepository.findOne(UserName);
    if (existing) {
      throw new ApiError(Status.BAD_REQUEST, Messege.USER_EXIST);
    }

    const hashingpass = await passwordHash(Password);

    const createDisp = await this.UserRepository.create({
      Name,
      UserName,
      role,
      Password: hashingpass,
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
    const readdisp = await this.UserRepository.find();
    if (!readdisp) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_FOUND);
    }
    return {
      Messege: Messege.USER_FOUND,
      readdisp,
    };
  }

  async readDriver() {
    const readDriver = await this.UserRepository.find();
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
}

export default TeamServices;
