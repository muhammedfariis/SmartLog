import Buttons from "../common/button";
import LandingNav from "../common/landingNav";
import FadeSection from "../common/framer";
import Footer from "../common/footer";
import {UserCircle2 , TruckIcon , PackageCheck , ArrowBigRight , SquareArrowOutUpRight} from "lucide-react"
const LandingPage = () => {
  return (
    <>
      <LandingNav />
   <FadeSection>
      <section>
        <div className="flex  flex-col gap-5 text-white items-center justify-center min-h-screen">
          <div className="w-fit h-fit pr-2 animate-bounce pl-2 rounded-3xl text-md bg-violet-300 text-violet-900">
            <h1>SmartLog Fleet Platform</h1>
          </div>

          <div>
            <h1 className="text-8xl text-center">
              Control Your Fleet. Improve Efficiency. Scale Operations.
            </h1>
          </div>

          <div>
            <p className="text-2xl text-center max-w-4xl">
              Manage vehicles, driver teams, trip logs, maintenance records, and
              delivery workflows from a single dashboard. Get operational
              visibility, smarter coordination, and data-driven decisions — with
              upcoming GPS and live tracking capabilities.
            </p>
          </div>
          <div>
            <Buttons name="GetReady" Icon={ArrowBigRight} />
          </div>
        </div>
      </section>
       </FadeSection>
      {/* section 2 data analytics */}
      <FadeSection>
      <section className="min-h-screen p-5 gap-10">
        <div className="relative w-full inline-flex ">
          <video
            className="object-cover rounded-t-4xl border-t-2 border-l-2 border-r-2 border-amber-500 w-full h-full  transition-all duration-300 ease-in-out"
            loop
            autoPlay
            muted
          >
            <source src="/videos/analytics.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-2 right-2 flex justify-center flex-col bg-linear-to-br from-10% from-violet-500 h-65 opacity-85 p-3 rounded-lg text-white max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Real-Time Analytics</h1>
            <p className="text-md">
              Stay on top of your fleet's performance with powerful, real-time
              analytics tools. Monitor driver activity, vehicle maintenance
              schedules, and fuel efficiency from a single unified dashboard.
              Get clear visibility into weekly mileage reports, trip history,
              and route performance without switching between systems. Analyze
              operational trends, compare vehicle efficiency, and identify
              delays or under-performing assets quickly. Track recent driver
              activity insights to improve safety and accountability.
              Interactive reports and visual summaries help you make faster,
              data-driven decisions, reduce operational costs, and continuously
              optimize fleet performance as your operations grow.
            </p>
          </div>
        </div>
      </section>
      </FadeSection>
      {/* coremodules */}
       <FadeSection>
      <section className="p-5">
        <div className="flex min-h-screen justify-center items-center border-l-2 border-r-2  border-amber-400 ">
          <div className="flex  flex-col  gap-20 justify-center items-center text-white">
            <h1 className="text-center font-bold text-6xl">Core Modules</h1>
            <div className="flex gap-2">
              {/* first */}
              <div className="flex flex-col items-center justify-center gap-5 text-white border-2 border-violet-700 rounded-4xl p-2">
                <div className="h-12 pl-3 pr-3 w-fit text-3xl rounded-2xl bg-orange-400 animate-bounce">
                  <h1 className="flex justify-center items-center "> <TruckIcon className="pt-1" size={40} color="black"/> Driver Workspace Module</h1>
                </div>
                <div className="flex flex-col justify-center items-center max-w-md text-center">
                  <h1 className="text-2xl">Driver Portal</h1>
                  <p>
                    The Driver workspace is focused on trip execution and
                    activity reporting. Drivers can view assigned trips, update
                    trip status, log mileage, and submit vehicle condition
                    reports. The interface is simplified for quick updates and
                    mobile-friendly usage. Drivers can also view recent
                    assignments, delivery instructions, and performance
                    summaries, ensuring smooth day-to-day operations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-white justify-center items-center h-fit w-full  bg-linear-to-br from-10% from-violet-500  p-5 rounded-2xl">
                  <h1 className="text-3xl font-bold">Core Driver Features</h1>
                  <ul className="list-disc px-5 hover:scale-100 flex flex-col text-lg ">
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      View assigned trips
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Update trip status
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Submit mileage logs
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Report vehicle issues
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      View recent activity history
                    </li>
                  </ul>
                  <Buttons name= "GetReady" Icon={SquareArrowOutUpRight}/>

                </div>
              </div>

              {/* second */}

              <div className="flex flex-col items-center justify-center gap-5 text-white border-2 border-violet-700 rounded-4xl p-2">
                <div className="h-12 pl-3 pr-3 w-fit text-3xl rounded-2xl bg-orange-400 animate-bounce">
                  <h1 className="flex justify-center items-center"> <PackageCheck className="pt-1" size={40} color="black"/> Dispatcher Workspace Module</h1>
                </div>
                <div className="flex flex-col justify-center items-center max-w-md text-center">
                  <h1 className="text-2xl">Dispatcher Control Panel</h1>
                  <p>
                    The Dispatcher workspace is built for operational
                    coordination and trip management. Dispatchers can assign
                    vehicles and drivers, schedule deliveries, adjust routes,
                    and monitor trip progress. This module provides a live
                    operational overview to balance workload and improve
                    delivery timelines. It enables faster decisions and better
                    coordination between drivers and fleet resources.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-white justify-center items-center h-fit w-full  bg-linear-to-br from-10% from-violet-500  p-5 rounded-2xl">
                  <h1 className="text-3xl font-bold">
                    Core Dispatcher Features
                  </h1>
                  <ul className="list-disc px-5 hover:scale-100 flex flex-col text-lg ">
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Assign drivers & vehicles
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Schedule and manage trips
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      Monitor trip progress
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Adjust routes and priorities
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      View driver availability
                    </li>
                  </ul>
                  <Buttons name= "GetReady" Icon={SquareArrowOutUpRight}/>
                </div>
              </div>

              {/* third */}

              <div className="flex flex-col items-center justify-center gap-5 text-white border-2 border-violet-700 rounded-4xl p-2">
                <div className="h-12 pl-3 pr-3 w-fit text-3xl rounded-2xl bg-orange-400 animate-bounce">
                  <h1 className="flex justify-center items-center"><UserCircle2 className="pt-1" size={40} color="black"/> Admin Workspace Module</h1>
                </div>
                <div className="flex flex-col justify-center items-center max-w-md text-center">
                  <h1 className="text-2xl">Administrator Console</h1>
                  <p>
                    The Admin workspace provides full system control and
                    configuration capabilities across the entire platform.
                    Administrators can manage users, vehicles, operational
                    settings, and access permissions from a centralized control
                    panel. They have complete visibility into fleet activity,
                    performance metrics, and system reports.Advanced audit
                    tracking and configuration tools
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-white justify-center items-center h-fit w-full  bg-linear-to-br from-10% from-violet-500  p-5 rounded-2xl">
                  <h1 className="text-3xl font-bold">Core Admin Features</h1>
                  <ul className="list-disc px-5 hover:scale-100 flex flex-col text-lg ">
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Manage users & roles
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Configure permissions
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Full fleet visibility
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      System-wide analytics
                    </li>
                    <li className=" hover:scale-110 transition-all duration-500 ease-in-out">
                      {" "}
                      Vehicle master data control
                    </li>
                  </ul>
                  <Buttons name= "GetReady" Icon={SquareArrowOutUpRight}/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </FadeSection>
      {/* security */}
    <FadeSection>
      <section className="min-h-screen p-5">
        <div className="relative w-full inline-flex">
          <video
            className="object-cover rounded-b-4xl border-r-2 border-l-2 border-b-2  border-amber-500 w-full h-full "
            loop
            autoPlay
            muted
          >
            <source src="/videos/security.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-2 right-2 opacity-85 bg-linear-to-br from-10% from-violet-500  h-50 flex  justify-center flex-col p-3 rounded-lg text-white max-w-4xl ">
            <h1 className="text-2xl font-bold mb-2">
              Enterprise-Grade Security
            </h1>
            <p className="text-md">
              Protect your fleet data with advanced security built into every
              layer of the platform. Secure driver records, vehicle details, and
              operational reports with encrypted storage and controlled access.
              Role-based permissions and activity logs ensure only authorized
              users can view or modify critical information, keeping your
              logistics operations safe and trustworthy.”
            </p>
          </div>
        </div>
      </section>
      </FadeSection>
      <Footer/>
    </>
  );
};

export default LandingPage;
