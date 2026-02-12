import { Link, useNavigate } from "react-router-dom";
import { User2Icon, LogOut, SunMoonIcon } from "lucide-react";
import Switch from "../../common/toggle";
import { useEffect, useState } from "react";
import API from "../../Api/api";
const AdminNavbar = () => {
  const go = useNavigate();
    
   const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      go("/login");
    } else {
      setUser(storedUser); 
    }
  }, [go]);

  if (!user) return null;

  return (
    <div className="fixed left-0 top-0 z-20 w-56 min-h-screen bg-black/70 backdrop-blur-md border-r border-violet-500">
      <div className="flex min-h-screen pb-5 flex-col justify-between items-center">
        <div className="flex flex-col items-center w-40 h-20">
          <img src="/images/logosmartlog-removebg-preview.png" alt="" />
          <h1 className="text-white">ADMIN PANEL</h1>
        </div>

        <div className="flex flex-col gap-6 p-5 text-white items-center">
          <Link
            to="/admin/vehicles"
            className="w-36 h-11 flex items-center justify-center rounded-xl
              bg-white/5 border border-white/10
              transition-all duration-300
              hover:bg-violet-600 hover:border-violet-400
              hover:text-white hover:shadow-lg hover:shadow-violet-500/30
              hover:-translate-y-0.5"
          >
            Vehicles
          </Link>

          <Link
            to="/admin/team"
            className="w-36 h-11 flex items-center justify-center rounded-xl
                bg-white/5 border border-white/10
                transition-all duration-300
                hover:bg-violet-600 hover:border-violet-400
                hover:text-white hover:shadow-lg hover:shadow-violet-500/30
                hover:-translate-y-0.5"
          >
            Team
          </Link>

          <Link
            to="/admin/dashboard"
            className="w-36 h-11 flex items-center justify-center rounded-xl
            bg-white/5 border border-white/10
            transition-all duration-300
            hover:bg-violet-600 hover:border-violet-400
            hover:text-white hover:shadow-lg hover:shadow-violet-500/30
            hover:-translate-y-0.5"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-center w-20 h-8">
          <Switch />
        </div>
           <div className="
  w-44 p-5 flex flex-col items-center rounded-2xl
  bg-white/10 border border-white/20
  transition-all duration-300
  hover:bg-violet-500 hover:border-violet-400
  hover:shadow-lg hover:shadow-violet-500/40
  hover:-translate-y-0.5
  backdrop-blur-md
">
  {/* Icon + Text */}
  <div className="flex items-center gap-3 mb-4">
    <div className="
      w-12 h-12 flex items-center justify-center rounded-full
      bg-white/10 border border-white/20
      transition-all duration-300
      hover:bg-violet-600 hover:border-violet-400
      hover:shadow-lg hover:shadow-violet-500/40
      hover:-translate-y-0.5
    ">
      <User2Icon size={24} className="text-white" />
    </div>

    <div className="flex flex-col justify-center">
      <h1 className="text-white font-semibold text-sm">Administrator</h1>
      <p className="text-gray-300 text-xs">{user.userName}</p>
         
      
    </div>
  </div>

  
  <button
    onClick={() => go("/login")}
    className="
      group flex items-center rounded-full h-10 w-10
      bg-black/40 text-white backdrop-blur-sm
      hover:w-28 transition-all duration-300 overflow-hidden px-3
      border border-white/20 shadow-sm shadow-black/20
    "
  >
    <LogOut
      size={20}
      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    />
    <span className="ml-3 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      Logout
    </span>
  </button>
</div>

        
      </div>
    </div>
  );
};

export default AdminNavbar;
