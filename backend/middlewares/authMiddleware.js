import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../Errors/Error.js";
import { Status, Messege } from "../constants/httpResponse.js";

const authValidation = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(Status.UNAUTHORIZED, Messege.TOKEN_MISSING);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(Status.UNAUTHORIZED, Messege.TOKEN_INVALID);
    }

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};

export default authValidation;
