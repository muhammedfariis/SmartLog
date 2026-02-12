import { Link, useNavigate } from "react-router-dom";
import ROUTEAUTH from "../../common/authPath";
import API from "../../Api/api";
import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { User, Lock, ShieldCheck, ArrowRight, XCircle, CheckCircle2 } from "lucide-react"; 
import PageMotion from "../../common/pagemotion";

const Register = () => {
  const [focused, setFocused] = useState(null);
  const go = useNavigate();
  
  const [toast, setToast] = useState({ show: false, msg: "", type: "error" });

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/authentication/register", {
        ...form,
        role: "admin",
      });

      setToast({ show: true, msg: "Registration Protocol Complete", type: "success" });
      
      setForm({ userName: "", password: "" });
      setTimeout(() => go("/admin/vehicles"), 1500); 
      
    } catch (err) {
      setToast({ 
        show: true, 
        msg: err.response?.data?.message || "Internal System Error", 
        type: "error" 
      });
    }
  };

  return (
    <PageMotion>
      <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-4">
        
        <div
          className={`fixed top-8 z-100 transition-all duration-500 transform
          ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
          ${toast.type === "error" 
            ? "bg-red-950/80 border-red-500 text-red-200" 
            : "bg-emerald-950/80 border-emerald-500 text-emerald-200"}
          backdrop-blur-md border px-6 py-4 rounded-2xl shadow-2xl shadow-black/50`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "error" ? <XCircle className="text-red-500" /> : <CheckCircle2 className="text-emerald-500" />}
            <div>
              <p className="font-bold">{toast.type === "error" ? "Access Denied" : "Registeration Completed"}</p>
              <p className="text-sm">{toast.msg}</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="h-16 mb-4">
              <img src="/images/logosmartlog-removebg-preview.png" alt="SmartLog" className="h-full w-auto object-contain" />
            </motion.div>
            <div className="h-0.5 w-12 bg-violet-500 mb-4" />
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white text-center">
              Initialize <span className="text-violet-500">Fleet</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mt-1">New Operator Registration</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focused === 'user' ? 'text-violet-400' : 'text-zinc-600'}`} />
              <input
                onFocus={() => setFocused('user')}
                onBlur={() => setFocused(null)}
                className="h-14 w-full pl-12 pr-4 bg-black/40 border border-white/5 focus:border-violet-500/50 rounded-2xl text-white outline-none transition-all placeholder:text-zinc-700"
                type="text"
                placeholder="Operator Username"
                required
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focused === 'pass' ? 'text-violet-400' : 'text-zinc-600'}`} />
              <input
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
                className="h-14 w-full pl-12 pr-4 bg-black/40 border border-white/5 focus:border-violet-500/50 rounded-2xl text-white outline-none transition-all placeholder:text-zinc-700"
                type="password"
                placeholder="Operator Password"
                required
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <label className="group flex items-center gap-3 text-sm text-zinc-400 cursor-pointer select-none py-2">
              <div className="relative flex items-center">
                <input type="checkbox" required className="peer sr-only" />
                <div className="h-5 w-5 border border-zinc-700 rounded-md peer-checked:bg-violet-500 peer-checked:border-violet-500 transition-all"></div>
                <ShieldCheck className="absolute size-3.5 text-black opacity-0 peer-checked:opacity-100 left-0.5" />
              </div>
              <span>
                I accept the{" "}
                <Link to="/terms" className="text-violet-400 hover:text-violet-300 underline underline-offset-4">
                  System Protocols
                </Link>
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group h-14 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20"
            >
              CREATE ACCOUNT
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-zinc-500">
              Existing Operator?{" "}
              <Link to="/login" className="text-violet-400 font-bold hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageMotion>
  );
};

export default Register;