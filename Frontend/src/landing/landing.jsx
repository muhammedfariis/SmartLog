import Buttons from "../common/button";
import LandingNav from "../common/landingNav";
import FadeSection from "../common/framer";
import Footer from "../common/footer";
import SpaceBackground from "../common/stardust";
import { UserCircle2, TruckIcon, PackageCheck, ArrowBigRight, SquareArrowOutUpRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import FleetAnimation from "../common/fleetanimation";

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <SpaceBackground />
      <LandingNav />

      {/* --- HERO SECTION --- */}
      <FadeSection>
        <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 px-6 py-2 rounded-full border border-violet-500/50 bg-violet-500/10 text-violet-300 text-sm font-bold tracking-widest uppercase animate-pulse"
          >
            🚀 SmartLog Fleet Platform v1.0
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight max-w-6xl">
            Control Your <span className="text-violet-500">Fleet.</span> <br />
            Scale Your <span className="text-orange-500">Impact.</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            Manage vehicles, drivers, and trip logs from a single high-performance dashboard. 
            The bridge between logistics complexity and operational simplicity.
          </p>

          <div className="mt-10 flex gap-4">
            <Buttons name="Get Started" Icon={ArrowBigRight} className="bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20" />
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm px-4">
                <Zap size={16} className="text-orange-500" /> Live Tracking Ready
            </div>
          </div>

          {/* VEHICLE WIPE ANIMATION */}
          <div className="w-full mt-20">
            <FleetAnimation />
          </div>
        </section>
      </FadeSection>

      {/* --- ANALYTICS SECTION --- */}
      <FadeSection>
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-violet-500/30 shadow-2xl shadow-violet-500/10">
            <video className="w-full h-[600px] object-cover opacity-60" loop autoPlay muted>
              <source src="/videos/analytics.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-10 left-10 right-10 p-8 backdrop-blur-md bg-zinc-900/60 border border-white/10 rounded-3xl">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Zap className="text-orange-500" /> Real-Time Analytics
              </h2>
              <p className="mt-4 text-gray-300 leading-relaxed max-w-4xl text-sm md:text-base">
                Monitor driver activity and fuel efficiency from a single unified dashboard. 
                Analyze operational trends, compare vehicle efficiency, and identify 
                under-performing assets quickly.
              </p>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* --- CORE MODULES --- */}
      <section className="py-20 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Core Modules</h2>
            <div className="h-1 w-20 bg-violet-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Driver Card */}
            <ModuleCard 
              title="Driver Portal" 
              badge="Worker Node" 
              icon={<TruckIcon color="black" />} 
              desc="Optimized for trip execution. Drivers update status, log mileage, and report issues in real-time."
              features={["Assigned Trips", "Mileage Logs", "Issue Reporting"]}
            />
            {/* Dispatcher Card */}
            <ModuleCard 
              title="Dispatch Panel" 
              badge="Command Center" 
              icon={<PackageCheck color="black" />} 
              desc="Bridge the gap between orders and delivery. High-speed trip scheduling and route adjustment."
              features={["Driver Assignment", "Live Monitoring", "Route Control"]}
            />
            {/* Admin Card */}
            <ModuleCard 
              title="Admin Console" 
              badge="Root Access" 
              icon={<UserCircle2 color="black" />} 
              desc="Total system control. Manage users, roles, and global fleet master data with advanced audit logs."
              features={["User RBAC", "Fleet Master Data", "Global Analytics"]}
            />
          </div>
        </div>
      </section>

      {/* --- SECURITY --- */}
      <FadeSection>
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center bg-zinc-900/40 rounded-[3rem] p-10 border border-zinc-800">
            <div className="space-y-6">
              <div className="p-3 bg-green-500/10 border border-green-500/30 w-fit rounded-2xl text-green-500">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-4xl font-bold text-white">Enterprise Security</h2>
              <p className="text-gray-400 leading-relaxed">
                Secure driver records and vehicle details with industry-standard encryption. 
                Role-based permissions ensure that only authorized personnel can touch 
                critical infrastructure.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-violet-500/20">
              <video className="w-full opacity-80" loop autoPlay muted>
                <source src="/videos/security.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </FadeSection>

      <Footer />
    </div>
  );
};

// Reusable Sub-component for Module Cards
const ModuleCard = ({ title, icon, desc, features, badge }) => (
  <div className="group bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:border-violet-500 transition-all duration-500 backdrop-blur-sm">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-orange-400 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{badge}</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-8">{desc}</p>
    <ul className="space-y-3 mb-8">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-medium hover:text-violet-400 transition-colors">
          <div className="h-1.5 w-1.5 rounded-full bg-violet-500" /> {f}
        </li>
      ))}
    </ul>
    <Buttons name="GetReady" Icon={SquareArrowOutUpRight} className="w-full justify-center" />
  </div>
);

export default LandingPage;