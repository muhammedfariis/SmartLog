import { useNavigate } from "react-router-dom";
import API from "../../../Api/api";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  LogIn,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import styles from "./login.module.css";

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
        <div
          className={`${styles.errorAlert} ${showError ? styles.visible : styles.hidden}`}
        >
          <div className={styles.errorAlertContent}>
            <XCircle size={20} style={{ color: "rgb(239, 68, 68)" }} />
            <div>
              <p className={styles.errorAlertTitle}>
                Access Denied
              </p>
              <p className={styles.errorAlertMessage}>{errorMsg}</p>
            </div>
          </div>
        </div>

        <div
          className={`${styles.successAlert} ${showSuccess ? styles.visible : styles.hidden}`}
        >
          <div className={styles.successAlertContent}>
            <CheckCircle2 size={20} style={{ color: "rgb(16, 185, 129)" }} />
            <div>
              <p className={styles.successAlertTitle}>
                Authorization Granted
              </p>
              <p className={styles.successAlertMessage}>Redirecting....</p>
            </div>
          </div>
        </div>

        <div className={styles.backgroundEffects}>
          <div className={styles.bgGradient1} />
          <div className={styles.bgGradient2} />
          <div className={styles.bgNoise} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.formCard}
        >
          <div className={styles.cardHeader}>
            <motion.div whileHover={{ scale: 1.05 }} className={styles.logo}>
              <img
                src="/images/logosmartlog-removebg-preview.png"
                alt="SmartLog"
                className={styles.logoImg}
              />
            </motion.div>
            <div className={styles.divider} />
            <h1 className={styles.title}>
              <span className={styles.titleHighlight}>Login</span>
            </h1>
            <p className={styles.subtitle}>
              Fleet Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <User
                className={`${styles.inputIcon} ${focused === "user" ? styles.focused : styles.unfocused}`}
              />
              <input
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused(null)}
                className={styles.input}
                type="text"
                placeholder="USERNAME"
                name="userName"
                required
                value={form.userName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock
                className={`${styles.inputIcon} ${focused === "pass" ? styles.focused : styles.unfocused}`}
              />
              <input
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                className={styles.input}
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
              className={styles.submitButton}
            >
              AUTHENTICATE
              <LogIn
                size={18}
                className={styles.submitButtonIcon}
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </PageMotion>
  );
};

export default Login;
