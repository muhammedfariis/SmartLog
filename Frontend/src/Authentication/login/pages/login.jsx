import { useNavigate } from "react-router-dom";
import API from "../../../Api/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  LogIn,
  XCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle"
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 

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
        else if (role === "dispatcher")
          navigate("/dispatcher/assignment", { replace: true });
        else if (role === "driver")
          navigate("/drivers/trips", { replace: true });
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
      <div className={styles.loginContainer}>
        <div className={styles.toggleWrapper}>
          <Switch />
        </div>

        <AnimatePresence>
          {showError && (
            <motion.div 
              initial={{ y: -100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: -100, x: "-50%", opacity: 0 }}
              className={styles.errorAlert}
            >
              <XCircle size={20} />
              <div>
                <strong>Access Denied</strong>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>{errorMsg}</p>
              </div>
            </motion.div>
          )}

          {showSuccess && (
            <motion.div 
              initial={{ y: -100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              className={styles.successAlert}
            >
              <CheckCircle2 size={20} />
              <div>
                <strong>Authorization Granted</strong>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Redirecting...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.backgroundEffects}>
          <div className={styles.bgGradient1} />
          <div className={styles.bgGradient2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.formCard}
        >
          <div className={styles.cardHeader}>
            <div className={styles.logo}>
              <img
                src="/images/logosmartlog-removebg-preview.png"
                alt="SmartLog"
                className={styles.logoImg}
              />
            </div>
            <h1 className={styles.title}>
              Smart<span className={styles.titleHighlight}>Log</span>
            </h1>
            <p className={styles.subtitle}>Fleet Management System</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <User
                size={20}
                className={`${styles.inputIcon} ${focused === "user" ? styles.focused : ""}`}
              />
              <input
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused(null)}
                className={styles.input}
                type="text"
                placeholder="Username"
                name="userName"
                required
                value={form.userName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock
                size={20}
                className={`${styles.inputIcon} ${focused === "pass" ? styles.focused : ""}`}
              />
              <input
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                className={styles.input}
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.submitButton}
            >
              <span>AUTHENTICATE</span>
              <LogIn size={20} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </PageMotion>
  );
};

export default Login;