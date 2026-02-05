
import { UserRepository } from "../repositories/userrepo";
import TeamServices from "../services/userServices";
import Teamcontrollers from "../controllers/usersControllers";

const teamComposers = ()=>{
   
 const TeamUserRepo = new UserRepository()
 const TeamService = new TeamServices(TeamUserRepo)
 const Teamcontroller = new Teamcontrollers(TeamService)

 return Teamcontroller

}


export default teamComposers