import AuthController from "../controllers/authController.js";
import AuthService from "../services/authServices.js";
import { UserRepository } from "../repositories/userRepository.js"; // ✅ NAMED IMPORT

const authComposer = () => {
  const userRepository = new UserRepository();
  const authServices = new AuthService(userRepository);
  const authController = new AuthController(authServices);
  return authController;
};

export default authComposer;
