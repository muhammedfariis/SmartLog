import Buttons from "./button";
import {SquareArrowOutUpRight} from "lucide-react"


const ModuleCard = ({ title, icon, desc, features, badge }) => (
  <div className="group bg-zinc-900/40 border border-zinc-800 p-8 rounded-4xl hover:border-violet-500 transition-all duration-500 backdrop-blur-sm">
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
    <Buttons name="GetReady" Icon={SquareArrowOutUpRight} className="" />
  </div>
);

export default ModuleCard