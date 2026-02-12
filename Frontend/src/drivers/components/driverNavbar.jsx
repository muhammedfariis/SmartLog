import { Link, useNavigate } from "react-router-dom";
import { User2Icon, LogOut, Menu, X } from "lucide-react";
import Switch from "../../common/toggle";
import { useState, useEffect } from "react";

const DriverNavbar = () => {
  const go = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) go("/login");
    else setUser(storedUser);
  }, [go]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    go("/login");
  };

  if (!user) return null;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/95 backdrop-blur-md border-b border-violet-500/50">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <img
            src="/images/logosmartlog-removebg-preview.png"
            alt="Logo"
            className="h-10 sm:h-15 w-auto"
          />
          <span className="text-white font-bold text-sm sm:text-base tracking-tight uppercase">
            Driver Dashboard
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/drivers/trips"
            className="text-white px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-all text-sm font-medium"
          >
            My Trips
          </Link>
          
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <Switch />
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
              <div className="flex flex-col items-end">
                <span className="text-white font-semibold text-xs">{user.userName}</span>
                <span className="text-gray-400 text-[10px] ">DRIVER</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle + Switch */}
        <div className="flex md:hidden items-center gap-3">
          <Switch />
          <button
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 border-b border-violet-500 ${
          menuOpen ? "max-h-400 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          <Link
            to="/drivers/trips"
            className="w-full text-center text-white py-3 rounded-xl bg-violet-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            My Trips
          </Link>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                <User2Icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{user.userName}</p>
                <p className="text-gray-400 text-xs">{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DriverNavbar;