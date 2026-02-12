import {UserRepository as assignmentRepo} from "../repositories/userRepository.js"
import {UserRepository as vehicleRepo} from "../../../vehicleManagement-1/src/repositories/userRepo.js"
import AssignmentServices from "../services/assignServices.js"
import AssignmentControllers from "../controllers/assignController.js"

const assignmentComposers = ()=>{
    const AssignmentRepository = new assignmentRepo()
    const vehicleRepository = new vehicleRepo()
    const AssignmentService = new AssignmentServices(AssignmentRepository , vehicleRepository)
    const AssignmentController = new AssignmentControllers(AssignmentService)

    return AssignmentController
}

export default assignmentComposers