import { Link, useNavigate } from "react-router-dom";
import API from "../../../Api/api";
import { useState, useEffect } from "react"; 
import { motion } from "framer-motion"; 
import {
  User,
  Lock,
  ShieldCheck,
  ArrowRight,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import styles from "./register.module.css";

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
      await API.post("/authentication/register", {
        ...form,
        role: "admin",
      });

      setToast({
        show: true,
        msg: "Registration Protocol Complete",
        type: "success",
      });

      setForm({ userName: "", password: "" });
      setTimeout(() => go("/admin/vehicles"), 1500);
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
      <div className={styles.registerWrapper}>
        <div
          className={`${styles.toast} ${
            toast.show ? "" : "opacity-0 -translate-y-6 pointer-events-none"
          } ${
            toast.type === "error" ? styles.toastError : styles.toastSuccess
          }`}
          style={{ 
            opacity: toast.show ? 1 : 0, 
            transform: toast.show ? "translateY(0)" : "translateY(-1.5rem)" 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {toast.type === "error" ? (
              <XCircle size={20} />
            ) : (
              <CheckCircle2 size={20} />
            )}
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>
                {toast.type === "error" ? "Access Denied" : "Registration Completed"}
              </p>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>{toast.msg}</p>
            </div>
          </div>
        </div>

        <div className={styles.backgroundGlows}>
          <div className={styles.glowViolet} />
          <div className={styles.glowBlue} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.card}
        >
          <div className={styles.header}>
            <motion.div whileHover={{ scale: 1.05 }} className={styles.logoContainer}>
              <img
                src="/images/logosmartlog-removebg-preview.png"
                alt="SmartLog"
                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <div className={styles.divider} />
            <h1 className={styles.title}>
              Register Your <span style={{ color: '#8b5cf6' }}>Fleet</span>
            </h1>
            <p className={styles.subtitle}>
              New Operator Registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <User
                size={20}
                className={styles.inputIcon}
                style={{ color: focused === "user" ? "#a78bfa" : "#52525b" }}
              />
              <input
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused(null)}
                className={styles.inputField}
                style={{ borderColor: focused === "user" ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.05)" }}
                type="text"
                placeholder="Operator Username"
                required
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Lock
                size={20}
                className={styles.inputIcon}
                style={{ color: focused === "pass" ? "#a78bfa" : "#52525b" }}
              />
              <input
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                className={styles.inputField}
                style={{ borderColor: focused === "pass" ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.05)" }}
                type="password"
                placeholder="Operator Password"
                required
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <label className={styles.checkboxLabel}>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" required className={styles.hiddenCheckbox} id="terms" />
                <div className={styles.customCheckbox}></div>
                <ShieldCheck 
                  size={14} 
                  style={{ 
                    position: 'absolute', 
                    left: '3px', 
                    top: '3px', 
                    color: 'black',
                    pointerEvents: 'none'
                  }} 
                />
              </div>
              <span>
                I accept the{" "}
                <Link to="/terms" className={styles.link} style={{ color: '#a78bfa', textDecoration: 'underline' }}>
                  Terms&Condition
                </Link>
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={styles.submitButton}
            >
              CREATE ACCOUNT
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Existing Operator?{" "}
              <Link to="/login" className={styles.link}>
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