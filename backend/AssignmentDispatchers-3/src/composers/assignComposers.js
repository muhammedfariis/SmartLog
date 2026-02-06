import {UserRepository} from "../repositories/userRepository.js"
import AssignmentServices from "../services/assignServices.js"
import AssignmentControllers from "../controllers/assignController.js"

const assignmentComposers = ()=>{
    const AssignmentRepository = new UserRepository()
    const AssignmentService = new AssignmentServices(AssignmentRepository)
    const AssignmentController = new AssignmentControllers(AssignmentService)

    return AssignmentController
}

export default assignmentComposers