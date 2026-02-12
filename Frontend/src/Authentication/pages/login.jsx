import { Link, useNavigate } from "react-router-dom";
import ROUTEAUTH from "../../common/authPath";
import API from "../../Api/api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Lock, LogIn, ShieldCheck, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import PageMotion from "../../common/pagemotion";

const Login = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = await API.post("/authentication/login", form);

      setShowSuccess(true);
      const role = api.data.user.role;

      setTimeout(() => {
        if (role === "admin") navigate("/admin/vehicles", { replace: true });
        else if (role === "dispatcher") navigate("/dispatcher/assignment", { replace: true });
        else if (role === "driver") navigate("/drivers/trips", { replace: true });
      }, 1500);

      setForm({ userName: "", password: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setErrorMsg(msg);
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  };

  return (
    <PageMotion>
      <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden px-4">
        
        <div
          className={`fixed top-8 z-100 transition-all duration-500 transform
          ${showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
          bg-red-900/80 backdrop-blur-md border border-red-500
          text-red-200 px-6 py-4 rounded-2xl shadow-2xl shadow-black/50`}
        >
          <div className="flex items-center gap-3">
            <XCircle className="text-red-500" />
            <div>
              <p className="font-bold uppercase text-xs tracking-widest">Access Denied</p>
              <p className="text-sm">{errorMsg}</p>
            </div>
          </div>
        </div>

        <div
          className={`fixed top-8 z-100 transition-all duration-500 transform
          ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
          bg-emerald-900/80 backdrop-blur-md border border-emerald-500
          text-emerald-200 px-6 py-4 rounded-2xl shadow-2xl shadow-black/50`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-500" />
            <div>
              <p className="font-bold uppercase text-xs tracking-widest">Authorization Granted</p>
              <p className="text-sm">Redirecting...</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 text-white">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black"
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="h-16 mb-4">
              <img src="/images/logosmartlog-removebg-preview.png" alt="SmartLog" className="h-full w-auto object-contain" />
            </motion.div>
            <div className="h-0.5 w-12 bg-violet-500 mb-4" />
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
            <span className="text-violet-500">Login</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mt-1">Command Center Access</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focused === 'user' ? 'text-violet-400' : 'text-zinc-600'}`} />
              <input
                onFocus={() => setFocused('user')}
                onBlur={() => setFocused(null)}
                className="h-14 w-full pl-12 pr-4 bg-black/40 border border-white/5 focus:border-violet-500/50 rounded-2xl text-white outline-none transition-all placeholder:text-zinc-700 font-mono"
                type="text"
                placeholder="USERNAME"
                name="userName"
                required
                value={form.userName}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 size-5 transition-colors ${focused === 'pass' ? 'text-violet-400' : 'text-zinc-600'}`} />
              <input
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
                className="h-14 w-full pl-12 pr-4 bg-black/40 border border-white/5 focus:border-violet-500/50 rounded-2xl text-white outline-none transition-all placeholder:text-zinc-700 font-mono"
                type="password"
                placeholder="PASSWORD"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

         

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group h-14 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/20"
            >
              AUTHENTICATE
              <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

       
        </motion.div>

      
      </div>
    </PageMotion>
  );
};

export default Login;