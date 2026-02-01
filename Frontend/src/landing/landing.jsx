import Buttons from "../common/button"
import {ArrowBigRight} from "lucide-react"
import LandingNav from "../common/landingNav"
const LandingPage = () =>{


   return(
     <>
        <LandingNav/>
        <section>

       <div className="flex  flex-col gap-5 text-white items-center justify-center min-h-screen">
          <div className="w-fit h-fit pr-2 animate-bounce pl-2 rounded-3xl text-md bg-violet-300 text-violet-900">
         <h1>SmartLog Fleet Platform</h1>
            
          </div>
      
        <div>
            <h1 className="text-8xl text-center">Control Your Fleet. Improve Efficiency. Scale Operations.</h1>
        </div>

         <div>
            <p className="text-2xl text-center max-w-4xl">Manage vehicles, driver teams, trip logs, maintenance records, and delivery workflows from a single dashboard. Get operational visibility, smarter coordination, and data-driven decisions — with upcoming GPS and live tracking capabilities.</p>
         </div>
         <div>
          <Buttons name= "GetReady" Icon={ArrowBigRight} />
         </div>
          </div>
        </section>

{/* section 2 data analytics */}
<section className="min-h-screen">
  <div className="relative left-75 inline-flex">
    <video
      className="object-cover rounded-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
      style={{ width: "900px", height: "500px" }} 
      playsInline
      loop
      autoPlay
      muted
    >
      <source src="/videos/analytics.mp4" type="video/mp4" />
    </video>

    <div className="absolute bottom-2 right-2 bg-black  p-3 rounded-lg text-white max-w-sm">
      <h1 className="text-2xl font-bold mb-1">Real-Time Analytics</h1>
      <p className="text-xs">
        Stay on top of your fleet's performance with our analytics. Track driver activity, vehicle maintenance, fuel efficiency, weekly mileage, and recent trips.
      </p>
    </div>
  </div>
</section>



     </>
   )


}


export default LandingPage


