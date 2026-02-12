import { ApiError } from "../../../Errors/Error.js";
import { Messege, Status } from "../../../constants/httpResponse.js";
import logger from "../../../log/logger.js";
import { generateToken } from "../../../utils/jwt.js";
import { passwordHash, comparePassword } from "../../../utils/passHash.js";

class AuthService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async register({ userName, password, role }) {
    const adminexist = await this.UserRepository.findByAdmin()

    if(adminexist && role === "admin"){
      throw new ApiError(Status.BAD_REQUEST , Messege.ADMIN_EXIST)
    }

    const existing = await this.UserRepository.findOne(userName);
    if (existing) {
      throw new ApiError(Status.CONFLICT, Messege.USER_EXIST);
    }

    const passwordhashed = await passwordHash(password);
    if (!passwordhashed) {
      throw new ApiError(400, "Password required");
    }

    const user = await this.UserRepository.create({
      userName,
      password: passwordhashed,
      role,
    });

    if (!user) {
      throw new ApiError(Status.BAD_REQUEST, Messege.INVALID_CREDENTIALS);
    }
    const tokens = generateToken({ _id: user._id, role: user.role });
    return {
      message: Messege.REGISTER_SUCCESS,
      user,
      tokens,
    };
  }

  async login({ userName, password , status }) {
    const user = await this.UserRepository.findOne(userName);
    logger.debug("email found");
    if (!user) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_FOUND);
    }
    const compare = await comparePassword(password, user.password);

    if (!compare) {
      throw new ApiError(Status.UNAUTHORIZED, Messege.INVALID_CREDENTIALS);
    }

    if(user.status === "blocked"){
      throw new ApiError(Status.BAD_REQUEST , Messege.ACCESS_DENIED)
    }

    const tokens = generateToken({ _id: user._id, role: user.role });
    if (!tokens) {
      throw new ApiError(Status.UNAUTHORIZED, Messege.VALIDATION_ERROR);
    }
    return {
      user: user._id,
      user,
      tokens : {
        accessToken : tokens
      }
    };
  }

  async getAllUsers() {
    const getting = await this.UserRepository.find();
    if (!getting) {
      throw new ApiError(Status.NOT_FOUND, Messege.USER_NOT_FOUND);
    }
    return {
      user: getting._id,
      getting,
    };
  }

  async adminExists(){
    const admin = await this.UserRepository.findByAdmin()
    return !!admin
  }
}

export default AuthService;
