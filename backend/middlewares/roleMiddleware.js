// middlewares/roleMiddleware.js
import { ApiError } from "../Errors/Error.js";
import { Status, Messege } from "../constants/httpResponse.js";

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      return next(new ApiError(Status.UNAUTHORIZED, Messege.TOKEN_INVALID));
    }

    console.log("User role:", req.user.role);
    console.log("Allowed roles:", allowedRoles);

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(Status.FORBIDDEN, Messege.ACCESS_DENIED));
    }

    next();
  };
};

export default roleMiddleware;
