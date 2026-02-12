import { Link } from "react-router-dom";
import { Mail, Github, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-lg border-t border-violet-500/30 text-gray-400 py-12 mt-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-violet-600 blur-[80px] opacity-50" />

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
        <div className="flex flex-col space-y-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-fit"
          >
            <img
              className="w-44 h-auto drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
              src="/images/logosmartlog-removebg-preview.png"
              alt="SmartLog Logo"
            />
          </motion.div>
          <p className="text-sm leading-relaxed max-w-xs">
            Next-gen logistics management system. 
            Optimizing fleet efficiency with zero-latency dispatching.
          </p>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} SmartLog Fleet Management System
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-tighter mb-2">Platform</h4>
            {[
              { name: "Services", path: "/services" },
              { name: "GetReady", path: "/register" },
              { name: "FaQ", path: "/faq" }
            ].map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="hover:text-violet-400 transition-colors duration-300 text-sm flex items-center group"
              >
                {link.name}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-tighter mb-2">Support</h4>
            <Link to="/" className="hover:text-violet-400 transition-colors duration-300 text-sm">
               Home
            </Link>
            <Link to="/contact" className="hover:text-violet-400 transition-colors duration-300 text-sm">
              Contact Center
            </Link>
            <Link to="/terms" className="hover:text-violet-400 transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
               <Link to="/about" className="hover:text-violet-400 transition-colors duration-300 text-sm">
               About Services
            </Link>
            
          </div>
        </div>

        <div className="flex flex-col space-y-6 md:items-end">
          <div className="space-y-2 md:text-right">
            <div className="flex items-center md:justify-end gap-2 text-white">
              <Mail size={18} className="text-violet-500" />
              <span className="font-medium">muhammedfariis101@gmail.com</span>
            </div>
            <p className="text-xs text-zinc-500 font-mono italic">
              Available for system integrations & consultations.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800 w-full md:w-auto md:text-right">
            <p className="text-sm text-gray-500">
              Developed by <span className="text-violet-400 font-semibold tracking-wide">Muhammed Faris</span>
            </p>
            <div className="flex gap-4 mt-3 md:justify-end">
              <a href="https://github.com/muhammedfariis"
                 target="_blank"
              
              >
               <Github size={20} className="hover:text-white cursor-pointer transition-colors" />
              </a>
                <a href="https://muhammedfarisportfolio.netlify.app"
                 target="_blank"
                >
               <Globe size={20} className="hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;