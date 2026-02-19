import React from "react";
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Activity, 
  Clock, 
  Zap,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import PageMotion from "../common/pagemotion";
import SpaceBackground from "../common/stardust";
import LandingNav from "../common/landingNav";
import Footer from "../common/footer";

const About = () => {
  const coreFeatures = [
    {
      icon: <Truck className="text-violet-400" size={28} />,
      title: "Intelligent Fleet",
      desc: "Real-time management of vehicle health, ranging from heavy containers to nimble vans."
    },
    {
      icon: <Zap className="text-violet-400" size={28} />,
      title: "Live Dispatch",
      desc: "Seamless bridge between dispatchers and drivers with instant trip assignments."
    },
    {
      icon: <ShieldCheck className="text-violet-400" size={28} />,
      title: "Document Vigil",
      desc: "Automated tracking of Pollution and Insurance expiries to ensure 100% compliance."
    },
    {
      icon: <Activity className="text-violet-400" size={28} />,
      title: "Precision Metrics",
      desc: "Rigid KM tracking and starting/ending odometer validation for accurate fleet records."
    }
  ];

  return (
    <PageMotion>
        <LandingNav/>
      <div className="relative min-h-screen text-white pb-20">
        <SpaceBackground />
        
        <section className="relative z-10 pt-20 px-10 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-violet-500/10 border border-violet-500/50 px-4 py-1 rounded-full text-violet-400 text-sm font-medium"
          >
            Logistics Reimagined
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            The Pulse of Your <br />
            <span className="text-violet-500 bg-clip-text">Supply Chain.</span>
          </h1>
          
          <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
            <span className="text-white font-semibold">SmartLog</span> is a high-performance logistics ecosystem 
            designed to synchronize dispatchers, drivers, and vehicles in a single, seamless flow.
          </p>
        </section>

        <section className="relative z-10 mt-24 px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Schedule", "Assign", "Execute", "Analyze"].map((step, idx) => (
              <div key={step} className="flex items-center gap-3 bg-zinc-900/50 border border-violet-500/20 p-4 rounded-2xl">
                <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="font-semibold text-gray-300">{step}</span>
                {idx !== 3 && <ChevronRight className="hidden md:block text-zinc-700" />}
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mt-32 px-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-violet-500/30 backdrop-blur-sm hover:border-violet-500 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-violet-500/10 w-fit rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Role Overview */}
        <section className="relative z-10 mt-32 px-10 max-w-5xl mx-auto">
          <div className="bg-linear-to-b from-zinc-900 to-black border border-violet-500/40 rounded-[3rem] p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-violet-400 font-bold uppercase tracking-widest text-xs">
                  <Users size={16} /> Roles
                </div>
                <h2 className="text-3xl font-bold">Built for the Entire Team</h2>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 shrink-0" />
                    <p className="text-gray-300"><span className="text-white font-medium">Dispatchers:</span> Strategic planning and driver monitoring.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 shrink-0" />
                    <p className="text-gray-300"><span className="text-white font-medium">Drivers:</span> Real-time trip execution and KM verification.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 shrink-0" />
                    <p className="text-gray-300"><span className="text-white font-medium">Admins:</span> Fleet lifecycle management and document safety.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-800/30 rounded-3xl p-6 border border-zinc-700/50 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm  text-violet-400">System Status: Optimal</span>
                  <Clock size={18} className="text-zinc-500" />
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: "94%" }} 
                          transition={{ duration: 2 }}
                          className="h-full bg-violet-500" 
                        />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 uppercase">
                        <span>Fleet Uptime</span>
                        <span>94%</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    
      </div>
      <Footer/>
    </PageMotion>
  );
};

export default About;