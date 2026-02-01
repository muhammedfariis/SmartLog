import Buttons from "../common/button";
import { ArrowBigRight } from "lucide-react";
import LandingNav from "../common/landingNav";
const LandingPage = () => {
  return (
    <>
      <LandingNav />
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

      {/* section 2 data analytics */}
      <section className="min-h-screen gap-10">
        <div className="relative w-full inline-flex">
          <video
            className="object-cover rounded-2xl w-full h-full  transition-all duration-300 ease-in-out"
            loop
            autoPlay
            muted
          >
            <source src="/videos/analytics.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-2 right-2 flex justify-center flex-col bg-black h-65 opacity-80 p-3 rounded-lg text-white max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Real-Time Analytics</h1>
            <p className="text-md">
              Stay on top of your fleet's performance with powerful, real-time
              analytics tools. Monitor driver activity, vehicle maintenance
              schedules, and fuel efficiency from a single unified dashboard.
              Get clear visibility into weekly mileage reports, trip history,
              and route performance without switching between systems. Analyze
              operational trends, compare vehicle efficiency, and identify
              delays or under-performing assets quickly. Track recent driver
              activity, duty hours, and behavior insights to improve safety and
              accountability. Interactive reports and visual summaries help you
              make faster, data-driven decisions, reduce operational costs, and
              continuously optimize fleet performance as your operations grow.
            </p>
          </div>
        </div>
      </section>
      {/* security */}
      <section className="min-h-screen">
        <div className="relative w-full inline-flex">
          <video
            className="object-cover rounded-2xl   w-full h-full transition-all duration-300 ease-in-out"
            loop
            autoPlay
            muted
          >
            <source src="/videos/security.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-2 right-2 opacity-80 bg-black h-50 flex  justify-center flex-col p-3 rounded-lg text-white max-w-4xl ">
            <h1 className="text-2xl font-bold mb-2">
              {" "}
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
    </>
  );
};

export default LandingPage;
