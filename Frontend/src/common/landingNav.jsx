import { Link } from "react-router-dom";
import Buttons from "./button";
import { LogIn } from "lucide-react";
import Switch from "./toggle";

const LandingNav = () => {
  const navLinks = [
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Terms & Conditions", to: "/terms" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-8 py-3 border-b-2 border-gray-800 shadow-md bg-black/90 backdrop-blur-md">
      
      <div className="flex items-center -my-2 gap-3">
        <img
          src="/images/logosmartlog-removebg-preview.png"
          alt="Logo"
          className="h-20 w-20 object-contain"
        />
        <span className="text-4xl font-bold bg-linear-to-r from-yellow-300/5 via-yellow-500 to-yellow-600/5 bg-clip-text text-transparent animate-gradient-x">
          SMARTLOG
        </span>
      </div>

      <div className="hidden lg:flex gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="flex items-center justify-center rounded-xl px-4 py-2 bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-violet-600 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <Switch />
        <Buttons name="GetReady" Icon={LogIn} />
      </div>
    </nav>
  );
};

export default LandingNav;
