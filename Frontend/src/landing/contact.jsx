import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe, 
  ShieldCheck // Added this to fix the crash
} from "lucide-react";
import PageMotion from "../common/pagemotion";
import SpaceBackground from "../common/stardust";
import Footer from "../common/footer";
import LandingNav from "../common/landingNav";

const Contact = () => {
  const [focused, setFocused] = useState(null);

  const contactMethods = [
    {
      icon: <Phone className="text-violet-400" />,
      title: "Direct Line",
      value: "+91 9561166207",
      desc: "Mon-Fri, 9am - 6pm",
    },
    {
      icon: <Mail className="text-violet-400" />,
      title: "Email Support",
      value: "muhammedfariis101@gmail.com",
      desc: "24/7 Ticketing System",
    },
    {
      icon: <MapPin className="text-violet-400" />,
      title: "Headquarters",
      value: "Cyber Gateway, Tech City",
      desc: "Fleet Operations Hub",
    },
  ];

  return (
    <PageMotion>
        <LandingNav/>
      <div className="relative min-h-screen text-white pb-20 pt-28 px-6">
        <SpaceBackground />

        <div className="relative z-10 max-w-7xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            SYSTEMS ONLINE SUPPORT READY
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
            Get in <span className="text-violet-500">Touch.</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-violet-500/50 transition-all backdrop-blur-sm"
              >
                <div className="p-3 bg-violet-500/10 w-fit rounded-2xl mb-4">
                  {method.icon}
                </div>
                <h3 className="text-zinc-400 text-xs  uppercase tracking-widest">{method.title}</h3>
                <p className="text-xl font-bold mt-1">{method.value}</p>
                <p className="text-zinc-400 text-sm mt-2">{method.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-8">
            <motion.div 
              className="bg-zinc-900/30 border border-violet-500/20 p-8 md:p-12 rounded-[3rem] backdrop-blur-md relative overflow-hidden"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className={`text-xs uppercase tracking-widest ${focused === 'name' ? 'text-violet-400' : 'text-zinc-500'}`}> Name</label>
                    <input 
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      type="text" 
                      placeholder="Enter full name"
                      className="w-full bg-black/50 border-b border-zinc-800 focus:border-violet-500 outline-none py-3 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs  uppercase tracking-widest ${focused === 'email' ? 'text-violet-400' : 'text-zinc-500'}`}>Contact Email</label>
                    <input 
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full bg-black/50 border-b border-zinc-800 focus:border-violet-500 outline-none py-3 text-lg transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-xs uppercase tracking-widest ${focused === 'message' ? 'text-violet-400' : 'text-zinc-500'}`}> Message</label>
                  <textarea 
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows="4" 
                    placeholder="Describe your request..."
                    className="w-full bg-black/50 border border-zinc-800 focus:border-violet-500 rounded-3xl p-5 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-violet-600 hover:bg-violet-700 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-violet-500/20"
                >
                  CONNECT
                  <Send size={18} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

      
      </div>
      <Footer/>
    </PageMotion>
  );
};

export default Contact;