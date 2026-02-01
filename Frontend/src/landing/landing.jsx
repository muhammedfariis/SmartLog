import Buttons from "../common/button"
import {ArrowBigRight} from "lucide-react"
import LandingNav from "../common/landingNav"
const LandingPage = () =>{


   return(
     <>
        <LandingNav/>
       <div className="flex  flex-col gap-5 text-white items-center justify-center min-h-screen">
          <div className="w-fit h-fit pr-2 pl-2 rounded-3xl text-md bg-violet-300 text-violet-800 ">
         <h1>SmartLog Fleet Platform</h1>
            
          </div>
      
        <div>
            <h1 className="text-6xl ">Control Your Fleet. Improve Efficiency. Scale Operations.</h1>
        </div>

         <div>
            <p>Manage vehicles, driver teams, trip logs, maintenance records, and delivery workflows from a single dashboard. Get operational visibility, smarter coordination, and data-driven decisions — with upcoming GPS and live tracking capabilities.</p>
         </div>
         <div>
          <Buttons name= "GetReady" Icon={ArrowBigRight} />
         </div>
          </div>
     </>
   )


}


export default LandingPage