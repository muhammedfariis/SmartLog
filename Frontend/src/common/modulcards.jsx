import Buttons from "./button";
import { SquareArrowOutUpRight } from "lucide-react";

const ModuleCard = ({ title, icon, desc, features, badge }) => (
  <div className="group bg-white/80 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 p-8 rounded-[2.5rem] hover:border-violet-500 transition-all duration-500 backdrop-blur-sm shadow-xl shadow-slate-200/50 dark:shadow-none">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-orange-400 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 uppercase tracking-widest">
        {badge}
      </span>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
      {title}
    </h3>

    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
      {desc}
    </p>

    <ul className="space-y-3 mb-8">
      {features.map((f, i) => (
        <li 
          key={i} 
          className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300 font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-violet-500" /> 
          {f}
        </li>
      ))}
    </ul>

    <Buttons 
      name="GetReady" 
      Icon={SquareArrowOutUpRight} 
      className="w-full justify-center bg-violet-600 text-white hover:bg-violet-700 transition-all" 
    />
  </div>
);

export default ModuleCard;