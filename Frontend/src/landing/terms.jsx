import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  FileText, 
  Scale, 
  Lock, 
  Globe, 
  AlertCircle,

} from "lucide-react";
import PageMotion from "../common/pagemotion";
import SpaceBackground from "../common/stardust";

const Terms = () => {
  const protocols = [
    {
      icon: <Globe className="text-violet-400" />,
      title: "01. Service Access",
      content: "SmartLog provides a cloud-based fleet management interface. Users are responsible for maintaining the security of their operator credentials and all activities performed under their command center."
    },
    {
      icon: <Scale className="text-violet-400" />,
      title: "02. Operational Usage",
      content: "The platform must be used solely for legitimate logistics and fleet coordination. Any attempt to reverse-engineer the dispatch logic or bypass system security protocols will result in immediate termination."
    },
    {
      icon: <Lock className="text-violet-400" />,
      title: "03. Data Integrity",
      content: "While SmartLog encrypts fleet data, operators are responsible for the accuracy of trip logs and driver records submitted to the system. We ensure 99.9% uptime for mission-critical operations."
    },
    {
      icon: <ShieldAlert className="text-violet-400" />,
      title: "04. Liability Limits",
      content: "SmartLog is a coordination tool. We are not liable for physical road incidents, hardware failures of vehicles, or delays caused by external environmental factors."
    }
  ];

  return (
    <PageMotion>
      <div className="relative min-h-screen text-white pb-20 pt-28 px-6">
        <SpaceBackground />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono mb-6"
          >
            <FileText size={14} />
            LEGAL PROTOCOL v2.0.26
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
            Terms of <span className="text-violet-500">Service.</span>
          </h1>
          <p className="text-gray-400 mt-6 text-sm  uppercase tracking-widest">
            Last Updated: February 2026 
          </p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid gap-6">
            {protocols.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-4xl bg-zinc-900/30 border border-zinc-800 hover:border-violet-500/40 transition-all backdrop-blur-md"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="p-4 bg-violet-500/10 h-fit w-fit rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 tracking-tight">{item.title}</h2>
                    <p className="text-gray-400 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/20 flex flex-col md:flex-row items-center gap-6"
          >
            <AlertCircle size={48} className="text-orange-500 shrink-0" />
            <div className="text-sm text-orange-200/70 ">
              <span className="text-orange-500 font-bold uppercase block mb-1">Critical Note:</span> 
              By initializing the SmartLog command center, you acknowledge that you have read and accepted these protocols. 
              Unauthorized distribution of fleet analytics is strictly prohibited under the Logistics Privacy Act.
            </div>
          </motion.div>

          <div className="text-center mt-20">
            <p className="text-zinc-500 mb-6 text-xs uppercase tracking-widest">
              Need a formal PDF for your legal department?
            </p>
            <button className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-xl shadow-white/5">
              Download Full Documentation
            </button>
          </div>
        </div>
      </div>
    </PageMotion>
  );
};

export default Terms;