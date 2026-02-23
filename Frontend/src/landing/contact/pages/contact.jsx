import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import PageMotion from "../../../common/pagemotion";
import Footer from "../../components/footer";
import LandingNav from "../../components/landingNav";
import styles from "./contact.module.css";

const contactMethods = [
  {
    icon: <Phone size={24} />,
    title: "Direct Line",
    value: "+91 9561166207",
    desc: "Mon-Fri, 9am - 6pm",
  },
  {
    icon: <Mail size={24} />,
    title: "Email Support",
    value: "muhammedfariis101@gmail.com",
    desc: "24/7 Ticketing System",
  },
  {
    icon: <MapPin size={24} />,
    title: "Headquarters",
    value: "Cyber Gateway, Tech City",
    desc: "Fleet Operations Hub",
  },
];

const Contact = () => {
  const [focused, setFocused] = useState(null);

  return (
    <PageMotion>
      <LandingNav />
      <div className={styles.pageWrapper}>
        <div className={styles.contactContainer}>

          <div className={styles.headerSection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.statusBadge}
            >
              <span className={styles.pingWrapper}>
                <span className={styles.pingEffect} />
                <span className={styles.statusDot} />
              </span>
              SYSTEMS ONLINE — SUPPORT READY
            </motion.div>
            <h1 className={styles.mainTitle}>
              Get in <span className={styles.textHighlight}>Touch.</span>
            </h1>
          </div>

          <div className={styles.contentGrid}>

            <div className={styles.sidebar}>
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8 }}
                  className={styles.methodCard}
                >
                  <div className={styles.iconContainer}>
                    {method.icon}
                  </div>
                  <p className={styles.methodLabel}>{method.title}</p>
                  <p className={styles.methodValue}>{method.value}</p>
                  <p className={styles.methodDesc}>{method.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className={styles.formContainer}>
              <form
                className={styles.formBody}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label
                      className={`${styles.label} ${focused === "name" ? styles.labelFocused : ""}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className={styles.inputBase}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label
                      className={`${styles.label} ${focused === "email" ? styles.labelFocused : ""}`}
                    >
                      Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className={styles.inputBase}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label
                    className={`${styles.label} ${focused === "message" ? styles.labelFocused : ""}`}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your request..."
                    className={styles.textarea}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles.submitBtn}
                >
                  CONNECT
                  <Send size={18} />
                </motion.button>
              </form>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </PageMotion>
  );
};

export default Contact;