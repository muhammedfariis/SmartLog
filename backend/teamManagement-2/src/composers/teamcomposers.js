
import { UserRepository } from "../repositories/userrepo.js";
import TeamServices from "../services/userServices.js";
import Teamcontrollers from "../controllers/usersControllers.js";

const teamComposers = ()=>{
   
 const TeamUserRepo = new UserRepository()
 const TeamService = new TeamServices(TeamUserRepo)
 const Teamcontroller = new Teamcontrollers(TeamService)

 return Teamcontroller

}


export default teamComposers