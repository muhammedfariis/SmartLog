import { Link, useNavigate } from "react-router-dom";
import API from "../../../Api/api";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import PageMotion from "../../../common/pagemotion";
import Switch from "../../../common/toggle";
import styles from "./register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "", type: "error" });
  const [form, setForm] = useState({ userName: "", password: "" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/authentication/register", { ...form, role: "admin" });
      setToast({ show: true, msg: "Registration Completed", type: "success" });
      setForm({ userName: "", password: "" });
      setTimeout(() => navigate("/admin/vehicles"), 1500);
    } catch (err) {
      setToast({
        show: true,
        msg: err.response?.data?.message || "Internal System Error",
        type: "error",
      });
    }
  };

  return (
    <PageMotion>
      <div className={styles.wrapper}>
        {/* Background Effects */}
        <div className={styles.bg}>
          <div className={styles.bgGradient1} />
          <div className={styles.bgGradient2} />
        </div>

        {/* Top Bar */}
        <div className={styles.topbar}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.back}
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            BACK
          </motion.button>
          <Switch />
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ y: -100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: -100, x: "-50%", opacity: 0 }}
              className={toast.type === "error" ? styles.error : styles.success}
            >
              {toast.type === "error" ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
              <div>
                <strong>{toast.type === "error" ? "Access Denied" : "Success"}</strong>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>{toast.msg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.card}
        >
          <div className={styles.header}>
            <img
              src="/images/logosmartlog-removebg-preview.png"
              alt="SmartLog"
              className={styles.logo}
            />
            <h1>
              Smart<span>Log</span>
            </h1>
            <p>FLEET REGISTRATION</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrap}>
              <User
                size={20}
                className={`${styles.icon} ${focused === "user" ? styles.active : ""}`}
              />
              <input
                required
                name="userName"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused(null)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrap}>
              <Lock
                size={20}
                className={`${styles.icon} ${focused === "pass" ? styles.active : ""}`}
              />
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                className={styles.input}
              />
            </div>

            <label className={styles.checkboxLabel}>
              <input required type="checkbox" className={styles.checkbox} />
              <span className={styles.box}>
                <ShieldCheck size={14} />
              </span>
              <span>
                I accept the <Link to="/terms" className={styles.link}>Terms & Conditions</Link>
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.button}
            >
              REGISTER ACCOUNT
              <ArrowRight size={20} />
            </motion.button>
          </form>

          <div className={styles.footer}>
            Existing Operator? <Link to="/login">Login Here</Link>
          </div>
        </motion.div>
      </div>
    </PageMotion>
  );
};

export default Register;